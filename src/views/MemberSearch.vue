<script>
import LeftView from '../../src/components/Left.vue'
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
export default {
    components: {
        LeftView
    },
    data() {
        return {
            // 自己宣告 ，用於雙向綁定
            name: "",
            account: null,
            pwd: null,
            birthday: null,
            scooter: false,
            car: false
        }
    }, computed: {
        //  mapState =>pinia:state,getters
        //       可以取到在pinia裡面的狀態資料
        ...mapState(indexStore, ["getLoginInfo"]),
    },
    methods: {
        search() {
            // 取出"自定義的key值"
            // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
            let userInfo = this.getLoginInfo
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
        }
    },
    // 刷新頁面做的事情
    mounted() {
        this.search()
    }

}
</script>
<template>
    <div class="wrap-search">
        <div class="title-search">
            <h4 class="">会員資訊</h4>
        </div>

        <div class="search-area">
            <div>
                <div class="name-search">
                    <h4>名前 :</h4>
                    <input type="text" v-model="name" disabled>
                </div>
                <div class="account-search">
                    <h4>アカウント :</h4>

                    <input type="text" v-model="account" disabled>
                </div>
                <div class="pwd-search">
                    <h4>パスワード :</h4>

                    <input type="password" v-model="pwd" disabled>

                </div>
                <div class="birth-search">
                    <h4>誕生日 :</h4>
                    <input type="text" v-model="birthday" disabled>

                </div>
                <div class="birth-search">
                    <h4>普通二輪免許 :</h4>
                    <input type="radio" name="scooter" id="ip1" v-model="scooter" disabled>
                    <label for="scooter">はい</label>
                    <input type="radio" name="scooter" id="ip2" v-model="scooter" disabled>
                    <label for="scooter">いいえ</label>

                </div>
                <div class="birth-search">
                    <h4>普通自動車免許 :</h4>
                    <input type="radio" name="car" id="ip3" v-model="car" disabled>
                    <label for="scooter">はい</label>
                    <input type="radio" name="car" id="ip4" v-model="car" disabled>
                    <label for="scooter">いいえ</label>
                </div>

            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.wrap-search {
    .title-search {
        height: auto;
        border-radius: 5%;
        text-align: center;
        font-size: 1.5rem;
    }

    .search-area {
        display: flex;
        // flex-direction: column;
        justify-content: center;

        // align-items: center;
        .btn-search {
            padding: 10% 25%;


        }
    }
}
</style>