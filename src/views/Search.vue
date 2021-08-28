<template>
  <div class="root">
    <h1>daifuku</h1>
    <div class="freeWordForm">
      <b-container fluid>
        <b-row>
          <b-col sm="3">
            <label for="keyword">キーワード</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="keyword"
              v-model="keyword"
              :placeholder="searchPlaceholderMessage"
              type="search"
              trim
              @keypress.enter="search"
              autofocus
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <button v-on:click="search">検索</button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-table striped :items="rows" :fields="fields">
      <template #cell(course_number)="data">
        <a
          :href="`https://kdb.tsukuba.ac.jp/syllabi/${data.item.year}/${data.item.course_number}/jpn/`"
          target="_blank"
          rel="noopener"
          >{{ data.value }}</a
        >
      </template>

      <template #cell(standard_registration_year)="data">
        <span v-for="(item, index) in data.value" v-bind:key="index">
          {{ item }}
        </span>
      </template>

      <template #cell(period)="data">
        <span v-for="(item, index) in data.value" v-bind:key="index">
          {{ item }}
        </span>
      </template>

      <template #cell(instructor)="data">
        <span v-for="(item, index) in data.value" v-bind:key="index">
          {{ index == 0 ? "" : ", " }}
          <a
            :href="`https://trios.tsukuba.ac.jp/researcher/search/simple/${item}`"
            target="_blank"
            rel="noopener"
            >{{ item }}</a
          >
        </span>
      </template>

      <template #cell(course_overview)="data">
        {{ getShortString(data.value) }}
      </template>

      <template #cell(remarks)="data">
        {{ getShortString(data.value) }}
      </template>

      <template #cell(application_conditions)="data">
        {{ getShortString(data.value) }}
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "search",
  components: {},
  data() {
    return {
      fields: [
        {
          label: "科目番号",
          key: "course_number",
        },
        {
          label: "科目名",
          key: "course_name",
        },
        {
          label: "授業方法",
          key: "instructional_type",
        },
        {
          label: "単位",
          key: "credits",
        },
        {
          label: "年次",
          key: "standard_registration_year",
        },
        {
          label: "学期",
          key: "term",
        },
        {
          label: "曜時限",
          key: "period",
        },
        {
          label: "教室",
          key: "classroom",
        },
        {
          label: "担当教員",
          key: "instructor",
        },
        {
          label: "授業概要",
          key: "course_overview",
          // display: function (row) {
          //   console.log(row);
          //   return row.course_overview
          //     ? row.course_overview.substring(0, this.substringMaxNum)
          //     : null;
          // },
        },
        {
          label: "備考",
          key: "remarks",
          // display: function (row) {
          //   return row.remarks
          //     ? row.remarks.substring(0, this.substringMaxNum)
          //     : null;
          // },
        },
        {
          label: "科目履修生申請可否",
          key: "credited_auditors",
        },
        {
          label: "申請条件",
          key: "application_conditions",
          // display: function (row) {
          //   return row.application_conditions
          //     ? row.application_conditions.substring(0, this.substringMaxNum)
          //     : null;
          // },
        },
        {
          label: "英語（日本語）科目名",
          key: "alt_course_name",
        },
        {
          label: "科目コード",
          key: "course_code",
        },
        {
          label: "要件科目名",
          key: "course_code_name",
        },
        {
          label: "最終更新日時",
          key: "csv_updated_at",
        },
      ],
      rows: [],
      apiHost: process.env.VUE_APP_SYLMS_DAIFUKU_API_HOST,
      substringMaxNum: 5,
      keyword: "",
      searchPlaceholderMessage: "検索したい語句を入力してください。",
      course_name_filter_type: "and",
      course_overview_filter_type: "and",
      filter_type: "and",
    };
  },

  methods: {
    fetchAPI: function (path: string, query: string) {
      // TODO: URL オブジェクトで生成できるのであればそれでやる
      const url = `${this.apiHost}${path}?${query}`;

      return fetch(url, {
        method: "GET",
      }).then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`${res.statusText}`));
        }
        return res.json();
      });
    },

    buildSearchURLParam: function () {
      const keyword = this.keyword || "";
      const limitNum = 100;

      if (keyword == "") {
        console.error("keyword empty");
      }

      const sp = new URLSearchParams();
      sp.set("course_name", keyword);
      sp.set("course_name_filter_type", this.course_name_filter_type);
      sp.set("course_overview", keyword);
      sp.set("course_overview_filter_type", this.course_overview_filter_type);
      sp.set("limit", limitNum.toString());
      sp.set("filter_type", this.filter_type);
      return sp.toString();
    },

    search: async function () {
      const param = this.buildSearchURLParam();
      this.fetchAPI("/course", param)
        .then((rowsJson) => (this.rows = rowsJson))
        .catch((err) => console.error(err));
    },

    getShortString: function (str: string) {
      return str ? `${str.substring(0, this.substringMaxNum)} ...` : "";
    },
  },
});
</script>

<style>
.root {
  padding: 0px 15px;
}
</style>
