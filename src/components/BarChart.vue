<template>
    <!-- 在chartData.labels有值时才显示图表 -->
    <Bar :data="chartData" :options="chartOptions" />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// 注册所需的Chart.js组件
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        labels: [], // 图表的横坐标标签
        ri_label: "", // 图表的标签
        ri_data: {}, // 图表的数据
        vc_label: "",
        vc_data: {},
    },
    computed: { // 使用計算屬性才能即時更新
        chartData() {
            const datasets = [];
            if (this.ri_data) {
                datasets.push({
                    label: this.ri_label,
                    backgroundColor: '#4FC3F7',
                    data: this.ri_data,
                });
            }
            if (this.vc_data) {
                datasets.push({
                    label: this.vc_label,
                    backgroundColor: '#F44336',
                    data: this.vc_data,
                });
            }
            return {
                labels: this.labels,
                datasets: datasets,
            };
        },
    },
    data() { // 不變的設定區域可丟到data這邊來
        return {
            chartOptions: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `${value / 10000} 万円`,
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.parsed.y / 10000} 万円`,
                        },
                    },
                    datalabels: {
                        display: (context) => context.dataset.data[context.dataIndex] !== 0,
                        formatter: (value, context) => (context.dataset.data[context.dataIndex] !== 0 ? value : ''),
                    },
                },
            }
        }
    },
    watch: { // 監視數據的變化
        // 监视数据的变化并更新chartData中的数据
        ri_data(newData) {
            if (this.chartData.datasets.length > 0) {
                this.chartData.datasets[0].data = newData;
            } else {
                this.chartData.datasets.push({
                    label: this.ri_label,
                    backgroundColor: '#4FC3F7',
                    data: newData,
                });
            }
        },
        vc_data(newData) {
            if (this.chartData.datasets.length > 1) {
                this.chartData.datasets[1].data = newData;
            } else {
                this.chartData.datasets[0].data = newData;
            }
        },
    },
}
</script>
