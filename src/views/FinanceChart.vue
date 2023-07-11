<script>
import BarChart from '../components/BarChart.vue';
import Doughnut from '../components/Doughnut.vue';
export default {
    components: {
        BarChart,
        Doughnut
    }, data() {
        return {
            selectedMonth: 1,
            months: [
                { value: 1, label: '一月' },
                { value: 2, label: '二月' },
                { value: 3, label: '三月' },
                { value: 4, label: '四月' },
                { value: 5, label: '五月' },
            ],
            vColumns: ['bike', 'scooter', 'motorcycle', 'heavy motorcycle', 'sedan', 'ven', 'suv'],
            vColumn: ['自転車', 'スクーター', 'オートバイ', '大型バイク', 'セダン', 'ヴェン', 'SUV'],
            mColumns: ['A01', 'A02', 'A03', 'B01', 'B02', 'B03', 'C01', 'C02', 'C03', 'C04', 'C05',],
            mColumn: ['A', 'B', 'C'],
            riValues: [],
            vcValues: [],
            mValues: [],
            mGroups: [],
        };
    },
    mounted() { // 預設執行方法，進入頁面後隨即執行，後端-顯示所有站點資料
        this.updateData(); // 初始获取数据
    },
    methods: { // 各種方法
        updateData() { // 更新數據內容的方法
            const body = {
                month: this.selectedMonth
            }
            fetch("http://localhost:8080/monthly_report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.sortedData(data.financeMap))
        },
        sortedData(data) {
            this.riValues = this.vColumns.map((item) => (item in data.rent_income ? data.rent_income[item] : 0));
            this.vcValues = this.vColumns.map((item) => (item in data.vehicle_cost ? data.vehicle_cost[item] : 0));
            this.mValues = this.mColumns.map((item) => (item in data.maintenance_cost ? data.maintenance_cost[item] : 0));
            this.mGroups = this.mColumn.map((item) => {
                const filteredItems = Object.keys(data.maintenance_cost).filter((key) => key.includes(item));
                if (filteredItems.length > 0) {
                    return filteredItems.reduce((sum, key) => sum + data.maintenance_cost[key], 0);
                } else {
                    return 0;
                }
            });
        }
    },
};
</script>
<template>
    <div class="w-100 p-3">
        <h2>貸し出し収入と購入支出グラフ</h2>
        <div class="d-flex align-items-center p-2">
            <p class="m-0">月選び：</p>
            <select v-model="selectedMonth" @change="updateData">
                <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
            </select>
        </div>
        <div class="d-flex justify-content-around align-items-center p-2">
            <div class="w-50">
                <BarChart :labels="vColumn" :ri_label="'貸し出し収入'" :ri_data="riValues" :vc_label="'購入支出'"
                    :vc_data="vcValues" />
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <Doughnut :label="'貸し出し収入'" :labels="vColumn" :data="riValues" />
                <Doughnut :label="'購入支出'" :labels="vColumn" :data="vcValues" />
            </div>
        </div>
        <h2>修理・保守・保養費用</h2>
        <div class="d-flex justify-content-around align-items-center p-2">
            <div class="w-50">
                <BarChart :labels="mColumns" :vc_label="'修理・保守・保養費用'" :vc_data="mValues" />
            </div>
            <div>
                <Doughnut :label="'修理・保守・保養費用'" :labels="mColumn" :data="mGroups" />
                <p class="text-center">※A-修理、B-保守、C-保養 </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.movebar {
    width: 35%;
}
</style>
  