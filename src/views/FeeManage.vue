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
            tableColumns: [{ key: 'serialNumber', column: '#' }, { key: 'project', column: 'プラン' }, { key: 'cc', column: '排気量' }, { key: 'rate', column: '時間帯の料金' }, { key: 'threshold', column: '時間帯' }], // 表格標題
            feesData: [], // 表格內容
            searchText: '', // 搜尋關鍵字
            vipCheck: false, //vip篩選

            isShow: false, // 顯示跳出式視窗
            isMessage: false, // 顯示回覆式視窗
            modalType: '', // 跳出式視窗形式
            item: {}, // 從table傳回來的資料
            message: '', // 執行後端方法的回覆

            showDeleteButton: true,  // 是否顯示刪除按鈕
            showControl: true, // 顯示操作行

            project: '',
            cc: 0,
            rate: 0,
            threshold: 0,
        };
    },
    mounted() { // 預設執行方法，後端-顯示所有費率資料
        this.findAllData()
    },
    methods: {
        findAllData() {
            fetch("http://localhost:8080/show_all_fees")
                .then(res => res.json())
                .then(data => this.feesData = data.feeList)
        },
        // 更新顯示資料
        updateFilteredData() {
            let keyword = ''
            const vip = 'vip'
            let newData = this.feesData;
            if (this.searchText) {
                keyword = this.searchText.toLowerCase();
                newData = newData.filter(item =>
                    item.project.toLowerCase().includes(keyword))
            }
            if (this.vipCheck) {
                newData = newData.filter(item =>
                    item.project.toLowerCase().includes(vip))
            }
            return newData
        }
        // 開啟跳出式視窗
        , openModal(type) {
            this.isShow = true
            this.modalType = type
        }, closeModal() {
            this.isShow = false
            this.item = null
        }, finaladd() {
            const body = {
                "project": this.project,
                "cc": this.cc,
                "rate": this.rate,
                "threshold": this.threshold
            }
            fetch("http://localhost:8080/add_project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.message = data.message)
            // 關閉跳出式視窗
            this.closeModal()
            this.isMessage = true
            // 執行刪除操作
            // 可以將 item 傳遞到後端方法進行處理
        }, deleteItem(item) {
            this.isShow = true
            this.modalType = 'delete'
            this.item = item
        }, finaldelete() {
            const body = {
                "project": this.item.project,
                "cc": this.item.cc,
                "rate": this.item.rate
            }
            fetch("http://localhost:8080/delete_project", {
                method: "DELETE",
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
            // 重新刷新表格
            this.findAllData()
        }
    },
    watch: {
        // 監看"搜尋欄位"變化
        searchText: function (newText, oldText) {
            // 在 searchText 變化時執行相應的操作
            this.updateFilteredData();
        },
        vipCheck: function (newVal, oldVal) {
            this.updateFilteredData();
        }
    },
    computed: {
        // 計算之後再次丟給子元件
        filteredData() {
            let keyword = ''
            const vip = 'vip'
            // 用newData接住this.feesData
            let newData = this.feesData;
            // 若關鍵字存在，若不存在直接判斷vipCheck
            if (this.searchText) {
                keyword = this.searchText.toLowerCase();
                // newData變更執行關鍵字篩選
                newData = newData.filter(item =>
                    item.project.toLowerCase().includes(keyword))
            }
            // 若vipCheck為true，newData變更執行vip篩選
            if (this.vipCheck) {
                newData = newData.filter(item =>
                    item.project.toLowerCase().includes(vip)
                )
            }
            // 回傳newData(變更前or變更後)
            return newData

        }
    }
}
</script>

<template>
    <div class="fee-manager">
        <h2>料金管理</h2>
        <div class="d-flex justify-content-between">
            <select class="form-select w-50 mb-2" aria-label="Default select example" v-model="searchText">
                <option value="" disabled selected>プラン選択</option>
                <option value="">全てのプランから選ぶ</option>
                <optgroup label="自転車の分類">
                    <option value="bike">自転車(bike)</option>
                </optgroup>
                <optgroup label="オートバイの分類 ">
                    <option value="scooter"> スクーター</option>
                    <option value="motorcycle">モーターサイクル</option>
                    <option value="heavy motorcycle"> 大型バイク</option>
                </optgroup>
                <optgroup label="自動車の分類">
                    <option value="sedan">セダン </option>
                    <option value="ven">バン</option>
                    <option value="suv">SUV</option>
                </optgroup>
            </select>
            <div class="vipCheck d-flex justify-content-center">
                <input type="checkbox" name="vipSearch" id="vipSearch" value="true" v-model="vipCheck">
                <label for="vipSearch" class="d-flex align-items-center">vip</label>
            </div>
            <button type="button" class="btn btn-primary text-white mb-2 px-3" @click="openModal('add')">新規料金プランの追加</button>
        </div>
        <TableView :columns="tableColumns" :data="filteredData" :showDeleteButton="showDeleteButton"
            :showControl="showControl" @delete="deleteItem" />
        <Modal v-if="isShow && modalType == 'add'" @pushOutside="closeModal">
            <H2 class="m-2 py-5">新規料金プランの追加</H2>
            <table class="m-3">
                <tr>
                    <th><label for="project" class="my-2">プラン</label></th>
                    <td><input type="text" placeholder="ex:bike" id="project" v-model="project"></td>
                </tr>
                <tr>
                    <th><label for="cc" class="my-2">排気量</label></th>
                    <td><input type="number" min="0" title="0cc以上" id="cc" v-model="cc"></td>
                </tr>
                <tr>
                    <th><label for="rate" class="my-2">時間帯の料金</label></th>
                    <td><input type="number" min="0" title="0以上" id="rate" v-model="rate"></td>
                </tr>
                <tr>
                    <th><label for="threshold" class="my-2">時間帯</label></th>
                    <td><input type="number" min="1" title="1分以上または1日以上" id="threshold" v-model="threshold"></td>
                </tr>
            </table>
            <div class="w-25 pt-5 d-flex justify-content-between">
                <button type="button" class="btn btn-primary text-white btn-sm px-3" @click="finaladd">決定</button>
                <button type=" button" class="btn btn-danger btn-sm px-2" @click="openModal">キャンセル</button>
            </div>
        </Modal>
        <Modal v-if="isShow && modalType == 'delete'" @pushOutside="closeModal">
            <H2 class="m-2">プランの削除</H2>
            <table class="m-3 border">
                <tr>
                    <th><label class="my-2">プラン</label></th>
                    <td>{{ item.project }}</td>
                </tr>
                <tr>
                    <th><label class="my-2">排気量</label></th>
                    <td>{{ item.cc }}</td>
                </tr>
                <tr>
                    <th><label class="my-2">時間帯の料金</label></th>
                    <td>{{ item.rate }}</td>
                </tr>
                <tr>
                    <th><label class="my-2">時間帯</label></th>
                    <td>{{ item.threshold }}</td>
                </tr>
            </table>
            <div class="w-25 d-flex justify-content-between">
                <button type="button" class="btn btn-primary text-white btn-sm px-3" @click="finaldelete">決定</button>
                <button type="button" class="btn btn-danger btn-sm px-2" @click="openModal">キャンセル</button>
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