<template>
  <div class="fee-manager">
    <h2>車両修理完了フォームの検索</h2>
    <div class="d-flex justify-content-between">
      <select class="form-select w-50 mb-2" v-model="sortOption" @change="sortData">
        <option value="" disabled selected>ソート検索</option>
        <option value="timeAsc">時間: 遠い順</option>
        <option value="timeDesc">時間: 近い順</option>
        <option value="priceAsc">価格: 高い順</option>
        <option value="priceDesc">価格: 安い順</option>
      </select>
      
    </div>
    <input type="text" class="oo" v-model="SearchKeyword"  placeholder="ナンバープレート検索">
    <!-- <p>{{ item }}</p>
    <p>aa</p> -->

    <TableView :columns="tableColumns" :data="formattedData" :showEditButton="showEditButton" :showControl="showControl"
      :showDeleteButton="showDeleteButton" @delete="deleteItem"  />
    <Modal v-if="isShow && modalType == 'delete'" @pushOutside="closeModal">
      <H2 class="m-2">修理フォームの削除</H2>
      <table class="m-3 border">
        <tr>
          <th><label class="my-2">車両番号</label></th>
          <td>{{ item.licensePlate }}</td>

        </tr> 
        <tr>
          <th><label class="my-2">修理開始時刻</label></th>
          <td>{{ item.startTime.replace('T', ' ') }}</td>
        </tr>
        <tr>
          <th><label class="my-2">註記</label></th>
          <td>{{ item.note }}</td>
        </tr>

      </table>
      <div class="w-25 d-flex justify-content-between">
        <button type="button" class="btn btn-primary text-white btn-sm px-3" @click="finaldelete">決定</button>
        <button type="button" class="btn btn-danger btn-sm px-2" @click="switchModal">キャンセル</button>
      </div>
    </Modal>
    <MessageModal v-if="isMessage" @getReady="Reload">
      <p>{{ message }}</p>
    </MessageModal>

  </div>
</template>

<script>
import TableView from "../components/Table.vue";
import Modal from "../components/Modal.vue";
import MessageModal from "../components/messageModal.vue"

export default {
  components: {
    TableView,
    Modal,
    MessageModal
  },
  data() {
    return {
      tableColumns: [
      {key: `serialNumber`, column: "#" },
      {key: `licensePlate`, column: "車両番号"}, 
      {key: `price`, column: "価格"}, 
      {key: `startTime`, column: "修理開始時刻"}, 
      {key: `endTime`, column: "修理終了時刻"},
      {key: `note`, column: "註記"}],
      maintenanceData: [],
      filteredLicenceplates: [],
      searchText: '',
      // item:"",
      showEditButton: false,
      showDeleteButton: true,
      isMessage: false,
      isShow: false,
      message: '',
      modalType: '',
      showControl: true,
      SearchKeyword: '',
      sortOption: 'timeDesc' // 預設以時間降序排序
    };
  },
  mounted() {

    fetch("http://localhost:8080/find_all_finished_abnormal")
      .then(res => res.json())
      .then(data => {
        // console.log("data"+"!!!!");
        console.log(data);
        // !!
        // this.item=data.maintenanceList[1].licensePlate;
        // alert(this.item)
        this.maintenanceData = data.maintenanceList.map(item => {
          return {
            ...item,
            startTime: item.startTime ? item.startTime.replace('T', ' ') : '',
            endTime: item.endTime ? item.endTime.replace('T', ' ') : ''

          };
        });
      });
  },
  methods: {
    updateFilteredData() {
      if (!this.searchText) {
        return this.maintenanceData;
      }
      const keyword = this.searchText.toLowerCase();
      return this.maintenanceData.filter(item =>
        item.city.includes(keyword)
      );
    },
    deleteItem(item) {
      this.isShow = !this.isShow
      this.modalType = 'delete'
      this.item = item
      console.log(item);
    },
    finaldelete() {
      const body = {
        "licensePlate": this.item.licensePlate,
        "startTime": this.item.startTime,
      };
      console.log(body);
      fetch("http://localhost:8080/delete_abnormal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          this.message = data.message;
        });
      this.isMessage = true;
      this.isShow = !this.isShow
    }
    , Reload() {
      this.isShow = false
      this.isMessage = false
      window.location.reload()
    },
    closeModal() {
      this.isShow = false
      item = null
      // 執行刪除操作
      // 可以將 item 傳遞到後端方法進行處理
    },
    switchModal() {
      this.isShow = !this.isShow;
    },
    sortData() {
      if (this.sortOption === 'timeAsc') {
        this.filteredData.sort((a, b) => new Date(b.startTime) - new Date(a.startTime)); // 按開始時間遠到近排序
      } else if (this.sortOption === 'timeDesc') {
        this.filteredData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)); // 按開始時間近到遠排序
      } else if (this.sortOption === 'priceAsc') {
        this.filteredData.sort((a, b) => a.price - b.price); // 按價格升序排序
      } else if (this.sortOption === 'priceDesc') {
        this.filteredData.sort((a, b) => b.price - a.price); // 按價格降序排序
      }
    }
  },
  watch: {
    searchText() {
      this.updateFilteredData();
    }
  },
  computed: {
    filteredData() {
  if (!this.searchText && !this.SearchKeyword) {
    return this.maintenanceData;
  }

  const keyword = this.searchText || this.SearchKeyword;
  const filteredByLicensePlate = this.maintenanceData.filter(item => item.licensePlate.includes(keyword));

  if (this.sortOption === 'timeAsc') {
    filteredByLicensePlate.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
  } else if (this.sortOption === 'timeDesc') {
    filteredByLicensePlate.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  } else if (this.sortOption === 'priceAsc') {
    filteredByLicensePlate.sort((a, b) => a.price - b.price);
  } else if (this.sortOption === 'priceDesc') {
    filteredByLicensePlate.sort((a, b) => b.price - a.price);
  }

  return filteredByLicensePlate;
},

    formattedData() {
      return this.filteredData.map(item => {
        return {
          ...item,
          startTime: item.startTime.replace('T', ' '),
          endTime: item.endTime

        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fee-manager {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: left;
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
.oo{
  width: 200px;
}
</style>
