<script>
// import跳出視窗的元件
import Modal from '../components/Modal.vue';
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
export default {
     // 宣告跳出視窗元件
     components: {
          Modal
     },
     data() {
          return {

               // 自己宣告 ，用於雙向綁定
               account: null,
               pwd: null,
               // 宣告跳出視窗的內容
               message: "",
               // 宣告跳出視窗頁面的v-if布林值
               isShow: false
          }
     }, computed: {
          //  mapState =>pinia:state,getters
          //       可以取到在pinia裡面的狀態資料
          ...mapState(indexStore, ["getLoginInfo"]),
     },
          methods: {
               // 開啟&關閉 插入的視窗方法
               change() {
                    this.isShow = !this.isShow;
               },
               upgrade() {
                    // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                    let userInfo = this.getLoginInfo

                    const body = {
                         // "REQ名稱"
                         account: userInfo.account,
                    }
                    console.log(body)
                    fetch("http://localhost:8080/user_info_upgrade_vip", {

                         method: "POST",//預設是get
                         headers: {
                              'Content-Type':
                                   'application/json',
                         },
                         body: JSON.stringify(body),



                    })
                         .then(function (response) {
                              return response.json()
                         })
                         .then((data) => {
                              console.log(data)
                              // 從後端找到跳出視窗要顯示的訊息後,回傳前端
                              this.message = data.message
                              // 做change:開啟或關閉的方法
                              this.change();
                         })


               }
          }

     }
</script>
<template>
     <div class="wrap-upgrade">
          <div class="title-upgrade">
               <h4 class="border-bottom ms-3" style="height: auto;width: 100px;">有料会員</h4>
          </div>

          <div class="upgrade-area">
               <div>
                    <div class="upgrade-fee">
                         <p>VIP料金は3,000日圓</p>
                         <p>※ご利用の際の運賃・料金の詳細については各タクシー会社にお問い合わせ下さい。</p>
                    </div>


                    <div class="btn-upgrade">
                         <button @click="upgrade()" class="upbtn text-white" style="height: auto;width: 80px;">申し込み</button>
                         <!-- 元件洞口 -->
                         <!-- 按下btn觸發upgrade方法,change方法放在裡面,change方法為將isShow變相反 -->
                         <Modal v-if="isShow" @pushOutside="change">
                              <h2>{{ message }}</h2>
                         </Modal>
                    </div>
               </div>

          </div>

     </div>
</template>

<style lang="scss" scoped>
.wrap-upgrade {
     height: 450px;

     .title-upgrade {
          // background-color: #b30e0e;

          // width: 100vw;
          // border: 0.3rem solid black;
          text-align: center;
          font-size: 1.5rem;
     }

     .upgrade-area {
          display: flex;
          // flex-direction: column;
          justify-content: center;

          // align-items: center;
          .btn-upgrade-fee {
               padding: 10% 25%;
          }

          .btn-upgrade {
               padding: 10% 35%;

               .upbtn {
                    height: 35px;
                    width: 300px;
                    border-radius: 5px;
                    background: rgb(17, 61, 184);
                    background: linear-gradient(90deg, rgba(17, 61, 184, 0.8354978354978355) 12%, rgb(52, 111, 206) 62%, rgb(33, 94, 185) 83%);
                    border-radius: 5%;
               }

          }
     }
}

h2 {
     margin: auto auto;
}
</style>