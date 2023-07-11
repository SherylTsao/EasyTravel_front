<script>
import TableView from "../components/Table.vue";
import Modal from "../components/Modal.vue";
import MessageModal from "../components/messageModal.vue"
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";

export default {
  components: {
    TableView,
    Modal,
    MessageModal
  },
  data() {
    return {
      vehicleColumn: [
        { key: `licensePlate`, column: "車両番号" }, { key: `city`, column: "都市" },
        { key: `location`, column: "場所" }, { key: `nowTime`, column: "貸出時間" },
        { key: `price`, column: "価格" }],
      vehicleData: [], 
    };
  }, computed: {
          //  mapState =>pinia:state,getters
          //       可以取到在pinia裡面的狀態資料
          ...mapState(indexStore, ["getLoginInfo"]),
     },
  mounted() {
    console.log("1");
    // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    let userInfo = this.getLoginInfo

    const body = {
      // "REQ名稱"
      account: userInfo.account,


    }
    // 找所有車輛 ( 網頁一進去自動顯示 )
    fetch("http://localhost:8080/show_details", {
      method: "POST",//預設是get
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify(body),

    })
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        this.vehicleData = data.rentList;

      })
  },
}

</script>
<template>
  <div class="fee-manager">
    <TableView :columns="vehicleColumn" :data="vehicleData" />
  </div>
</template>


<style lang="scss" scoped>
.fee-manager {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.con {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;

}

.cont1 {
  display: flex;
  width: 170px;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 2rem;
}



.cont {
  display: flex;
  width: 170px;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.twobtn {
  display: flex;
  justify-content: space-around;
}





th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
