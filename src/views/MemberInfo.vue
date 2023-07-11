<script>
import { RouterView } from "vue-router";
import Left from "../components/Left.vue";
import MemberSearch from "./MemberSearch.vue";

export default {
     data() {
          return {
               showContent: true
          }
     },
     beforeRouteUpdate(to, from, next) {
          this.showContent = to.path == "/member-info"; // 根據路由判断是否隐藏内容
          next();
     },
     components: {
          Left,
          MemberSearch
     },

}
</script>

<template>
     <br>
     <div class="wrap">
          <div class="link">
               <!-- 各大項連結 -->
               <Left />
          </div>
          <div class="main-page">
               <RouterView />
               <p v-if="showContent">
               <h4 class="text-center">当サイトでの個人情報の取扱いについて</h4>
               <p class="ms-5">EasyTravel会社（以下、「弊社」といいます）は、個人情報保護法その他関連法令に従い、お客様の個人情報を適正に取り扱うことが企業の重要な社会的責務であると認識し、弊社の運営する
                    「レンタカーシステムーWebサイト」(以下、「当ウェブサイト」といいます)
                    または「レンタカーシステムーアプリ」（以下、「当アプリ」といいます）において、お客様からご提供いただく個人情報を、以下のとおり管理し、保護いたします。</p>
               <h4 class="text-center">お客様からご提供いただく個人情報について</h4>
               <p class="ms-5">弊社は、お客様の氏名・ 住所 ・ 生年月日 ・ 性別 ・ 電話番号 ・ emailアドレス ・
                    運転免許証番号・レンタカー予約に関する情報（利用車種クラス・使用目的・借受期間等）・その他当ウェブサイトまたは当アプリにおいてお客様にご入力いただいた情報（以下、「個人情報」といいます）を、取得いたします。
               </p>
               <h4 class="text-center">個人情報の利用目的について</h4>
               <p class="ms-5">弊社は、お客様からご提供いただいた個人情報を、以下の目的の範囲内で、適正に利用いたします。</p>
               <li class="ms-5">トヨタレンタカーの予約、その他当ウェブサイトまたは当アプリで提供するサービスの提供のため</li>
               <li class="ms-5">弊社の取り扱う商品・サービス等または各種イベント・キャンペーン等についての、宣伝印刷物の交付・eメールの送信等の方法によるご案内のため</li>
               <li class="ms-5">商品開発またはお客様満足度向上策等の検討のためのアンケート調査の実施のため</li>
               <li class="ms-5">弊社の取り扱う商品・サービス等の企画・開発または品質向上のため</li>
               <h4 class="text-center">個人情報の管理ついて</h4>
               <p class="ms-5">弊社は、当ウェブサイトまたは当アプリのご利用にあたってお客様からご提供いただいたお客様の個人情報を、紛失、毀損することのないよう、厳重なデータ管理を実施しています。</p>
               <p class="ms-5">また、お客様の個人情報は、弊社の当ウェブサイト管理責任者のみアクセス可能な環境下に保管し、第三者に漏洩、または外部から改変されることのないよう、厳重なセキュリティ対策を実施しています。
               </p>
               <p class="ms-5">
                    弊社は、当ウェブサイトもしくは当アプリの運用にかかる業務、またはお客様の個人情報の利用・管理等にかかる業務を社外に委託する場合は、当該委託先による個人情報の取扱いについて厳正に監督・管理いたします。</p>
               </p>
          </div>
     </div>
</template>

<style lang="scss" scoped>
#MemberInfo-userInfo-Search {
     display: none;
}

.wrap {
     // width: 100vw;
     display: flex;
     justify-content: space-between;

     .link {
          width: 15%;
     }

     .main-page {
          width: 85%;
          // border: 1px solid black;
     }
}
</style>