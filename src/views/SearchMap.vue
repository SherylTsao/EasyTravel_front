<script>
import GoogleMap from '../components/GoogleMap.vue';
export default {
    components: {
        GoogleMap
    },
    data() {
        return {
            locationsData: [], // 表格內容
        }
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
    }
}
</script>

<template>
    <div class="d-flex flex-column  align-items-center">
        <div class="top">
            <h2 class="text-center">サイトマップ</h2>
        </div>
        <div class="icon">
            <div class="green">
                <img src="../../public/checked.png.g.png" alt="">
                <p class="pp">レンタル可</p>
            </div>
            <div class="bk">
                <img src="../../public/checked (1).png.bk.png" alt="">
                <p class="pp">車両不在</p>
            </div>

        </div>
        <div class="map">
            <p>※ 地図上で利用可能な車両のレンタルを検索してください</p>
            <GoogleMap :location="locationsData" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.top {
    width: 70%;
    height: 40px;
    background-color: #6FB7B7;
    color: black;
    // margin-left: 6rem;
    margin-top: 1rem;
    border-radius: 3rem;
}

.icon {
    display: flex;
    justify-content: space-around;
    width: 60%;
    // margin-left: 16rem;

    .pp {
        margin: 0;
        padding-left: 1rem;
    }

    .green {
        // margin-left: 4rem;
        margin-top: 2rem;
        display: flex;
        align-items: center;
    }

    .bk {
        // margin-right: 4rem;
        margin-top: 2rem;
        display: flex;
        align-items: center;
    }

    img {
        width: 50px;
        height: 50px;
    }
}


.map {
    width: 80vw;
    // height: 70vh;
    margin-top: 0.5rem;
    // margin-left: 6rem;
}
</style>