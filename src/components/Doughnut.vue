<template>
    <div>
        <Doughnut :data="chartData" :options="chartOptions" />
    </div>
</template>
  
<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import ChartDataLabels from '../../node_modules/chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default {
    name: 'CombinedChart',
    components: {
        Doughnut,
    },
    props: {
        label: String, // 图表的标签
        labels: [], // 图表的横坐标标签
        data: {}, // 图表的数据
    },
    computed: { // 使用計算屬性才能即時更新
        chartData() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#FFA500', '#800080', '#008000', '#FFC0CB', '#FFD700', '#00FF00', '#800000'],
                        data: this.data,
                    }
                ]
            }
        },
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: this.label,
                        font: {
                            size: 20
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            size: '14',
                            weight: 'bold'
                        },
                        display: (context) => context.dataset.data[context.dataIndex] !== 0,
                        formatter: (value, context) => {
                            const dataset = context.chart.data.datasets[context.datasetIndex];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(2);

                            return percentage + '%';
                        },
                    },
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const dataset = context.dataset;
                                const index = context.dataIndex;
                                const value = dataset.data[index];
                                // 计算百分比
                                const total = dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(2);
                                return `${dataset.label}: ${percentage}%`;
                            }
                        }
                    }
                }
            }
        };
    },
    watch: { // 監視數據的變化
        // 监听第一个数据集labels的变化并更新chartData中的labels
        labels(newLabels) {
            this.chartData.labels = newLabels;
        },
        // 监听第一个数据集data的变化并更新chartData中的数据
        data(newData) {
            this.chartData.datasets[0].data = newData;
        },
    }
};
</script>
  