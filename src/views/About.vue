<template>
  <div class="root">
    <h1>sylms Explorer とは</h1>
    <p>
      <router-link to="/">sylms Explorer</router-link>
      は筑波大学にて開講されている科目を検索できるサービスです。
    </p>
    <p>
      情報ソースとして
      <a href="https://kdb.tsukuba.ac.jp/" target="_blank" rel="noopener"
        >KdB</a
      >
      を利用しています。
    </p>
    <p>
      <a href="https://kdb.tsukuba.ac.jp/syllabi/2021/GB13312/jpn/"
        >情報特別演習I</a
      >
      の演習として作成されているものです。
    </p>
    <p>
      ご意見などは
      <a
        href="https://forms.gle/RjuAKf4atpvgBtAY6"
        target="_blank"
        rel="noopener"
        >こちら（Google Forms）</a
      >
      にお願いします。
    </p>
    <h2>注意事項</h2>
    <p>これは試験運用です。予告なくサービスを停止する場合があります。</p>
    <p>検索結果についての保証はありません。各自の責任でご利用ください。</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "about",
  components: {},
  metaInfo: {
    title: "sylms Explorer とは",
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style>
.root {
  padding: 0px 15px;
}
</style>
