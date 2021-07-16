<template>
  <h1>daifuku</h1>
  <div class="serchForm">
    <div class="freeWordForm">
      <label for="courseName">科目名</label>
      <input
        type="text"
        id="courseName"
        v-model="courseName"
        placeholder="検索したい語句を入力してください。"
      /><br />
      <label for="courseOverview">科目概要</label>
      <input
        type="text"
        id="courseOverview"
        v-model="courseOverview"
        placeholder="検索したい語句を入力してください。"
      /><br />

      <button v-on:click="submitWord">検索</button>
    </div>
  </div>
  <div>
    <table-lite
      :has-checkbox="false"
      :columns="columns"
      :rows="rows"
      :total="rows.length"
    ></table-lite>
  </div>
</template>

<script>
import TableLite from "vue3-table-lite";

export default {
  name: "search",
  components: {
    TableLite,
  },
  data() {
    return {
      columns: [
        {
          label: "科目番号",
          field: "course_number",
        },
        {
          label: "科目名",
          field: "course_name",
        },
        {
          label: "授業方法",
          field: "instructional_type",
        },
        {
          label: "単位",
          field: "credits",
        },
        // API の実装がまだできていなく表示するものがないので一時的に非表示にする
        /*
        {
          label: "年次",
          field: "standard_registration_year",
        },
        {
          label: "学期",
          field: "term",
        },
        {
          label: "曜時限",
          field: "period",
        },
        */
        {
          label: "教室",
          field: "classroom",
        },
        {
          label: "担当教員",
          field: "instructor",
        },
        {
          label: "授業概要",
          field: "course_overview",
        },
        {
          label: "備考",
          field: "remarks",
        },
        {
          label: "科目履修生申請可否",
          field: "credited_auditors",
        },
        {
          label: "申請条件",
          field: "application_conditions",
        },
        {
          label: "英語（日本語）科目名",
          field: "alt_course_name",
        },
        {
          label: "科目コード",
          field: "course_code",
        },
        {
          label: "要件科目名",
          field: "course_code_name",
        },
        {
          label: "最終更新日時",
          field: "csv_updated_at",
        },
      ],
      rows: [],
      apiHost: process.env.VUE_APP_SYLMS_DAIFUKU_API_HOST
    };
  },

  methods: {
    // TODO: メソッド分割
    // query: `/example` のようなパス
    fetchAPI: function (query) {
      // TODO: URL オブジェクトで生成できるのであればそれでやる
      let url = `https://${this.apiHost}${query}`;

      fetch(url, {
        methods: "GET",
      })
      .then((res) => {
        res.json().then((json) => {
          if (json != null) {
              this.rows = json;
          }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },

    submitWord: function () {
      const courseName = this.courseName ? this.courseName.trim() : "";
      const courseOverview = this.courseOverview
        ? this.courseOverview.trim()
        : "";
      const filterType = "or";
      const limitNum = 100;

      if (courseName == "") {
        console.error("courseName empty");
      }
      if (courseOverview == "") {
        console.error("courseOverview empty");
      }

      const queryApi = `/course?course_name=${courseName}&course_overview=${courseOverview}&filter_type=${filterType}&limit=${limitNum}`;
      this.fetchAPI(queryApi);
    },
  },
};
</script>
