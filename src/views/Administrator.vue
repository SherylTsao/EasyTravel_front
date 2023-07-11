<template>
  <div class="content">
    <h2 class="text-center">管理者ページ</h2>
  </div>
  <div class="wrap">
    <div class="link">
      <!-- 各大項連結 -->
      <SiderView />
    </div>
    <div class="main-page">
      <RouterView />
      <p v-if="showContent" class="content2">
        管理者使用マニュアル

        本マニュアルでは、管理者ページの機能と操作方法について説明します。

        交通機関管理
        交通機関管理機能では、以下の操作が可能です。

        車両の追加
        この機能を使用して、データベースに新しい車両を追加することができます。関連する車両情報を適切に入力し、保存ボタンをクリックして保存してください。追加が完了すると、車両情報がデータベースに保存されます。
        <br>
        <br>
        <br>
        修理する車両
        この機能では、修理が必要な車両に関する操作が行えます。

        車両の追加
        修理が必要な車両情報を追加できます。関連する情報を入力し、データベースに保存します。

        検索
        特定の条件に基づいて修理が必要な車両を検索することができます。関連する検索条件を入力し、条件に合致する車両情報を取得します。

        料金管理
        料金管理機能では、以下の操作が行えます。
        <br>
        <br>
        <br>
        料金設定
        車両のレンタル料金を管理および設定できます。この機能を使用して、異なるタイプの車両のレンタル料金や計算方法などの設定を行います。

        サイト管理
        サイト管理機能では、以下の操作が行えます。

        サイト情報
        レンタルサイトの情報を管理および維持できます。この機能を使用して、レンタルサイトのデータを追加、編集、削除し、サイトの詳細情報を設定します。
      </p>
    </div>
  </div>
</template>
  
<script>
import { RouterView } from "vue-router";
import SiderView from "../components/Sider.vue";

export default {
  components: {
    SiderView
  },
  data() {
    return {
      showContent: true
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.showContent = to.path == "/administrator"; // 根据路由判断是否隐藏内容
    next();
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  display: flex;

  justify-content: space-between;
  margin-top: 2rem;

  .link {
    width: 15%;
    margin-right: 1rem;
  }

  .content2 {
    padding: 0 10rem;
  }

  .main-page {
    width: 85%;
  }

  .content {
    margin-bottom: 2rem;
  }
}
</style>



