<script>


import { RouterLink } from "vue-router";

export default {

}
</script>
<template>
     <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
               <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                         data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                         会員情報管理
                    </button>
               </h2>
               <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="d-flex flex-column">
                         <RouterLink class="router-link" to="/member-search">会員情報</RouterLink>
                         <RouterLink class="router-link" to="/member-info/update">会員情報変更</RouterLink>
                         <RouterLink class="router-link" to="/upgrade">有料会員</RouterLink>
                         <RouterLink class="router-link" to="/deleteVIP">取り消すVIP</RouterLink>
                         <RouterLink class="router-link" to="/rentData">レンタル</RouterLink>
                         
                    </div>
               </div>
          </div>
     </div>
</template>

<style lang="scss" scoped>
     .router-link {
     // 取消下底線
     text-decoration: none;
     color: #006000;
     margin: 0.5rem 0rem;
     transition: 0.4s;

          &:hover {

               // color: rgb(63, 131, 14);
               color: #43db43;
          }
     }
.out {

     // width: 20vw;
     .router-link {
    
          cursor: pointer;
          transition: 0.4s;
          // scale: 01.5rem;
          margin: 3rem 0rem;

          &:hover {

               color: rgb(201, 201, 103);
          }
     }
}



</style>