<script>
import TableView from "../components/Table.vue"
import Modal from "../components/Modal.vue"
import MessageModal from "../components/messageModal.vue"
export default {
    components: {
        TableView, // 帶入表格元件
        Modal, // 帶入跳出式視窗元件
        MessageModal // 回覆視窗
    },
    data() {
        return {
            tableColumns: [{ key: `licensePlate`, column: "車両番号" }, { key: `category`, column: "車種" },
            { key: `cc`, column: "排気量" }, { key: `available`, column: "ステータス" }], // 表格標題
            subLocations: [], // 該縣市站點陣列
            vehicleData: [], // 表格內容
            searchCity: '', // 搜尋關鍵字
            searchLocation: '', // 搜尋關鍵字

            showChooseButton: false, // 顯示選擇按鈕

            isShow: false, // 顯示跳出式視窗
            isMessage: false, // 顯示回覆式視窗
            dispatchList: [], // 調度車輛陣列
            message: '', // 執行後端方法的回覆
        };
    },
    methods: { // 各種方法
        findLocations() { // 搜尋資料
            const body = {
                "city": this.searchCity
            }
            fetch("http://localhost:8080/find_city_stops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.subLocations = data.stopList)
        },
        findvehicles() {
            const body = {
                "city": this.searchCity,
                "location": this.searchLocation
            }
            fetch("http://localhost:8080/find_stops_vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.vehicleData = data.vehicleList)
        }, chooseVehicles() {
            this.showChooseButton = true
        }, dispatch(list) {
            this.dispatchList = list
            this.isShow = true
        }, closeModal() {
            this.isShow = false
            this.showChooseButton = false
        }, finalDispatch() {
            const licensePlateList = this.dispatchList.map(item => item.licensePlate);
            const body = {
                "vehicle_list": licensePlateList,
                "city": this.searchCity,
                "location": this.searchLocation
            }
            fetch("http://localhost:8080/dispatch", {
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
            this.findvehicles()
        }
    }
}
</script>

<template>
    <div class="fee-manager">
        <h2>サイト車両</h2>
        <div class="d-flex justify-content-left">
            <select class="form-select w-25 mb-2" aria-label="Default select example" v-model="searchCity"
                @change="findLocations">
                <option value="" disabled selected>都道府県を選ぶ</option>
                <option value="東京都">東京都</option>
                <option value="千葉縣">千葉県</option>
                <option value="神奈川縣">神奈川県</option>
            </select>
            <select class="form-select w-25 mb-2" aria-label="Default select example" v-model="searchLocation">
                <option value="" disabled selected>サイト</option>
                <option v-if="subLocations.length > 0" v-for="items in subLocations" :value="items.location">{{
                    items.location
                }}</option>
            </select>
            <button type="button" class="btn btn-primary text-white mb-2 px-3" @click="findvehicles">探す</button>
            <button type="button" class="btn btn-primary text-white mb-2 px-3" @click="chooseVehicles">車両調度</button>
        </div>
        <TableView :columns="tableColumns" :data="vehicleData" :showChooseButton="showChooseButton" @choose="dispatch" />
        <Modal v-if="isShow" @pushOutside="closeModal">
            <H2 class="m-2">車両調度</H2>
            <TableView :columns="tableColumns" :data="dispatchList" />
            <h3 class="m-2">目的地</h3>
            <select class="form-select w-25 mb-2" aria-label="Default select example" v-model="searchCity">
                <option value="" disabled selected>都道府県を選ぶ</option>
                <option value="東京都">東京都</option>
                <option value="千葉県">千葉県</option>
                <option value="神奈川県">神奈川県</option>
            </select>
            <select class="form-select w-25 mb-2" aria-label="Default select example" v-model="searchLocation">
                <option value="" disabled selected>サイト</option>
                <option v-if="subLocations.length > 0" v-for="items in subLocations" :value="items.location">{{
                    items.location
                }}</option>
            </select>
            <div class="w-25 d-flex justify-content-between">
                <button type="button" class="btn btn-success btn-sm px-3" @click="finalDispatch">決定</button>
                <button type=" button" class="btn btn-danger btn-sm px-3" @click="closeModal">キャンセル</button>
            </div>
        </Modal>
        <MessageModal v-if="isMessage" @getReady="Reload">
            <p>{{ message }}</p>
        </MessageModal>
    </div>
</template>

<style lang="scss" scoped>
.fee-manager {
    margin: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: left;

}
</style>