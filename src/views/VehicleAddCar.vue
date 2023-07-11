<script>
import Modal from "../components/Modal.vue"
import TableView from "../components/Table.vue"
import MessageModal from "../components/messageModal.vue"
export default {
  components: {
    Modal,
    TableView,
    MessageModal
  },
  data() {
    return {
      vehicleColumn: [
        { key: `licensePlate`, column: "車両番号" }, { key: `category`, column: "車種" },
        { key: `cc`, column: "排気量" }, { key: `startServingDate`, column: "追加日" },
        { key: `latestCheckDate`, column: "最新検査日" }, { key: `status`, column: "ステータス" },
        { key: `city`, column: "エリア" }, { key: `location`, column: "ポート" },
        { key: `odo`, column: "走行距離" }, { key: `price`, column: "値段" }],
      scrapColumn: [
        { key: `licensePlate`, column: "車両番号" }, { key: `category`, column: "車種" },
        { key: `startServingDate`, column: "追加日" }, { key: `status`, column: "ステータス" },
        { key: `city`, column: "エリア" }, { key: `location`, column: "ポート" },
        { key: `odo`, column: "走行距離" }
      ],
      vehicleData: [],
      deleteData: [],    // 刪除車資料
      areaColumn: [      // 城市資料
        { key: `東京都`, value: "東京都" }, { key: `千葉縣`, value: "千葉縣" }, { key: `神奈川縣`, value: "神奈川縣" }
      ],
      portData: [],    // 站點資料

      // table button 編輯按鈕
      showEditButton: true,   // 顯示變更按鈕
      showDeleteButton: true, // 顯示刪除按鈕
      showCompleteButton: false,
      showControl: true,      // 顯示操作行
      item: {},               // 直接編輯資料

      // 篩選
      categoryKeyword: '',     // 車種關鍵字
      statusKeyword: '',       // 狀態關鍵字
      areaKeyword: '',         // 區域關鍵字
      portKeyword: '',         // 站點關鍵字

      // modal
      isAddCarShow: false,    // 顯示新增視窗
      isScrapCarShow: false,  // 顯示報廢視窗
      isUpdateCarShow: false, // 顯示變更視窗
      isMessage: false,       // 顯示回覆視窗
      message: ``,            // 後端回傳訊息

      ccRange: "bike : 0\nscooter : 1~250\nmotorcycle : 251~550\nheavy motorcycle : >550\nsedan/ven/suv : 自定義(1200~6600)",

      // fetch / find by category
      categoryInput: document.getElementById("categoryInput"),

      // fetch / add car
      plateNumInput: '',
      categoryInput: '',
      tankInput: '',
      priceInput: '',

      // fetch / update car
      available: true,
      reqOdo: 0

    }
  },
  // 監看
  watch: {
    categoryKeyword: function (newCate, oldCate) {
      this.updatefilteredData();
    },
    statusKeyword: function (newStat, oldStat) {
      this.updatefilteredData();
    },
    areaKeyword: function (newArea, oldArea) {
      this.findStop(newArea)
      this.updatefilteredData();
    },
    portKeyword: function (newPort, oldPort) {
      this.updatefilteredData();
    }
  },
  methods: {
    switchAddCar() {
      this.isAddCarShow = !this.isAddCarShow
    },
    switchScrapCar() {
      this.isScrapCarShow = !this.isScrapCarShow
    },
    switchUpdateCar() {
      this.isUpdateCarShow = !this.isUpdateCarShow
    },
    // 篩選
    updatefilteredData() {
      let categoryKeyword = ''
      let statusKeyword = ''
      let areaKeyword = ''
      let portKeyword = ''
      let newData = this.vehicleData
      if (this.categoryKeyword) {
        categoryKeyword = this.categoryKeyword
        newData = newData.filter(item =>
          item.category.toLowerCase().includes(categoryKeyword),
        )
      }
      if (this.statusKeyword) {
        statusKeyword = this.statusKeyword
        newData = newData.filter(item =>
          item.status.toLowerCase().includes(statusKeyword),
        )
      }
      if (this.areaKeyword) {
        areaKeyword = this.areaKeyword
        newData = newData.filter(item =>
          item.city.toLowerCase().includes(areaKeyword),
        )
      }
      if (this.portKeyword) {
        portKeyword = this.portKeyword
        newData = newData.filter(item =>
          item.location.toLowerCase().includes(portKeyword)
        )
      }
      return newData
    }

    ,
    // 找城市站點
    findStop(value) {
      const body = {
        "city": value
      }
      fetch("http://localhost:8080/find_city_stops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
        .then(data => {
          this.portData = data.stopList
        })
    },
    // add car
    addCar() {
      let body = {
        "licensePlate": this.plateNumInput,
        "category": this.categoryInput,
        "cc": this.tankInput,
        "price": this.priceInput
      }
      console.log("add_click")
      fetch("http://localhost:8080/add_car", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          this.message = data.message
          this.isMessage = true
          data.vehicleList.forEach(item => {
            console.log(item)
            if (item.status == '未啟用') {
              item.status = "無効"
            } else if (item.status == '可租借') {
              item.status = "レンタル可"
            } else if (item.status == '出租中') {
              item.status = 'レンタル中'
            } else if (item.status == '維護中') {
              item.status = '修理中'
            } else if (item.status == '已報廢') {
              item.status = '廃棄済み'
            }
          })
        })
      this.isAddCarShow = false
    },
    // update car
    // 顯示更改視窗
    updateCar(item) {
      this.isUpdateCarShow = !this.isUpdateCarShow
      this.item = item
    },
    // 執行方法
    finalUpdateCar() {
      let body = {
        "licensePlate": this.item.licensePlate,
        "odo": this.reqOdo,
        "available": this.available
      }
      console.log("click")
      fetch("http://localhost:8080/update_car_info", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.message = data.message
          this.isMessage = true
          data.vehicleList.forEach(item => {
            console.log(item)
            if (item.status == '未啟用') {
              item.status = '無効'
            } else if (item.status == '可租借') {
              item.status = 'レンタル可'
            } else if (item.status == '出租中') {
              item.status = 'レンタル中'
            } else if (item.status == '維護中') {
              item.status = '修理中'
            } else if (item.status == '已報廢') {
              item.status = '廃棄済み'
            }
          })
        })
      this.isUpdateCarShow = false
    },
    // 報廢車
    scrapCar(item) {
      this.item = item
      let body = {
        "licensePlate": this.item.licensePlate
      }
      console.log(body)
      fetch("http://localhost:8080/scrap_car", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.message = data.message
          this.isMessage = true
        })
      this.isScrapCarShow = false
    },
    Reload() {
      this.isMessage = false
      fetch("http://localhost:8080/find_all_car")
        .then(res => res.json())
        .then(data => {
          console.log(data.vehicleList)
          this.vehicleData = data.vehicleList
          data.vehicleList.forEach(item => {
            console.log(item)
            if (item.status == '未啟用') {
              item.status = '無効'
            } else if (item.status == '可租借') {
              item.status = 'レンタル可'
            } else if (item.status == '出租中') {
              item.status = 'レンタル中'
            } else if (item.status == '維護中') {
              item.status = '修理中'
            } else if (item.status == '已報廢') {
              item.status = '廃棄済み'
            }
          })
        }), fetch("http://localhost:8080/find_car_near_scrap")
          .then(res => res.json())
          .then(data => {
            console.log(data.vehicleList)
            this.deleteData = data.vehicleList
            data.vehicleList.forEach(item => {
              console.log(item)
              if (item.status == '未啟用') {
                item.status = '無効'
              } else if (item.status == '可租借') {
                item.status = 'レンタル可'
              } else if (item.status == '出租中') {
                item.status = 'レンタル中'
              } else if (item.status == '維護中') {
                item.status = '修理中'
              } else if (item.status == '已報廢') {
                item.status = '廃棄済み'
              }
            })
          })

      // window.location.reload()
    }


  },
  mounted() {
    // 找所有車輛 ( 網頁一進去自動顯示 )
    fetch("http://localhost:8080/find_all_car")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.vehicleList.forEach(item => {
          console.log(item)
          if (item.status == '未啟用') {
            item.status = '無効'
          } else if (item.status == '可租借') {
            item.status = 'レンタル可'
          } else if (item.status == '出租中') {
            item.status = 'レンタル中'
          } else if (item.status == '維護中') {
            item.status = '修理中'
          } else if (item.status == '已報廢') {
            item.status = '廃棄済み'
          }
        })

        this.vehicleData = data.vehicleList
        console.log(data.vehicleList)
      });
    // 找報廢
    fetch("http://localhost:8080/find_car_near_scrap")
      .then(res => res.json())
      .then(data => {
        console.log(data.vehicleList)
        this.deleteData = data.vehicleList
        data.vehicleList.forEach(item => {
          console.log(item)
          if (item.status == '未啟用') {
            item.status = '無効'
          } else if (item.status == '可租借') {
            item.status = 'レンタル可'
          } else if (item.status == '出租中') {
            item.status = 'レンタル中'
          } else if (item.status == '維護中') {
            item.status = '修理中'
          } else if (item.status == '已報廢') {
            item.status = '廃棄済み'
          }
        })
      });

  },
  computed: {
    filterData() {
      let categoryKeyword = ''
      let statusKeyword = ''
      let areaKeyword = ''
      let portKeyword = ''
      let newData = this.vehicleData
      if (this.categoryKeyword) {
        categoryKeyword = this.categoryKeyword
        newData = newData.filter(item =>
          item.category.toLowerCase().includes(categoryKeyword))
      }
      if (this.statusKeyword) {
        statusKeyword = this.statusKeyword
        newData = newData.filter(item =>
          item.status.toLowerCase().includes(statusKeyword),
        )
      }
      if (this.areaKeyword) {
        areaKeyword = this.areaKeyword
        newData = newData.filter(item =>
          item.city.toLowerCase().includes(areaKeyword),
        )
      }
      if (this.portKeyword) {
        portKeyword = this.portKeyword
        newData = newData.filter(item =>
          item.location.toLowerCase().includes(portKeyword)
        )
      }
      return newData
    }
  }
}
</script>

