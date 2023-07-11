<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
import Modal from "../components/Modal.vue"
import MessageModal from "../components/messageModal.vue"
export default {
    components: {
        Modal,
        MessageModal
    },
    data() {
        return {
            isShow: false, // 顯示跳出式視窗
            isMessage: false, // 顯示回覆式視窗
            message: '', // 執行後端方法的回覆
            userInfo: {},
            city: '',
            location: '',
            odo: 0,
            licensePlate: ''
        }
    },
    computed: {
        //  mapState =>pinia:state,getters
        //       可以取到在pinia裡面的狀態資料
        ...mapState(indexStore, ["login", "manager", "isRent", "getUser", "getLoginInfo", "getVehicleInfo"]),
    },
    methods: {
        // 帶入pinia的方法
        ...mapActions(indexStore, ["signOut", "getback"]),
        out() {
            //    呼叫pinia的登出方法
            this.signOut();
        }, closeModal() {
            this.isShow = false
        },
        dropOff() {
            this.userInfo = this.getLoginInfo
            if (!this.userInfo || !this.userInfo.account) {
                this.$router.push('/login');
            }
            // 車牌待處理
            this.isShow = true
        }, finalDropOff() {
            if (this.getVehicleInfo.licensePlate) {
                this.licensePlate = this.getVehicleInfo.licensePlate
            }
            const body = {
                "account": this.userInfo.account,
                "licensePlate": this.licensePlate,
                "city": this.city,
                "location": this.location,
                "odo": this.odo
            }
            fetch("http://localhost:8080/drop_off", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.message = data.message)
            this.closeModal()
            this.isMessage = true
        }, Reload() {
            this.isMessage = false
            this.getback()
        }

    }
}
</script>

<template>
    <header class="">
        <div class="upper">
            <RouterLink class="home-link ms-3" to="/"> <img src="../../public/Frame_8_big.png" class="icon"></RouterLink>
            <div class="button-area">
                <div class="login-area">
                    <RouterLink class="link" to="/login" v-if="!login && !manager">
                        <i class="fa-solid fa-user"></i>
                        ログイン
                    </RouterLink>
                    <!-- @click="方法名稱" -->
                    <p class="my-0 " v-if="login">{{ getUser }}</p>
                    <button class="sign-out" v-if="login" @click="out">ログアウト</button>
                    <RouterLink class="link" to="/register" v-if="!login && !manager">新規登録</RouterLink>
                    <RouterLink class="link" v-if="manager" to="/administrator">管理者</RouterLink>
                    <div class="d-flex justify-center item-center" v-if="isRent">
                        <h5 class="">レンタカー利用中</h5>
                        <button class=" sign-out" @click="dropOff">返す</button>
                    </div>
                </div>
                <div class="link-area">
                    <!-- 各大項連結 -->

                    <RouterLink class="link" to="/search-map">
                        <i class="fa-solid fa-circle-info"></i>
                        サイト情報
                    </RouterLink>
                    <RouterLink class="link" to="/fee-map">
                        <i class="fa-solid fa-yen-sign"></i>
                        車種と料金
                    </RouterLink>
                    <RouterLink class="link" to="/rent">
                        <i class="fa-solid fa-location-dot"></i>
                        レンタル
                    </RouterLink>
                    <!-- <p>{{ login }}</p> -->
                    <RouterLink class="link" v-if="login" to="/member-info">会員情報管理</RouterLink>

                </div>
            </div>
        </div>

        <div class="bgs">
            <img src="../../public/bikeshareservice.png" alt="" class="bg">
        </div>
        <Modal v-if="isShow" @pushOutside="closeModal">
            <H2 class="m-2">返却場所登録</H2>
            <table class="m-3 ">
                <tr>
                    <th><label for="city" class="my-2">車両番号</label></th>
                    <td><input type="text" id="licensePlate" v-model="licensePlate">{{ this.getVehicleInfo.licensePlate }}
                    </td>
                </tr>
                <tr>
                    <th><label for="city" class="my-2">都道府県</label></th>
                    <td><input type="text" placeholder="ex:東京都" id="city" v-model="city"></td>
                </tr>
                <tr>
                    <th><label for="location" class="my-2">サイト</label></th>
                    <td><input type="text" min="0" title="会社の拠点" id="location" v-model="location"></td>
                </tr>
                <tr>
                    <th><label for="odo" class="my-2">走行マイル数</label></th>
                    <td><input type="number" min="0" title="0以上" id="odo" v-model="odo"></td>
                </tr>
            </table>
            <div class="w-25 d-flex justify-content-between">
                <button type="button" class="btn btn-success btn-sm px-3" @click="finalDropOff">決定</button>
                <button type=" button" class="btn btn-danger btn-sm px-3" @click="closeModal">キャンセル</button>
            </div>
        </Modal>
        <MessageModal v-if="isMessage" @getReady="Reload">
            <p>{{ message }}</p>
        </MessageModal>
    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100vw;
    background-color: #E3F3FC;

    font-size: 1.5rem;
    display: flex;
    flex-direction: column;

    .upper {
        width: 100%;
        display: flex;
        align-items: center;

        .home-link {
            width: 200px;

            .icon {
                width: 100%;
            }
        }

        .button-area {
            height: 6rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .login-area {
                display: flex;
                justify-content: end;

            }


            .link-area {
                display: flex;
                justify-content: start;
                margin-left: 4.5%;

            }

            .sign-out {
                border: 0px;
                background-color: transparent;
                text-decoration: none;
                color: black;
                cursor: pointer;
                transition: 0.3s;
                margin: 0 1rem;

                &:hover {
                    color: #79dfb1;
                }
            }

            .link {
                text-decoration: none;
                color: rgb(47, 27, 27);
                cursor: pointer;
                transition: 0.3s;
                margin: 0 1rem;

                &:hover {
                    color: #79dfb1;
                }
            }
        }
    }

    .bgs {
        .bg {
            width: 100%;
        }
    }

}
</style>