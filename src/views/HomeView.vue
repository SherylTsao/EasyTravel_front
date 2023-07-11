<script>

</script>

<template>
  <main>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                        <img src="https://png.pngtree.com/background/20210709/original/pngtree-japanese-style-zephyr-romantic-japan-picture-image_928628.jpg"
                            class="d-block  w-100" alt="...">
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                        <img src="https://png.pngtree.com/background/20210709/original/pngtree-japanese-poster-japan-tourism-japanese-zephyr-picture-image_927763.jpg"
                            class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-japanese-style-zephyr-hand-painted-cherry-blossoms-image_16889.jpg"
                            class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/pic/nihon.jpg"
                            class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/pic/tokyo.jpg"
                            class="d-block w-100" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
   
    <nav>
      <div class="serviceicon mt-5">
        <i class="fa-solid fa-bicycle"></i>
        <i class="fa-solid fa-motorcycle"></i>
        <i class="fa-solid fa-car"></i>
      </div>
      <h3 class="text-center mt-5">EasyTravel とは</h3>
      <div class="down">
        <!-- <img src="https://pngimg.com/uploads/hyundai/hyundai_PNG11233.png" style="height: 90px;"> -->
        <img
          src="https://3.bp.blogspot.com/-lOomA6mrfYc/WCqddq_T6ZI/AAAAAAAA_hI/zhOD4BbIpO095LLo3DsDOwBFAe1SEpusQCLcB/s400/car_spare_tire_koukan.png"
          style="height: 10rem;">
        <div class="note mt-5">
          <p class="text-center">EasyTravel とは</p>
          <p class="text-center">乗りたい時に借りて、行きたい場所で</p>
          <p class="text-center">返すことができる自転車の</p>
          <p class="text-center">シェア（共有）サービスです。</p>
          <p class="text-center">電車、車に次ぐ新しい交通手段として</p>
          <p class="text-center">颯爽と赤い電動自転車でラクラクと</p>
          <p class="text-center">漕ぎ出してみませんか？</p>
        </div>
        <img src="https://3.bp.blogspot.com/-svNlUnpKnnQ/VkxNjoNoE_I/AAAAAAAA0xQ/nW21lLgRjVs/s500/jitensya_tenjiblock.png"
          alt="homebicycle" style="height: 10rem;">
      </div>
      <nav class="area" style="height: 300px;width: 500px;">
        <div class="bg">
          <img src="../../public/logo2.png" alt="" class="logo">
        </div>
        <div class="bgcon">
          <p>公式アプリを使えば、自転車をすぐに利用できます。

            お近くのポート情報が地図上から検索できるほか、各コミュニティサイクルに登録できたり、最新情報も受け取れる公式アプリです。</p>
          <nav>
            <img src="../../public/appstore.png" class="store">
          </nav>
        </div>
        <!-- <img src="https://tse3.mm.bing.net/th?id=OIP.pOMEk61ug9XSsDMDtMmDAQHaFH&pid=Api&P=0&h=180" -->
        <!-- class="sco" style="height: 90px;"> -->

      </nav>
    </nav>

  </main>
</template>

<style lang="scss" scoped>
.carousel-item {
  height: 480px;
}

.serviceicon {
  font-size: 4rem;
  display: flex;
  justify-content: space-around;

}

.down {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.area {
  display: flex;
  margin-left: 30%;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 60px;
  width: 107px;
  // margin-left: 30%;
  margin-top: 4rem;
}

.bg {
  // background-image: url("../../public/phone.jpg");
  background-image: url("../../public/phoneImg.png");
  height: 200px;
  width: 400px;
  margin-right: 1rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.bgcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.store {
  height: 40px;
  // width: 15rem;
}

// .sco{
//   margin-top: 5rem;
//   margin-left: 10rem;
// }
</style>
