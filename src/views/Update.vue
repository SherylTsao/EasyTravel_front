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
               name: null,
               account: null,
               pwd: null,
               birthday: null,
               scooter: false,
               car: false,
               // 宣告跳出視窗的內容
               message: "",
               // 宣告跳出視窗頁面的v-if布林值
               isShow: false,
               error: ""
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
               }
               // 要分開方法:秀出舊資料&連結API
               // 1.該會員資訊
               , medata() {
                    // 從session取出key值(暫存的會員資料)
                    // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                    let userInfo = this.getLoginInfo

                    console.log(userInfo);

                    this.name = userInfo.name
                    this.account = userInfo.account
                    this.pwd = userInfo.password
                    this.birthday = userInfo.birthday
                    this.scooter = userInfo.motorcycleLicense
                    this.car = userInfo.drivingLicense
                    // 抓節點(機車/汽車駕照)
                    let testBut = document.getElementById("ip1");
                    let testBut2 = document.getElementById("ip2");
                    let testBut3 = document.getElementById("ip3");
                    let testBut4 = document.getElementById("ip4");

                    console.log(this.scooter);
                    // 判斷資料庫的值為true/false
                    if (this.scooter == true) {
                         // .checked:若為true則打勾
                         testBut.checked = true
                    } else {
                         testBut2.checked = true
                    }
                    if (this.car == true) {
                         testBut3.checked = true
                    } else {
                         testBut4.checked = true
                    }



               },
               // 2.連結API,修改資訊
               meUpdate() {
                    // (1)修改預設的汽機車駕照true/false
                    // 抓節點
                    let scoYes = document.getElementById("ip1");
                    let motoYes = document.getElementById("ip3");
                    // 宣告汽機車預設值為false(下方body有設對應REQ)
                    let scoSet = false;
                    let motoSet = false;

                    if (scoYes.checked == true) {
                         scoSet = true
                    } else {
                         scoSet = false
                    }
                    if (motoYes.checked == true) {
                         motoSet = true
                    } else {
                         motoSet = false
                    }


                    // 抓登入時暫存的資訊session,利用key值
                    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

                    const body = {
                         // "後端REQ名稱":key值.指定的帳密值
                         account: userInfo.account,
                         password: userInfo.password,
                         //  "後端REQ名稱":前端修改傳回的生日
                         birthday: this.birthday,
                         // "後端REQ名稱":前端自定義的布林值
                         motorcycleLicense: scoSet,
                         drivingLicense: motoSet

                    }
                    console.log(body)

                    // 現在日期
                    const currentDate = new Date();
                    // 使用者輸入的生日
                    const selectedDate = new Date(this.birthday);
                    // 檢查生日是否在未来&小於0歲!
                    if (selectedDate > currentDate
                         || selectedDate.getFullYear() < 1870) {
                         // console.log('date error');
                         this.message = '生年月日の日付が有効期間外です。';
                         // 插入元件的洞口變true
                         this.isShow = !this.isShow;
                         return;

                    }
                    // 連接後端API方法
                    fetch("http://localhost:8080/user_info_update", {

                         method: "POST",//預設是get
                         headers: {
                              'Content-Type':
                                   'application/json',
                         },
                         body: JSON.stringify(body)

                    })
                         .then(function (response) {
                              return response.json()
                         })
                         // .then(function (data) {
                         //      console.log(data)
                         // })
                         .then((data) => {
                              console.log(data)
                              // 從後端找到跳出視窗要顯示的訊息後,回傳前端
                              this.message = data.message
                              // 做change:開啟或關閉的方法
                              this.change();
                         })

               }

          },
          //  mounted:刷新頁面做的事情
          // mounted有箭頭抓不到this
          mounted() {
               // 刷新頁面(進入頁面)時做一次此方法
               this.medata()
          }
     }
</script>
<template>
     <div class="wrap-update">
          <div class="title-update">
               <h4 class="border-bottom ms-3" style="height: auto;width: 150px;">会員情報変更</h4>
               <p class="note">※名前、アカウント、パスワードは変更できません。</p>
               <p class="note ms-3">※もし変更をご希望の場合はEasyTravelでご連絡ください。</p>
          </div>

          <div class="update-area">
               <div>
                    <div class="name-update">
                         <h4>名前 :</h4>
                         <input type="text" v-model="name" disabled>
                    </div>
                    <div class="account-update">
                         <h4>アカウント :</h4>

                         <input type="text" v-model="account" disabled>
                    </div>
                    <div class="pwd-update">
                         <h4>パスワード :</h4>

                         <input type="password" v-model="pwd" disabled>

                    </div>
                    <div class="birth-update">
                         <h4>誕生日 :</h4>
                         <input type="date" v-model="birthday">

                    </div>
                    <div class="birth-update">
                         <h4>普通二輪免許 :</h4>
                         <input type="radio" name="scooter" id="ip1" v-model="scooter" value="true">
                         <label for="scooter">はい</label>
                         <input type="radio" name="scooter" id="ip2" v-model="scooter" value="false">
                         <label for="scooter">いいえ</label>

                    </div>
                    <div class="birth-update">
                         <h4>普通自動車免許 :</h4>
                         <input type="radio" name="car" id="ip3" v-model="car">
                         <label for="scooter">はい</label>
                         <input type="radio" name="car" id="ip4" v-model="car">
                         <label for="scooter">いいえ</label>
                    </div>


                    <div class="btn-update">
                         <button type="button" @click="meUpdate" class="upbtn text-white"
                              style="height: auto;width: 80px;">変更</button>
                         <!-- 元件洞口 -->
                         <Modal v-if="isShow" @pushOutside="change">

                              <h2>{{ message }}</h2>
                         </Modal>
                    </div>
               </div>

          </div>

     </div>
</template>

<style lang="scss" scoped>
.wrap-update {
     .title-update {

          text-align: center;
          font-size: 1.5rem;

          .note {
               font-size: 1rem;
          }
     }

     .update-area {
          display: flex;

          justify-content: center;

          .btn-update {
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