<script>
export default {
  props: {
    columns: { // 為表個欄位名稱
      type: Array,
      required: true
    }, data: { // 為表格內容，必需為陣列形式
      type: Array,
      required: true
    },
    unitText: "",
  },
  data() {
    return {
    }
  }
}
</script>

<template>
  <div class="card">

    <div class="plan">
      <strong class="fs-4">{{ data['threshold'] }}</strong>
      <span class="fs-4">{{ unitText }}</span>
    </div>
    <div class="plan">
      <strong class="fs-4">{{ data['rate'] }}</strong>
      <span class="fs-4">円/{{ unitText }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .card {
    background-color: #9dcbfc;
    height: 100%;

    .plan {
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .fs-4 {
        color: #00108c;
      }
    }
  }
</style>