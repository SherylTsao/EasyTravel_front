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
                    車の管理
                </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse  " aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample">
                <div class="d-flex flex-column my-3 ">
                    <RouterLink class="link" to="/vehicle-add-car">一覧</RouterLink>
                    <!-- <RouterLink class="link" to="/vehicle-find-car-and-update">修改車輛</RouterLink>
                    <RouterLink class="link" to="/vehicle-scrap-car">報廢車輛</RouterLink> -->
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    修理する車両
                </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample">
                <div class="d-flex flex-column my-3" >
                    <RouterLink class="link" to="/AddCar">追加</RouterLink>
                    <RouterLink class="link" to="/ResearchCar">検索</RouterLink>
                    <!-- <RouterLink class="link" to="/DeleteCar">削除</RouterLink>
                    <RouterLink class="link" to="/FinishCar">結單</RouterLink> -->
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    料金管理
                </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse my-3" aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample">
                <RouterLink class="link" to="/feeManager">料金</RouterLink>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                    サイト管理
                </button>
            </h2>
            <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour"
                data-bs-parent="#accordionFlushExample">
                <div class="d-flex flex-column my-3">
                    <RouterLink class="link" to="/location-manage">サイト</RouterLink>
                    <RouterLink class="link" to="/location-vehicle">サイト車両</RouterLink>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingFive">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                    レポート
                </button>
            </h2>
            <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive"
                data-bs-parent="#accordionFlushExample">
                <div class="d-flex flex-column my-3">
                    <RouterLink class="link" to="/finance">レポート</RouterLink>
                    <RouterLink class="link" to="/finance-chart">チャート</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.list {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.link {
  text-decoration: none;
  color:		#006000;
  transition: 0.4s;
  &:hover{
    color: 	#43db43;
  }
}
</style>