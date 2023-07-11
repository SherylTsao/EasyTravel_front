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
            financeColumns: [{ key: 'serialNumber', column: '#' }, { key: 'title', column: "メインアイテム" }, { key: 'detail', column: "サブアイテム" }, { key: 'price', column: "金額" }, { key: 'buildTime', column: "作成日" }], // 表格標題
            financeData: [], // 表格內容
            searchText: '', // 搜尋關鍵字

            isShow: false, // 顯示跳出式視窗
            isMessage: false, // 顯示回覆式視窗
            modalType: '', // 跳出式視窗形式
            item: {}, // 從table傳回來的資料
            message: '', // 執行後端方法的回覆

            project: '',
            cc: 0,
            rate: 0,
            threshold: 0,
        };
    },
    mounted() { // 預設執行方法，後端-顯示所有費率資料
        fetch("http://localhost:8080/show_all_report")
            .then(res => res.json())
            .then(data => this.financeData = data.financeList)
    },
    methods: {
        // 更新顯示資料
        updateFilteredData() {
            if (!this.searchText) {
                return this.financeData;
            }
            const keyword = this.searchText.toLowerCase();
            return this.financeData.filter(item =>
                item.title.toLowerCase().includes(keyword)
            )
        }
    },
    watch: {
        // 監看"搜尋欄位"變化
        searchText: function (newText, oldText) {
            // 在 searchText 變化時執行相應的操作
            this.updateFilteredData();
        }
    },
    computed: {
        // 變更顯示資料
        filteredData() {
            if (!this.searchText) {
                return this.financeData;
            }
            const keyword = this.searchText.toLowerCase();
            return this.financeData.filter(item => {
                // 根據需要調整下面的條件
                return (
                    item.title.toLowerCase().includes(keyword)
                );
            });
        },
        formattedData() {
            return this.filteredData.map(item => {
                return {
                    ...item,
                    buildTime: item.buildTime.replace('T', ' ')
                };
            });
        },
    }
}
</script>

<template>
    <div class="fee-manager">
        <h2>財務</h2>
        <div class="d-flex">
            <select class="form-select w-50 mb-2" aria-label="Default select example" v-model="searchText">
                <option value="" disabled selected>メインアイテム</option>
                <option value="">全ての選ぶ</option>
                <option value="vip_income">有料会員収益</option>
                <option value="rent_income">レンタカー収入</option>
                <option value="vehicle_cost">車輛購入支出</option>
                <option value="maintenance_cost">メンテナンス費支出</option>
            </select>
        </div>
        <TableView :columns="financeColumns" :data="formattedData" />
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