<template>
  <div class="input-area d-flex flex-column">

    <div class="btn-area align-items-center justify-content-md-between mb-3">
      <!-- button -->
      <button type="button" class="functionBtn btn btn-primary w-25 text-white" @click="switchAddCar">新規登錄</button>
      <button type="button" class="functionBtn btn btn-primary w-25 text-white" @click="switchScrapCar">車の廃棄</button>
    </div>






    <div class="find-by-category d-flex justify-content-between">
      <!-- find by category -->
      <!-- <span class="my-2 mx-3 align-items-center">車種</span> -->
      <select name="車種" id="categoryInput" class="mb-2" v-model="categoryKeyword">
        <option value="" disabled selected>車種で検索</option>
        <option value="">すべての車種で検索</option>
        <option value="bike">自転車</option>
        <option value="scooter">スクーター</option>
        <option value="motorcycle">オートバイ</option>
        <option value="heavy motorcycle">大型バイク</option>
        <option value="sedan">セダン</option>
        <option value="ven">ヴェン</option>
        <option value="suv">suv</option>
      </select>

      <!-- status -->
      <select name="statusSelect" id="statusSelect" class="mb-2" v-model="statusKeyword">
        <option value="" disabled selected>ステータスで検索</option>
        <option value="">すべてのステータスで検索</option>
        <option value="無効">無効</option>
        <option value="レンタル可">レンタル可</option>
        <option value="レンタル中">レンタル中</option>
        <option value="修理中">修理中</option>
        <option value="廃棄済み">廃棄済み</option>
      </select>

      <!-- area -->
      <select name="areaKeyword" id="areaKeyword" class="mb-2" v-model="areaKeyword">
        <option value="" disabled selected>エリアで検索</option>
        <option value="">すべてのエリアで検索</option>
        <option v-for="area in areaColumn" :value="area.key">{{ area.value }}</option>
      </select>

      <!-- port -->
      <select name="portSelect" id="portSelect" class="mb-2" v-model="portKeyword">
        <option value="" disabled selected>ポートで検索</option>
        <option value="">すべてのポートで検索</option>
        <option v-for="port in portData" :value="port.location">{{ port.location }}</option>
      </select>

      <!-- <button class="workBtn btn btn-primary text-white" @click="findCar">検索</button> -->
    </div>




    <!-- table -->
    <TableView :columns="vehicleColumn" :data="filterData" :showControl="showControl" :showEditButton="showEditButton"
      @edit="updateCar" />

    <!-- Modal -->
    <!-- Add Car -->
    <Modal v-if="isAddCarShow" @pushOutside="switchAddCar">
      <h2 class="mt-4 text-vehicle fw-bold">新規登錄</h2>
      <table class="h-50">
        <tr class="my-2">
          <th>車両番号</th>
          <td><input type="text" v-model="plateNumInput"></td>
        </tr>
        <tr class="my-2">
          <th>車種</th>
          <td>
            <select name="車種" v-model="categoryInput">
              <option value="bike">bike</option>
              <option value="scooter">scooter</option>
              <option value="motorcycle">motorcycle</option>
              <option value="heavy motorcycle">heavy motorcycle</option>
              <option value="sedan">sedan</option>
              <option value="ven">ven</option>
              <option value="suv">suv</option>
            </select>
          </td>
        </tr>
        <tr class="my-2">
          <th :title="ccRange">排気量(cc)</th>
          <td><input type="number" v-model="tankInput" :title="ccRange"></td>
        </tr>
        <tr class="my-2">
          <th>値段</th>
          <td><input type="number" v-model="priceInput"></td>
        </tr>
      </table>
      <button type="button" class="workBtn btn btn-success mt-2" @click="addCar">追加</button>
    </Modal>

    <!-- Scrap Car -->
    <Modal v-if="isScrapCarShow" @pushOutside="switchScrapCar">
      <h2 class="mt-4 text-vehicle fw-bold">車の廃棄</h2>
      <TableView :columns="scrapColumn" :data="deleteData" :showControl="showControl" :showDeleteButton="showDeleteButton"
        @edit="scrapCar">

      </TableView>
    </Modal>

    <!-- Update Car -->
    <Modal v-if="isUpdateCarShow" @pushOutside="switchUpdateCar">
      <h2 class="mt-4 text-vehicle fw-bold">車の情報変更</h2>
      <table class="h-50">
        <tr class="my-2">
          <th>車両番号</th>
          <td>{{ item.licensePlate }}</td>
        </tr>
        <tr class="my-2">
          <th>車種</th>
          <td>{{ item.category }}</td>
        </tr>
        <tr class="my-2">
          <th>排気量</th>
          <td>{{ item.cc }}<span>cc</span></td>
        </tr>
        <tr class="my-2">
          <th>追加日</th>
          <td>{{ item.startServingDate }}</td>
        </tr>
        <tr class="my-2">
          <th>最新検査日</th>
          <td>{{ item.latestCheckDate }}</td>
        </tr>
        <tr class="my-2">
          <th>ステータス</th>
          <td><select name="available" id="available" v-model="available">
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </td>
        </tr>
        <tr class="my-2">
          <th>エリア</th>
          <td>{{ item.city }}</td>
        </tr>
        <tr class="my-2">
          <th>ポート</th>
          <td>{{ item.location }}</td>
        </tr>
        <tr class="my-2">
          <th>走行距離</th>
          <td>{{ item.odo }}
            <span> + </span>
            <input type="number" v-model="reqOdo">
            <span>キロ</span>
          </td>
        </tr>
        <tr class="my-2">
          <th>値段</th>
          <td>{{ item.price }}</td>
        </tr>
      </table>

      <button type="button" class="workBtn btn btn-success my-2" @click="finalUpdateCar">変更</button>

    </Modal>


    <MessageModal v-if="isMessage" @getReady="Reload">
      <p>{{ message }}</p>
    </MessageModal>

  </div>
</template>

<style lang="scss" scoped>
.input-area {
  display: flex;
  flex-direction: column;
  padding: 5%;

  .btn-area {
    display: flex;
    justify-content: space-around;

  }

  table {

    thead {

      tr {
        height: 2.5rem;

        th {
          width: 9%;
        }

        td {

          input {
            border-radius: 5px;
            padding-left: 3px;
          }

          .carType {
            border-radius: 5px;
          }

        }


        .workBtn {
          width: 7rem;
          height: 2.5rem;
          margin-top: 0.5rem;
          margin-left: 3rem;
        }

      }
    }
  }



}
</style>