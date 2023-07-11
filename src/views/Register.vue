<script>
import Modal from '../components/Modal.vue';
export default {
     components: {
          Modal
     },
     data() {
          return {
               // 自己宣告 ，用於雙向綁定
               account: null,
               pwd: null,
               birthday: null,
               name: null,
               isShow: false,
               message: "",
               // 秀出密碼與否
               show: false
          }
     },
     methods: {
          passwordChange() {
               console.log(this.show)
               this.show = !this.show

          }
          // 開啟&關閉 插入的視窗方法
          , change() {
               // false改成true!!!!
               this.isShow = !this.isShow;
               if (this.message = "Successful!") {
                    this.$router.push('/login');
               }
          },
          // 方法(參數)
          creat() {
               console.log("ccc");
               const body = {
                    // 後端req屬性名稱:參數
                    account: this.account,
                    birthday: this.birthday,
                    password: this.pwd,
                    name: this.name
               }
               console.log(body)
               fetch("http://localhost:8080/user_registration", {
                    method: "POST",
                    headers: {
                         'Content-Type':
                              'application/json',
                    },
                    body: JSON.stringify(body)

               })
                    .then(function (response) {
                         // console.log(response);
                         return response.json()
                    })
                    .then((data) => {
                         // 有箭頭跟沒有的差別?
                         console.log(data)
                         // data是後端傳入的所有個人資訊
                         // .message是後端return的訊息
                         // this.message是前端自訂的空字串
                         this.message = data.message
                         // 帶入另一個方法,放這的原因是....
                         this.change();
                    })

          }
     }
}
</script>
<template>
     <!-- <button @click="creat">aa</button> -->
     <div class="big-wrap ">

          <h2 class="title-h4 border-bottom  border-4 text-center mb-3 rounded">新規会員登録</h2>
          <p>公式アプリから会員登録をすると、自転車をすぐに利用することができます。
               サイクルポートにある自転車の台数や、電池残量のチェックも簡単です。
               ご利用後は乗車履歴もご確認いただけます。</p>


          <div class="wrap-reg ps-5">

               <div class="register-area" style="height: 500px; width: 300px;">

                    <div class="reg">
                         <div class="name-reg">
                              <h4 class="mt-5 ms-4">名前 :</h4>
                              <input type="text" v-model="name" class="regInput ms-4" placeholder="名前を入力してください">
                         </div>
                         <div class="account-reg">
                              <div>
                                   <h4 class="mt-3 ms-4" style="width: 135px">アカウント :</h4>
                              </div>
                              <input type="text" v-model="account" class="regInput ms-4" placeholder="アカウントを入力してください">
                              <p class="mt-2 ms-4 fs-6" style="width: 300px;color: gray;">半角英数字3文字以上8文字以内</p>
                         </div>
                         <div class="pwd-reg">
                              <div class="mark-wrap d-flex">

                                   <h4 class="mt-3 ms-4" style="width: 135px">パスワード :</h4>

                              </div>
                              <input :type="show ? 'text' : 'password'" v-model="pwd" class="regInput ms-4"
                                   placeholder="パスワードを入力してください">
                              <p class="mt-2 ms-4 fs-6" style="width: 300px;color: gray;">半角英数字8文字以上12文字以内</p>

                              <div class="pwd ms-4 d-flex">
                                   <!-- @change事件 -->
                                   <input type="checkbox" @change="passwordChange">
                                   <p class="pw">パスワードを表示する</p>
                              </div>
                         </div>
                         <div class="birth-reg">
                              <h4 class="mt-3 ms-4" style="width: 135px">誕生日 :</h4>
                              <input type="date" v-model="birthday" class="regInput   ps-5 pe-4 ms-4">
                         </div>
                         <!-- <button @click="creat">sss</button> -->
                         <div class="btn-regist">
                              <!-- 觸發事件，參數帶入 -->
                              <button type="button" class="regbtn mt-5" @click="creat">登録</button>
                              <!-- 元件洞口 -->
                              <Modal v-if="isShow" @pushOutside="change">
                                   <h2>{{ message }}</h2>
                              </Modal>
                         </div>
                    </div>
               </div>

          </div>

          <div class="bottom-area">
               <h4 class="mb-5 mt-5">よくある質問</h4>
               <h5 class="mt-5">Ｑ．会員登録はどうすればよいですか？</h5>
               <p>「新規会員登録」をご覧ください。</p>
               <h5 class="mt-5">Ｑ．事故にあったら？</h5>
               <p>①警察へ届ける（負傷者がいれば119番に通報）
                    ②運営事務局（0570-783-677）への連絡
                    ご利用中の事故については、すべてのお客様に対して損害保険が適用されますが、保険適用範囲外の責任は負いかねます。※保険料はレンタサイクルご利用料金に含まれております。

                    お客さまがご利用中に事故にあわれた場合は、速やかに運営事務局に事故発生の日時、場所、原因、事故の状況等をご連絡いただくとともに、必要な場合は、警察に連絡する等法令で定められた処置をおとりください。
                    事故についての示談等が必要な場合には、お客さま自らの責任において行っていただきます。また、上記にかかわらず、弊社が第三者にやむなく損害賠償を負担した場合を含め、弊社が被害を被った場合には、お客さまにその損害賠償を請求することがあります。
                    ※プリペイド式の携帯電話や一部のIP電話などからはご利用いただけません。
               </p>
          </div>
          <h3 class="text-center">Join Us！</h3>
     </div>
</template>

<style lang="scss" scoped>
.big-wrap {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;

     img {
          height: 200px;
          width: 200px;
     }

     .title-h4 {
          height: 35px;
          width: 200px;
          // border-radius: 5px;
          // background-color: #C1395E;
          // background: rgb(17, 61, 184);
          // background: linear-gradient(90deg, rgba(17, 61, 184, 0.8354978354978355) 12%, rgb(52, 111, 206) 62%, rgb(33, 94, 185) 83%);
     }

     .wrap-reg {
          height: 450px;
          width: 500px;
          // background: rgb(17, 61, 184);
          //           background: linear-gradient(90deg, rgba(17, 61, 184, 0.8354978354978355) 12%, rgb(52, 111, 206) 62%, rgb(33, 94, 185) 83%);
          // border: 1px solid  rgb(17, 61, 184);
          border-radius: 5px;

          .regInput {
               border-radius: 3px;
               width: 300px;
               // border: 1px solid black;
          }

          .mark-p1 {
               margin: 1%;
          }

          .reg {
               margin-left: 35%;
          }

          .pwd {
               margin-top: -20px;

               .pw {
                    margin-top: 18px;
                    margin-left: 2px;
               }
          }

          .register-area {
               display: flex;
               justify-content: center;

               // .btn-reg {
               //      padding: 10% 20%;
               // }
          }

          .regbtn {
               border-radius: 10px;
               border: 3px solid white;
               margin-left: 43%;
               font-size: large;
          }
     }

     h2 {
          margin: auto auto;
     }

     h3 {
          margin-top: -1%;
     }

     .bottom-area {
          margin-top: 10%;
     }
}
</style>