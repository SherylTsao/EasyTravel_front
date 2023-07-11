<script>
import { RouterView } from "vue-router";
import HeaderView from "./components/Header.vue";
import FooterView from './components/Footer.vue'

export default {
  components: {
    HeaderView,
    FooterView
  },
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<template>
  <HeaderView v-if="isShow" />
  <div class="main-area ">
    <RouterView />
  </div>
  <FooterView />
</template>

<style lang="scss" scoped>

.main-area {
  width: 100vw;
  // height: 1200px;

  // height: 100%;
  // box-sizing: border-box;
  // margin: auto;
  
  
  
  padding: 2rem;
  // background-color: #d7d7ff;

}
</style>