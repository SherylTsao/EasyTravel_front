<template>
  <div class="fee-manager">
    <h2>車両修理フォームの追加と変更</h2>
    <div class="d-flex justify-content-between">
      <select class="form-select w-50 mb-2" v-model="sortOption" @change="sortData">
        <option value="" disabled selected>ソート検索</option>
        <option value="timeAsc">時間: 遠い順</option>
        <option value="timeDesc">時間: 近い順</option>
      </select>
      <div class="twobtn">
        <button type="button" class="btn btn-primary mb-2 px-3 text-white" @click="switchModal">フォーム追加</button>
        <button type="button" class="btn btn-primary mb-2 px-3 text-white"
          @click="switchReasonCodeModal">車両修理の原因コード</button>
      </div>
    </div>
    <div class="ii">
      <input type="text" class="oo" v-model="SearchKeyword" placeholder="ナンバープレート検索">

    </div>
    <TableView :columns="tableColumns" :data="formattedData" :showEditButton="showEditButton" :showControl="showControl"
      :showDeleteButton="showDeleteButton" @delete="deleteItem" :showCompleteButton="showCompleteButton"
      @complete="finishItem" />
    <Modal v-if="isShow" @pushOutside="switchModal">
      <div class="con">

        <h2 class="m-2">以下の情報を入力してください。</h2>

        <table class="m-3 ">
          <tr>
            <th><label for="city" class="my-2">車両番号</label></th>
            <td><input type="text" placeholder="ex:DB02" id="city" v-model="licensePlate"></td>
          </tr>
        </table>
        <div class="cont">
          <button type="button" class="btn btn-success btn-sm px-3" @click="finaladd">確認</button>
          <button type="button" class="btn btn-danger btn-sm px-3" @click="switchModal">キャンセル</button>
        </div>
      </div>
    </Modal>

    <Modal v-if="isReasonCodeModalShow" @pushOutside="switchReasonCodeModal">
      <div class="con">
        <h2 class="m-2">車両修理の原因コード</h2>
        <table class="m-3" style="border-collapse: collapse; border: 1px solid black;">
          <thead>
            <tr>
              <th style="border: 1px solid black;">代号</th>
              <th style="border: 1px solid black;">訊息</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid black; color: #FF0000;">A01</td>
              <td style="border: 1px solid black;">エンジンがかからない</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #FF0000;">A02</td>
              <td style="border: 1px solid black;">車両に損傷があります!</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #FF0000;">A03</td>
              <td style="border: 1px solid black;">タイヤがパンクしています</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #EA7500;">B01</td>
              <td style="border: 1px solid black;">車両のライトが異常です</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #EA7500;">B02</td>
              <td style="border: 1px solid black;">車両の操作が異常です</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #EA7500;">B03</td>
              <td style="border: 1px solid black;">エンジンの異音がします</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #6FB7B7;">C01</td>
              <td style="border: 1px solid black;">ブレーキの摩耗があります。</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #6FB7B7;">C02</td>
              <td style="border: 1px solid black;">ライトの異常があります</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #6FB7B7;">C03</td>
              <td style="border: 1px solid black;">点検日が過ぎています</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #6FB7B7;">C04</td>
              <td style="border: 1px solid black;">タイヤの摩耗が進んでいます</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #6FB7B7;">C05</td>
              <td style="border: 1px solid black;">車体にキズがあります</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; color: #0000FF;">E</td>
              <td style="border: 1px solid black;">処理中です</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
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
      <div class="cont">
        <button type="button" class="btn btn-success btn-sm px-3" @click="finaldelete">決定</button>
        <button type="button" class="btn btn-danger btn-sm px-3" @click="switchModal">キャンセル</button>
      </div>
    </Modal>
    <Modal v-if="isShow && modalType == 'finish'" @pushOutside="closeModal">
      <div class="con">
        <h2 class="m-2">以下の情報を入力してください。</h2>
        <table class="m-3 ">
          <tr>
            <th><label class="my-2">車両番号</label></th>
            <td>{{ item.licensePlate }}</td>
          </tr>
          <tr>
            <th><label for="city" class="my-2">価格</label></th>
            <td><input type="text" placeholder="ex:1500" id="city" v-model="price"></td>
          </tr>
          <tr>
            <th><label for="city" class="my-2">注記</label></th>
            <td>
              <select id="city" v-model="note">
                <option value="">コードを選択してください</option>
                <option value="A01">A01</option>
                <option value="A02">A02</option>
                <option value="A03">A03</option>
                <option value="B01">B01</option>
                <option value="B02">B02</option>
                <option value="B03">B03</option>
                <option value="C01">C01</option>
                <option value="C02">C02</option>
                <option value="C03">C03</option>
                <option value="C04">C04</option>
                <option value="C05">C05</option>

              </select>
            </td>

          </tr>
        </table>
        <div class="cont1">
          <button type="button" class="btn btn-success btn-sm px-3" @click="finalfinish">確認</button>
          <button type="button" class="btn btn-danger btn-sm px-3" @click="switchModal">キャンセル</button>
        </div>

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
        { key: `serialNumber`, column: "#" },
        { key: `licensePlate`, column: "車両番号" },
        { key: `startTime`, column: "修理開始時刻" },
        { key: `note`, column: "註記" }],
      maintenanceData: [],
      searchText: '',
      showEditButton: false,
      showDeleteButton: true,
      showCompleteButton: true,
      isShow: false,
      isReasonCodeModalShow: false,
      sortOption: 'timeDesc', // 預設以時間降序排序
      showControl: true,
      licensePlate: '',
      price: '',
      note: '',
      message: '', // 執行後端方法的回覆
      isMessage: false,
      item: {},
      modalType: '',
      SearchKeyword: '',
      filteredItems: [],
      filteredLicenceplates: []
    };
  },
  mounted() {
    this.fetchMaintenanceData();
  },
  methods: {
    fetchMaintenanceData() {
      fetch("http://localhost:8080/find_latest_ten_unfinished_abnormal")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.maintenanceData = data.maintenanceList.map(item => {

            return {
              ...item,
              startTime: item.startTime.replace('T', ' '),
              endTime: item.endTime
            };
          });
        });
    },
    finaladd() {
      const body = {
        "licensePlate": this.licensePlate,
      }
      fetch("http://localhost:8080/Add_abnormal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
        .then(data => this.message = data.message)
      this.isMessage = true,
        this.isShow = false
      // 關閉跳出式視窗
    },
    finalfinish() {
      const body = {
        "licensePlate": this.item.licensePlate,
        "price": this.price,
        "note": this.note,
      }
      console.log(body);
      fetch("http://localhost:8080/finish_abnormal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
        .then(data => {
          this.message = data.message
          console.log(data);
        })
      this.isMessage = true
      this.isShow = false
      // 關閉跳出式視窗
    },
    closeModal() {
      this.isShow = false
      item = null
      // 執行刪除操作
      // 可以將 item 傳遞到後端方法進行處理
    }, deleteItem(item) {

      this.isShow = !this.isShow
      this.modalType = 'delete'
      this.item = item
    }, finaldelete() {
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
      this.isShow = false
    }
    , Reload() {
      this.isShow = false
      this.isMessage = false
      fetch("http://localhost:8080/find_latest_ten_unfinished_abnormal")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.maintenanceData = data.maintenanceList.map(item => {

            return {
              ...item,
              startTime: item.startTime.replace('T', ' '),
              endTime: item.endTime
            };
          });
        });

      // window.location.reload()
    },
    switchReasonCodeModal() {
      this.isReasonCodeModalShow = !this.isReasonCodeModalShow;
    },
    switchModal() { // 跳出式視窗顯示與否
      this.isShow = !this.isShow
      this.modalType = type
    },
    updateFilteredData() {
      if (!this.searchText) {
        return this.maintenanceData;
      }
      const keyword = this.searchText.toLowerCase();
      return this.maintenanceData.filter(item => item.city.includes(keyword));
    },

    sortData() {
      if (this.sortOption === 'timeAsc') {
        this.filteredData.sort((a, b) => new Date(b.startTime) - new Date(a.startTime)); // 按開始時間降序排序
      } else if (this.sortOption === 'timeDesc') {
        this.filteredData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)); // 按開始時間升序排序
      }
    },
    finishItem(item) {
      console.log('finishItem被觸發了');
      this.isShow = !this.isShow
      this.modalType = 'finish'
      this.item = item
    },
    confirmSearch() {
      if (!this.SearchKeyword) {
        return this.maintenanceData;
      }

      return this.maintenanceData.filter(item => item.licensePlate.includes(this.SearchKeyword));


    }
  },
  watch: {
    searchText() {
      this.updateFilteredData();
    },

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
      }

      return filteredByLicensePlate;
    },

    sortData() {
      if (this.sortOption === 'timeAsc') {
        this.filteredData.sort((a, b) => new Date(b.startTime) - new Date(a.startTime)); // 按開始時間降序排序
      } else if (this.sortOption === 'timeDesc') {
        this.filteredData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)); // 按開始時間升序排序
      }
    },

    formattedData() {
      return this.filteredData.map(item => {
        return {
          ...item,
          startTime: item.startTime,
          endTime: item.endTime
        };
      });
    },
    confirmSearch() {
      if (!this.SearchKeyword) {
        return this.maintenanceData;
      }

      return this.maintenanceData.filter(item => item.licensePlate.includes(this.SearchKeyword));


    },
  }
}

</script>

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

.oo {
  width: 200px;
}

.ii {
  display: flex;

}

.btn {
  color: whie;
}
</style>
