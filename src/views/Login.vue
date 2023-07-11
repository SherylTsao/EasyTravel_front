<script>
// import跳出視窗的元件
import Modal from '../components/Modal.vue';
import messageModal from '../components/messageModal.vue';
import { mapState, mapActions } from "pinia";
// 全域變數pinia  名字可自己訂  以下訂成'indexStore'
import indexStore from "../stores/counter";
export default {

     // 宣告跳出視窗元件
     components: {
          Modal,
          messageModal
     },
     data() {
          return {
               // 自己宣告 ，用於雙向綁定
               account: null,
               pwd: null,
               // 宣告跳出視窗的內容
               message: "",
               // 宣告跳出視窗頁面的v-if布林值
               isShow: false,
               // 秀出密碼與否
               show: false
          }
     },
     methods: {
          // [方法名稱]，更改登入狀態
          ...mapActions(indexStore, ["loginPage", "updateLoginInfo", "updateName"]),
          // 開啟&關閉 插入的視窗方法
          change() {
               this.isShow = !this.isShow;
          },
          login(acc, pwd) {
               const body = {
                    // "REQ名稱"
                    account: acc,
                    password: pwd,

               }
               console.log(body)
               fetch("http://localhost:8080/user_login", {

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
                         if (data.message == "Successful!") {
                              // 使用pinia
                              // 呼叫方法
                              this.loginPage();
                              this.updateLoginInfo(data.userInfo)
                              this.updateName(data.userInfo.name)
                         }
                         // 做change:開啟或關閉的方法
                         this.change();

                         // 舊方法：使用瀏覽器的session
                         // session set (key:你要綁的東西)
                         // sessionStorage.setItem("userInfo", JSON.stringify(data.userInfo));
                         // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))


                         // console.log(userInfo.name)
                    })


          },
          infoPage() {
               console.log(this.message);
               // 若訊息跳出成功,按下確認是 換會員資訊
               if (this.message == "Successful!") {
                    // console.log("??");
                    this.isShow = !this.isShow;
                    // 以下這行不能使用，因為會清除網頁紀錄全部重新整理
                    // window.location.href = "/member-search"
                    this.$router.push("/member-info")
                    // 否則按下確認是關閉視窗
               } else {
                    this.isShow = !this.isShow;
               }

          },
          // 開啟&關閉 插入的視窗方法
          change() {
               this.isShow = !this.isShow;
          },
          passwordChange() {
               console.log(this.show)
               this.show = !this.show

          }
     }
}



</script>
<template>
     <div class="wrap">

          <div class="wrap-login d-flex  flex-column justify-content-center align-items-center">
               <div class="title-login">
                    <h2 class="border-bottom rounded border-4 text-center mb-3">ログイン</h2>
               </div>
               <!-- <p>{{ login }}</p> -->
               <div class="login-area mt-4" style="height: auto;width: 350px;">
                    <div>

                         <div class="account-login mt-5">
                              <h4 class="ms-5">アカウント :</h4>
                              <input type="text" v-model="account" class="logInput ms-5" placeholder="アカウントを入力してください">
                         </div>
                         <div class="pwd-login mt-5">
                              <h4 class="ms-5">パスワード :</h4>

                              <input :type="show ? 'text' : 'password'" v-model="pwd" class="logInput ms-5"
                                   placeholder="パスワードを入力してください">
                              <div class="pwd ms-5 d-flex">
                                   <!-- @change事件 -->
                                   <input type="checkbox" @change="passwordChange">
                                   <p class="pw mt-3">パスワードを表示する</p>
                              </div>
                         </div>


                         <div class="btnlogin">
                              <button class="log-btn mt-5" type="button" @click="login(this.account, this.pwd)">ログイン</button>


                              <messageModal v-if="isShow" @getReady="infoPage">
                                   <h2>{{ message }}</h2>

                              </messageModal>


                         </div>

                    </div>

               </div>

          </div>
          <div class="other">
               <h5 class="text-center mt-5 mb-4">登録方法</h5>
               <h5 class="ms-5">①会員情報を入力</h5>
               <p class="ms-5">画面の指示に従い、会員情報を入力してください。</p>
               <h5 class="ms-5">②会員プランを選択</h5>
               <p class="ms-5">料金プランをお選びください。</p>
               <p class="ms-5">詳細は、料金表をご確認ください。
                    ※ご登録後、「アカウント」メニューからプラン変更が可能です。</p>
          </div>
          <h3 class="text-center">Welcome back!</h3>

     </div>
</template>

<style lang="scss" scoped>
.wrap-login {
     h2 {
          margin: auto auto;
          height: 30px;
     }

     .title-login {

          height: 35px;
          width: 150px;
          display: flex;
          justify-content: center;

     }

     .login-area {
          display: flex;

          justify-content: center;

          .logInput {
               border-radius: 3px;
               width: 300px;

          }

          .btnlogin {
               padding: 10% 25%;

               .log-btn {
                    border-radius: 5px;
                    // background-color: #C1395E;
                    border: 1px solid white;
                    margin-left: 65%;

                    height: 35px;
                    width: 100px;
               }


          }
     }
}

h3 {
     margin-top: 25%;
}
</style>