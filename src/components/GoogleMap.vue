<script>
export default {
    props: {
        location: { // 為表個欄位名稱
            type: Array,
            required: true
        }
    },
    mounted() {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA78WkzDQqacrp6Jh7r7eJGdNKWJsytXT0&callback=initMap&v=weekly`;
        script.defer = true;
        script.onload = this.initMap;
        document.head.appendChild(script);
    },
    methods: {
        initMap() {
            // 初始化地图
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 35.5314, lng: 139.7653 }, // 預設東京
                zoom: 10,
            });

            // 标记多个位置
            const locations = [
                { lat: 35.6858, lng: 139.7727, site: '日本橋' }, // '日本橋'
                { lat: 35.7141, lng: 139.7782, site: '上野' }, // '上野'
                { lat: 35.7320, lng: 139.7673, site: '西日暮里' },//'西日暮里'
                { lat: 35.7295, lng: 139.7108, site: '池袋' },// '池袋'
                { lat: 35.6896, lng: 139.7000, site: '新宿' },//'新宿'
                { lat: 35.6341, lng: 139.7154, site: '目黑' },//  '目黑'
                { lat: 35.7028, lng: 139.9863, site: '船橋車站' },//  '船橋車站'
                { lat: 35.6133, lng: 140.1111, site: '新千葉' },//  '新千葉'
                { lat: 35.7777, lng: 140.3223, site: '京成成田' }, // '京成成田'
                { lat: 35.5314, lng: 139.6962, site: '京急川崎' },// '京急川崎'
                { lat: 35.4433, lng: 139.6483, site: '横浜中華街' },// '横浜中華街'
                { lat: 35.2850, lng: 139.6587, site: '橫須賀市' }, // '橫須賀市'
                { lat: 35.2854, lng: 139.1598, site: '小田原市' } //  '小田原市'
            ];

            // 在地图上添加标记点
            locations.forEach((item) => {
                const bikeAmount = this.location.find((loc) => loc.location === item.site)?.bikeAmount;
                const motorAmount = this.location.find((loc) => loc.location === item.site)?.motorcycleAmount;
                const carAmount = this.location.find((loc) => loc.location === item.site)?.carAmount;
                console.log(this.location)
                if ((bikeAmount + motorAmount + carAmount) > 0) {
                    this.addMarkerToMap(map, item);
                } else {
                    this.addMarker2ToMap(map, item);
                }

            });
        },
        addMarkerToMap(map, location) {
            new google.maps.Marker({
                position: location,
                icon: '../../public/mini-checked.png',
                animation: google.maps.Animation.DROP,
                map: map,
            });
        }, addMarker2ToMap(map, location) {
            new google.maps.Marker({
                position: location,
                icon: '../../public/mini-checked2.png',
                animation: google.maps.Animation.DROP,
                map: map,
            });
        }
    }
}
</script>

<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<style lang="scss" scoped>
#map {
    height: 800px;
}
</style>