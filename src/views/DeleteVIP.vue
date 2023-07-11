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
          // 方法(參數)
          quiet() {
               // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
               let userInfo = this.getLoginInfo
               
               // this.acc = 
               const body = {
                    account: userInfo.account,
               }
               fetch("http://localhost:8080/user_info_Quit_vip", {
                    method: "POST",
                    headers: {
                         'Content-Type':
                              'application/json',
                    },
                    body: JSON.stringify(body)

               })
                    .then(function (response) {
                         return response.json()
                    })
                    .then( (data) => {
                         console.log(data)
                         // 從後端找到跳出視窗要顯示的訊息後,回傳前端
                         this.message=data.message
                         // 做change:開啟或關閉的方法
                         this.change()

                    })
          }
     }
}
</script>
<template>
     <div class="wrap-delete">
          <div class="title-delete">
               <h4 class="border-bottom ms-3" style="height: auto;width: 150px;">取り消すVIP</h4>
               <p class="m-5 fs-5">EasyTravel VIP を終了してもよろしいでしょうか?</p>
          </div>

          <div class="delete-area">
               <div>
                    <div class="btn-delete">
                         <button type="button" @click="quiet" class="upbtn text-white" style="height: auto;width: 80px;">申し込み</button>
                         <Modal v-if="isShow" @pushOutside="change">
                              <h2>{{ message }}</h2>
                         </Modal>
                    
                    </div>
               </div>

          </div>

     </div>
</template>

<style lang="scss" scoped>
.wrap-delete {
     height: 450px;

     .title-delete {
     
          text-align: center;
          font-size: 1.5rem;
     }

     .delete-area {
          display: flex;
          // flex-direction: column;
          justify-content: center;
          // align-items: center;

          .btn-delete {
               padding: 10% 25%;
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