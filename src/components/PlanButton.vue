<script>
export default {
  props:["propImg", "propTitle"],
  data() {
    return {
      img: null,
      // title: ``
    }
  }
}
</script>

<template>
  <div>
    <img :src="propImg" alt="img">
    <p class="fs-3 m-0 fw-bold text-center">{{ propTitle }}</p>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 100%;
  }

  p {
    color: #007ec8;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #91f6d4;
  }
}
</style>