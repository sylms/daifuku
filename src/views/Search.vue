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
    <infinite-loading
      v-if="rows.length !== 0"
      @infinite="infiniteHandler"
    ></infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

export default Vue.extend({
  name: "search",
  components: {
    InfiniteLoading,
  },
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
        // API の実装がまだできていなく表示するものがないので一時的に非表示にする
        /*
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
        */
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
      page: 1,
      limit: 20,
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

    buildSearchURLParam: function (offset = 0) {
      const keyword = this.keyword || "";

      if (keyword == "") {
        console.error("keyword empty");
      }

      const sp = new URLSearchParams();
      sp.set("course_name", keyword);
      sp.set("course_name_filter_type", this.course_name_filter_type);
      sp.set("course_overview", keyword);
      sp.set("course_overview_filter_type", this.course_overview_filter_type);
      sp.set("limit", this.limit.toString());
      sp.set("filter_type", this.filter_type);
      sp.set("offset", offset.toString());
      return sp.toString();
    },

    search: async function () {
      const param = this.buildSearchURLParam();
      this.fetchAPI("/course", param)
        .then((rowsJson) => {
          this.rows = rowsJson;
          // 検索実行によって表示された状態は page = 1 とする
          this.page = 1;
        })
        .catch((err) => console.error(err));
    },

    getShortString: function (str: string) {
      return str ? `${str.substring(0, this.substringMaxNum)} ...` : "";
    },

    infiniteHandler: function ($state) {
      const offset = this.limit * this.page;
      const param = this.buildSearchURLParam(offset);
      this.fetchAPI("/course", param)
        .then((rowsJson) => {
          if (!rowsJson) {
            $state.complete();
            return;
          }
          // TODO: OpenAPI 整備のタイミングできれいにする
          rowsJson.map((row) => {
            return this.rows.push(row);
          });
          this.page++;
          $state.loaded();
        })
        .catch((err) => console.error(err));
    },
  },
});
</script>

<style>
.root {
  padding: 0px 15px;
}
</style>
