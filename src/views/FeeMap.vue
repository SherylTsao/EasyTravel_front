<script>
import PlanBtnView from "../components/PlanButton.vue"
import TableView from "../components/Table.vue"
import PlanTableView from "../components/FeePlanTable.vue"
export default {
    components: {
        PlanBtnView,
        TableView,
        PlanTableView
    },
    data() {
        return {
            // TableView
            title: ``,
            columns: [
                { key: 'project', column: "プラン" },
                { key: 'rate', column: "時間帯料金" }, { key: 'threshold', column: "時間帯" }], // 表格標題
            feesData: [], // 表格內容
            unit: "",
            showControl: false,

            vColumns: { 'bike': '自転車', 'scooter': 'スクーター', 'motorcycle': 'オートバイ', 'heavy motorcycle': '大型バイク', 'sedan': 'セダン', 'ven': 'ヴェン', 'suv': 'SUV' },
            // PlanButton propTitle
            bike: `自転車`,
            scooter: `スクーター`,
            motorcycle: `オートバイ`,
            heavyMotorcycle: `大型バイク`,
            sedan: `セダン`,
            ven: `ヴェン`,
            suv: `SUV`,

            // PlanButton propImg
            bikeImg: '../../public/bike.png',
            scooterImg: '../../public/scooter.png',
            motorcycleImg: '../../public/motorcycle.png',
            heavyMotorcycleImg: '../../public/heavyMotorcycle.png',
            sedanImg: '../../public/sedan.png',
            venImg: '../../public/ven.png',
            suvImg: '../../public/suv.png',

        };
    }, methods: {
        fetchBicycleData() {
            console.log("123")
            const body = {
                "project": 'bike',
                "cc": 0,
            }
            fetch("http://localhost:8080/find_projects", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.feesData = data.feeList
                    this.title = body.project
                    this.unit = "分以内"
                })
        },
        fetchScooterData() {
            const body = {
                "project": 'scooter',
                "cc": 150,
            }
            fetch("http://localhost:8080/find_projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.feesData = data.feeList
                    this.title = body.project
                    this.unit = "日以上"
                })
        },
        fetchMotorData() {
            const body = {
                "project": 'motorcycle',
                "cc": 250,
            }
            fetch("http://localhost:8080/find_projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.feesData = data.feeList
                    this.title = body.project
                    this.unit = "日以上"
                })
        },
        fetchHeavyMotorData() {
            const body = {
                "project": 'heavy motorcycle',
                "cc": 550,
            }
            fetch("http://localhost:8080/find_projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.feesData = data.feeList
                    this.title = body.project
                    this.unit = "日以上"
                })
        },
        fetchSedanData() {
            const body = {
                "project": 'sedan',
                "cc": 1600,
            }
            fetch("http://localhost:8080/find_projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.feesData = data.feeList
                    this.title = body.project
                    this.unit = "日以上"
                })
        },
        fetchVenData() {
            const body = {
                "project": 'ven',
                "cc": 2000,
            }
            fetch("http://localhost:8080/find_projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.feesData = data.feeList
                    this.title = body.project
                    this.unit = "日以上"
                })
        },
        fetchSuvData() {
            const body = {
                "project": 'suv',
                "cc": 2400,
            }
            fetch("http://localhost:8080/find_projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    this.feesData = data.feeList
                    this.title = body.project
                    this.unit = "日以上"
                })
        }
    },
    mounted() {
        console.log("123")
        const body = {
            "project": 'bike',
            "cc": 0,
        }
        fetch("http://localhost:8080/find_projects", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.feesData)
                this.feesData = data.feeList
                this.unit = "分以内"
                // this.columns = columns
                console.log(this.columns1)
                this.title = body.project
            })
    }
}
</script>

<template>
    <div class="background">
        <h2>車種・料金</h2>
        <div class="plan">
            <div class="planBtn" @click="fetchBicycleData">
                <PlanBtnView :propImg="bikeImg" :propTitle="bike" />
            </div>
            <div class="planBtn" @click="fetchScooterData">
                <PlanBtnView :propImg="scooterImg" :propTitle="scooter" />
            </div>
            <div class="planBtn" @click="fetchMotorData">
                <PlanBtnView :propImg="motorcycleImg" :propTitle="motorcycle" />
            </div>
            <div class="planBtn" @click="fetchHeavyMotorData">
                <PlanBtnView :propImg="heavyMotorcycleImg" :propTitle="heavyMotorcycle" />
            </div>
            <div class="planBtn" @click="fetchSedanData">
                <PlanBtnView :propImg="sedanImg" :propTitle="sedan" />
            </div>
            <div class="planBtn" @click="fetchVenData">
                <PlanBtnView :propImg="venImg" :propTitle="ven" />
            </div>
            <div class="planBtn" @click="fetchSuvData">
                <PlanBtnView :propImg="suvImg" :propTitle="suv" />
            </div>
        </div>

        <!-- <TableView :columns="columns" :data="feesData" :showControl="showControl" /> -->

        <h2>{{ vColumns[title] }} の利用料金</h2>

        <!-- <PlanTableView :columns="this.columns" :data="feesData" /> -->
        <div class="plan-info-card">
            <div v-for="(item, index) in feesData" :key="index" class="plan-info">
                <PlanTableView :columns="columns" :unitText="unit" :data="item" />
            </div>

        </div>

        <!-- <table class="planInfo">
            <thead>
                <tr class="table-info">
                    <th class="fs-3 text-center" v-for="column in columns" :key="key">{{ column.column }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in feesData" :key="item.id">
                    <td class="fs-4 text-center" v-for="column in columns" :key="key">{{ item[column.key] }}</td>
                </tr>
            </tbody>
        </table> -->
    </div>
</template>

<style lang="scss" scoped>
.background {
    // width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-color: cadetblue;

    .plan {
        width: 95%;
        // background-color: gray;
        display: flex;
        justify-content: space-between;

        .planBtn {
            width: 14.2%;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                scale: 1.05;
            }

            &:active {
                scale: 0.95;
            }


        }

    }

    h2 {
        margin: 2rem 0;
    }

    .plan-info-card {
        width: 70%;
        display: flex;
        justify-content: space-between;

        .plan-info {
            width: 23%;
            height: 20rem;
        }
    }

    .planInfo {
        width: 70%;
        // background-color: #209696;

        thead {
            tr {
                background-color: #9dcbfc;

                th {
                    width: 27%;
                }
            }
        }

        tbody {
            tr {
                td {
                    width: 27%;
                }
            }
        }
    }
}
</style>