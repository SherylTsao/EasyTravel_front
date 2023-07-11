<!-- <script>
export default {
     data() {
          return {
               // 自己宣告 ，用於雙向綁定
               account: null,
               pwd: null,
          }
     },
     methods: {
          active: (acc, pwd) => {
               const body = {
                    // "REQ名稱"
                    account: acc,
                    password: pwd,

               }
               console.log(body)
               fetch("http://localhost:8080/user_active", {

                    method: "POST",//預設是get
                    headers: {
                         'Content-Type':
                              'application/json',
                    },
                    body: JSON.stringify(body)

               })
                    .then(function (response) {
                         return response.json()
                    })
                    .then(function (data) {
                         console.log(data)
                    })
          }
     } 
}
</script>
<template>
      <div class="wrap-active">
          <div class="title-active">
               <h4>アクティブ化</h4>
          </div>

          <div class="active-area">
               <div>
                    <div class="account-active">
                         
                         <button type="button">アカウント</button>
                         
                         
                         <input type="text"  v-model="account">
                    </div>
                    <div class="pwd-active">
                         <h4>パスワード :</h4>
                      
                         <input type="text" v-model="pwd">
     
                    </div>
                    
                    
                    <div class="btn-active">
                         <button type="button" class="btn-act" @click="active(this.account, this.pwd)">アクティブ化</button>
                    </div>
               </div>

          </div>
          
     </div>
</template>

<style lang="scss" scoped>
     .wrap-active {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
     .title-active {
          // background-color: #f4efef;
          width: 10rem;
          border: 0.3rem solid rgb(223, 30, 137);
          text-align: center;
          font-size: 3rem;
          margin: 2rem;
     }

     .active-area {
          border: 1px solid black;
          border-radius: 10%;
          display: flex;
          justify-content: center;
          .btn-active{
               padding: 20% 25%;
               .btn-act{
                    // padding: 5spx;
                    width: 120px;
                    height: 30px;
               }
               
          }
     }
}
</style> -->