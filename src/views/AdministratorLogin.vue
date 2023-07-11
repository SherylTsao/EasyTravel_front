
<script>
import { RouterLink } from "vue-router";
import { mapActions } from "pinia";
import indexStore from "../stores/counter";
import MessageModal from '../components/messageModal.vue';

export default {
     components: {
          // 宣告跳出視窗元件
          MessageModal
     },
     data() {
          return {
               // 自己宣告 ，用於雙向綁定
               account: "",
               pwd: "",
               bol: false,
               // 宣告跳出視窗的內容
               message: "",
               // 宣告跳出視窗頁面的v-if布林值
               isShow: false,
               // 秀出密碼與否
               show: false
          }
     },
     methods: {
          // [方法名稱]
          ...mapActions(indexStore, ["managerPage"]),

          // 開啟&關閉 插入的視窗方法
          change() {
               // 若訊息跳出成功,按下確認是 換會員資訊
               if (this.message == "Successful!") {
                    console.log("Successful");
                    // 否則按下確認是關閉視窗

               } else {
                    this.isShow = !this.isShow;
               }
          },
          // 用if判斷,是否為管理者帳號,不用連接後端
          AminiLogin() {
               console.log(this.account);
               if (this.account == "M001" && this.pwd == "M0123456") {
                    // 設定跳出視窗顯示的訊息
                    this.message = "Successful!";
                    // 呼叫pinia方法:管理者登入狀態
                    this.managerPage();
                    // 監聽:登入後抓出管理者頁面 綁定的id
                    let managerLink = document.getElementById("managerLink")
                    console.log(managerLink);
                    // 進入後自動按link
                    managerLink.click();
               }
               else {
                    this.message = "Login failed!";
                    // 做change:開啟或關閉的方法
                    this.change();
               }


          },
          passwordChange() {
               console.log(this.show)
               this.show = !this.show

          }
     }
}



</script>
<template>
     <nav>
          <div class="wrap">

               <div class="wrap-login d-flex  flex-column justify-content-center align-items-center">
                    <!-- <div class="title-login"> -->
                    <h2 class="border-bottom rounded border-4 text-center mb-3">管理者ログイン</h2>
                    <!-- <h2 class="border-bottom rounded border-4 text-center mb-3">ログイン</h2> -->
                    <!-- </div> -->

                    <div class="login-area mt-4" style="height: auto;width: 350px;">
                         <div>

                              <div class="account-login mt-5">
                                   <h4 class="ms-5">アカウント :</h4>
                                   <input type="text" v-model="account" class="logInput ms-5" placeholder="アカウントを入力してください"
                                        style="width: 280px; height: 35px;">
                              </div>
                              <div class="pwd-login mt-5">
                                   <h4 class="ms-5">パスワード :</h4>
                                   <input :type="show ? 'text' : 'password'" v-model="pwd" class="logInput ms-5"
                                        placeholder="パスワードを入力してください" style="width: 280px; height: 35px;">
                                   <div class="pwd ms-5 d-flex">
                                        <!-- @change事件 -->
                                        <input type="checkbox" @change="passwordChange">
                                        <p class="pw mt-3">パスワードを表示する</p>
                                   </div>
                              </div>
                              <div class="btnlogin">
                                   <button class="log-btn mt-5" type="button" id="testBut" @click="AminiLogin">ログイン</button>
                                   <!-- 要再看一次 -->
                                   <RouterLink class="link" to="/administrator" id="managerLink">管理者</RouterLink>
                                   <MessageModal v-if="isShow" @getReady="change">
                                        <h2>{{ message }}</h2>
                                   </MessageModal>
                              </div>
                         </div>
                    </div>
               </div>
               <!-- <h3 class="text-center">Welcome back！</h3> -->
          </div>
     </nav>
</template>

<style lang="scss" scoped>
#managerLink {
     display: none;
}

h2 {
     margin: auto auto;
     height: 45px;
     width: 250px;

}

.wrap-login {

     .title-login {

          height: 50px;
          width: 150px;
          display: flex;
          justify-content: center;

     }

     .login-area {
          display: flex;

          justify-content: center;

          .logInput {
               border-radius: 5px;
               border: 1px solid black;

          }

          .btnlogin {
               // padding: 10% ;

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