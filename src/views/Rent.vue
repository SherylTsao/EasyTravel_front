<script>
import RentTable from '../components/RentTable.vue';
import Modal from "../components/Modal.vue"
import MessageModal from "../components/messageModal.vue"
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
export default {
    components: {
        RentTable,
        Modal,
        MessageModal
    },
    data() {
        return {
            buttons: [
                { id: 1, label: '東京都', isActive: true },
                { id: 2, label: '千葉県', isActive: false },
                { id: 3, label: '神奈川県', isActive: false },
            ],
            city: '東京都',
            subLocations: [],
            subLocation: {},
            carInfoColumn: [{ key: `category`, column: "車種" }, { key: `cc`, column: "排気量" }, { key: `licensePlate`, column: "車両番号" }],

            bikesData: [],
            motorsData: [],
            carsData: [],

            userInfo: {},
            vehicleInfo: {},
            isShow: false, // 顯示跳出式視窗
            isMessage: false, // 顯示回覆式視窗
            message: '', // 執行後端方法的回覆

        };
    },
    mounted() {
        const body = {
            "city": '東京都',
            "location": '上野'
        }
        fetch("http://localhost:8080/find_city_stops", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(data => {
                data.stopList = data.stopList.map(item => {
                    return { ...item, isActive: false };
                }) // 添加isActive屬性並初始化為false
                this.subLocations = data.stopList
                this.subLocations[0].isActive = true
                this.subLocation = this.subLocations[0]
            })
        fetch("http://localhost:8080/find_stops_vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(data => this.sort(data.vehicleList))
    },
    computed: {
        // 帶入pinia的方法
        ...mapState(indexStore, ["login", "getLoginInfo"]),
    },
    methods: {
        ...mapActions(indexStore, ["rent", "updateVehicleInfo"]),
        handleButtonClick(button) {
            // 執行後端方法或操作
            this.findLocations(button.label);
            // 在按鈕點擊時觸發的方法
            this.buttons.forEach(btn => {
                if (btn !== button) {
                    btn.isActive = false; // 恢復之前的按鈕到原始狀態
                }
            });
            button.isActive = !button.isActive; // 切換按鈕的活動狀態
            this.city = button.label
        },
        findLocations(value) { // 搜尋資料
            const body = {
                "city": value
            }
            fetch("http://localhost:8080/find_city_stops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => {
                    data.stopList = data.stopList.map(item => {
                        return { ...item, isActive: false };
                    }) // 添加isActive屬性並初始化為false
                    this.subLocations = data.stopList
                })
        },
        findvehicles(button) {
            this.subLocations.forEach(btn => {
                if (btn !== button) {
                    btn.isActive = false; // 恢復之前的按鈕到原始狀態
                }
            });
            button.isActive = !button.isActive; // 切換按鈕的活動狀態
            this.subLocation = button
            this.bikesData = []
            this.motorsData = []
            this.carsData = []
            const body = {
                "city": this.city,
                "location": button.location
            }
            fetch("http://localhost:8080/find_stops_vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.sort(data.vehicleList))
        },
        sort(data) {
            data.forEach(item => {
                switch (item.category) {
                    case 'bike':
                        this.bikesData.push(item);
                        break;
                    case 'scooter':
                    case 'motorcycle':
                    case 'heavy motorcycle':
                        this.motorsData.push(item);
                        break;
                    case 'sedan':
                    case 'ven':
                    case 'suv':
                        this.carsData.push(item);
                        break;
                    default:
                        break;
                }
            });
        }, closeModal() {
            this.isShow = false
        },
        doRent(item) {
            if (!this.login) {
                this.$router.push('/login')
            }
            this.vehicleInfo = item
            this.updateVehicleInfo(item)
            this.userInfo = this.getLoginInfo
            this.isShow = true
        },
        finalRent() {
            const body = {
                "account": this.userInfo.account,
                "licensePlate": this.vehicleInfo.licensePlate,
            }
            fetch("http://localhost:8080/rent", {
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
            this.rent()
        },
    }
}
</script>

<template>
    <div class="d-flex gap-2">
        <button v-for="button in buttons" :key="button.id"
            :class="{ 'btn': true, 'btn-outline-primary': true, 'btn-primary': button.isActive, 'custom-color': button.isActive }"
            @click="handleButtonClick(button)">
            {{ button.label }}
        </button>
    </div>
    <div class="d-flex gap-2 my-2">
        <button v-for="button in subLocations" :key="button.id"
            :class="{ 'btn': true, 'btn-outline-primary': true, 'btn-primary': button.isActive, 'custom-color': button.isActive }"
            @click="findvehicles(button)">
            {{ button.location }}
        </button>
    </div>
    <div class="d-flex">
        <div class="box m-5 p-3">
            <h1 class="text-center">自転車</h1>
            <h1 class="text-center">{{ subLocation.bikeAmount }}</h1>
            <RentTable :columns="carInfoColumn" :data="bikesData" @rent="doRent" />
        </div>
        <div class="box m-5 p-3">
            <h1 class="text-center">二輪車</h1>
            <h1 class="text-center">{{ subLocation.motorcycleAmount }}</h1>
            <RentTable :columns="carInfoColumn" :data="motorsData" @rent="doRent" />
        </div>
        <div class="box m-5 p-3">
            <h1 class="text-center">四輪車</h1>
            <h1 class="text-center">{{ subLocation.carAmount }}</h1>
            <RentTable :columns="carInfoColumn" :data="carsData" @rent="doRent" />
        </div>
    </div>
    <Modal v-if="isShow" @pushOutside="closeModal">
        <H2 class="m-2">レンタル</H2>
        <table class="m-3 border">
            <tr>
                <th><label class="my-2">名前</label></th>
                <td>{{ userInfo.name }}</td>
            </tr>
            <tr>
                <th><label class="my-2">車両番号</label></th>
                <td>{{ vehicleInfo.licensePlate }}</td>
            </tr>
        </table>
        <div class="w-25 d-flex justify-content-between">
            <button type="button" class="btn btn-success btn-sm px-3" @click="finalRent">決定</button>
            <button type="button" class="btn btn-danger btn-sm px-3" @click="closeModal">キャンセル</button>
        </div>
    </Modal>
    <MessageModal v-if="isMessage" @getReady="Reload">
        <p>{{ message }}</p>
    </MessageModal>
</template>

<style lang="scss" scoped>
.custom-color {
    color: black;
    /* 設置自定義的文字顏色，例如白色 */
}

.box {
    width: 450px;
    height: auto;
    background-color: rgb(176, 212, 233);
    border-radius: 20px;
    border-style: outset;
    border-color: aqua;
    border-width: 4px;
}
</style>