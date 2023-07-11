// 狀態資料庫
import { defineStore } from 'pinia'

// (,{三個大項物件})
export default defineStore("indexStore", {
     // data=>pinia格式
     // state: () => {
     //      return{

     //      }
     // },
     // 下面為省略寫法:
     state: () => ({
          // 預設寫法
          login: false,
          loginInfo: null,
          name: "",
          vehicleInfo: null,
          manager: false,
          isRent: false
     }),

     // computed
     getters: {
          // 箭頭函式 帶入上方的state 跟vue寫法不同地方
          //  getLocation: (state) => `現在的位置是:...${state.location}`
          // 取得帳號資訊
          getLoginInfo: (state) => state.loginInfo,
          getVehicleInfo: (state) => state.vehicleInfo,
          isLogin: (state) => state.login,
          getUser: (state) => `Hi, ${state.name}`
     },

     // methods
     // 唯一可以用 this的區域(上面兩種不可以)
     actions: {
          // 傳統函式
          // 使用者登入
          loginPage() {
               this.login = true;
          },
          // 儲存登入者資訊
          updateLoginInfo(info) {
               this.loginInfo = info
          },
          // 儲存登入者姓名
          updateName(name) {
               this.name = name
          },
          // 使用者登出
          signOut() {
               this.login = false;
          },
          // 管理者登入
          managerPage() {
               this.manager = true;
          },
          // 管理者登出
          manaSignOut() {
               this.manager = false;
          },
          // 租車
          rent() {
               this.isRent = true
          },
          updateVehicleInfo(info) {
               this.vehicleInfo = info
          },
          // 還車
          getback() {
               this.isRent = false
          }
     }
})