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
            tableColumns: [{ key: 'city', column: "都道府県" }, { key: 'location', column: "サイト" }, { key: 'bikeAmount', column: "自転車の数" }, { key: 'motorcycleAmount', column: "二輪車の数" }, { key: 'carAmount', column: "四輪車の数" }], // 表格標題
            locationsData: [], // 表格內容
            searchText: '', // 搜尋關鍵字

            isShow: false, // 顯示跳出式視窗
            isMessage: false, // 顯示回覆式視窗
            modalType: '', // 跳出式視窗形式
            item: {}, // 從table傳回來的資料
            message: '', // 執行後端方法的回覆

            showEditButton: true,  // 是否顯示修改按鈕
            showControl: true, // 顯示操作行

            city: '',
            location: '',
            bikeAmount: 0,
            motorcycleAmount: 0,
            carAmount: 0
        };
    },
    mounted() { // 預設執行方法，進入頁面後隨即執行，後端-顯示所有站點資料
        this.findAllStops()
    },
    methods: { // 各種方法
        findAllStops() {
            fetch("http://localhost:8080/show_all_stops")
                .then(res => res.json())
                .then(data => this.locationsData = data.stopList)
        },
        updateFilteredData() { // 更新數據內容的方法
            if (!this.searchText) { // 對應到"搜尋內容"，若無則不改變內容
                return this.locationsData;
            }
            const keyword = this.searchText.toLowerCase(); // 關鍵字"搜尋內容"
            return this.locationsData.filter(item => // 將資料進行過濾，回傳含關鍵字資料
                item.city.includes(keyword)
            )
        }, openModal(type) { // 跳出式視窗顯示與否
            this.isShow = true
            this.modalType = type
        }, closeModal() {
            this.isShow = false
            this.item = null
        }, finaladd() {
            const body = {
                "city": this.city,
                "location": this.location,
                "bike_amount": this.bikeAmount,
                "motorcycle_amount": this.motorcycleAmount,
                "car_amount": this.carAmount
            }
            fetch("http://localhost:8080/add_stop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.message = data.message)
            this.closeModal()
            this.isMessage = true
        }, editItem(item) {
            this.isShow = true
            this.modalType = 'edit'
            this.item = item
        }, finaledit() {
            const body = {
                "city": this.item.city,
                "location": this.item.location,
                "bike_amount": this.bikeAmount,
                "motorcycle_amount": this.motorcycleAmount,
                "car_amount": this.carAmount
            }
            fetch("http://localhost:8080/renew_amount", {
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
            this.findAllStops()
        }
    },
    watch: { // 事件監聽
        searchText: function (newText, oldText) { // 當"搜尋內容"發生改變時
            // 在 searchText 變化時執行相應的操作
            this.updateFilteredData();
        }
    },
    computed: { // 改變顯示內容，對應到內容因應關鍵字變化的方法
        filteredData() {
            if (!this.searchText) {
                return this.locationsData;
            }
            const keyword = this.searchText.toLowerCase();
            return this.locationsData.filter(item => {
                // 根據需要調整下面的條件
                return (
                    item.city.includes(keyword)
                );
            });
        }
    }
}
</script>

<template>
    <div class="fee-manager">
        <h2>サイト</h2>
        <div class="d-flex justify-content-between">
            <select class="form-select w-50 mb-2" aria-label="Default select example" v-model="searchText">
                <option value="" disabled selected>都道府県を選ぶ</option>
                <option value="">全ての都道府県から選ぶ</option>
                <option value="東京都">東京都</option>
                <option value="千葉縣">千葉県</option>
                <option value="神奈川縣">神奈川県</option>
            </select>
            <button type="button" class="btn btn-primary text-white mb-2 px-3" @click="openModal('add')">サイト追加</button>
        </div>
        <TableView :columns="tableColumns" :data="filteredData" :showEditButton="showEditButton" :showControl="showControl"
            @edit="editItem" />
        <Modal v-if="isShow && modalType == 'add'" @pushOutside="closeModal">
            <H2 class="m-2">サイト追加</H2>
            <table class="m-3 ">
                <tr>
                    <th><label for="city" class="my-2">都道府県</label></th>
                    <td><input type="text" placeholder="ex:東京都" id="city" v-model="city"></td>
                </tr>
                <tr>
                    <th><label for="location" class="my-2">サイト</label></th>
                    <td><input type="text" min="0" title="会社の拠点" id="location" v-model="location"></td>
                </tr>
                <tr>
                    <th><label for="bike_amount" class="my-2">自転車の数</label></th>
                    <td><input type="number" min="0" title="0以上を含む" id="bike_amount" v-model="bikeAmount"></td>
                </tr>
                <tr>
                    <th><label for="motorcycle_amount" class="my-2">二輪車の数</label></th>
                    <td><input type="number" min="0" title="0以上を含む" id="motorcycle_amount" v-model="motorcycleAmount"></td>
                </tr>
                <tr>
                    <th><label for="car_amount" class="my-2">四輪車の数</label></th>
                    <td><input type="number" min="0" title="0以上を含む" id="car_amount" v-model="carAmount"></td>
                </tr>
            </table>
            <div class="w-25 d-flex justify-content-between">
                <button type="button" class="btn btn-success btn-sm px-3" @click="finaladd">決定</button>
                <button type=" button" class="btn btn-danger btn-sm px-3" @click="closeModal">キャンセル</button>
            </div>
        </Modal>
        <Modal v-if="isShow && modalType == 'edit'" @pushOutside="closeModal">
            <H2 class="m-2">サイト調整</H2>
            <table class="m-3 ">
                <tr>
                    <th><label for="city" class="my-2">都道府県</label></th>
                    <td>{{ item.city }}</td>
                </tr>
                <tr>
                    <th><label for="location" class="my-2">サイト</label></th>
                    <td>{{ item.location }}</td>
                </tr>
                <tr>
                    <th><label for="bike_amount" class="my-2">自転車の数</label></th>
                    <td><input type="number" id="bike_amount" v-model="bikeAmount"></td>
                </tr>
                <tr>
                    <th><label for="motorcycle_amount" class="my-2">二輪車の数</label></th>
                    <td><input type="number" id="motorcycle_amount" v-model="motorcycleAmount"></td>
                </tr>
                <tr>
                    <th><label for="car_amount" class="my-2">四輪車の数</label></th>
                    <td><input type="number" id="car_amount" v-model="carAmount"></td>
                </tr>
            </table>
            <div class="w-25 d-flex justify-content-between">
                <button type="button" class="btn btn-success btn-sm px-3" @click="finaledit">決定</button>
                <button type=" button" class="btn btn-danger btn-sm px-3" @click="openModal">キャンセル</button>
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