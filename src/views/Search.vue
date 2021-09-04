<template>
  <div class="root">
    <h1>sylms Explorer</h1>
    <div class="freeWordForm">
      <b-container fluid>
        <b-row>
          <b-col sm="3">
            <label for="courseNameKeyword">科目名</label>
          </b-col>
          <b-col sm="2">
            <div id="selectFilterType_CN">
              <input
                type="radio"
                v-model="course_name_filter_type"
                value="and"
              />
              <label for="and">AND</label>
              <input
                type="radio"
                v-model="course_name_filter_type"
                value="or"
              />
              <label for="or">OR</label>
            </div>
          </b-col>
          <b-col sm="7">
            <b-form-input
              id="course_name_keyword"
              v-model="course_name_keyword"
              :placeholder="searchPlaceholderMessage"
              type="search"
              trim
              @keypress.enter="search"
              autofocus
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label for="courseOverviewKeyword">授業概要</label>
          </b-col>
          <b-col sm="2">
            <div id="selectFilterType_CO">
              <input
                type="radio"
                v-model="course_overview_filter_type"
                value="and"
              />
              <label for="and">AND</label>
              <input
                type="radio"
                v-model="course_overview_filter_type"
                value="or"
              />
              <label for="or">OR</label>
            </div>
          </b-col>
          <b-col sm="7">
            <b-form-input
              id="course_overview_keyword"
              v-model="course_overview_keyword"
              :placeholder="searchPlaceholderMessage"
              type="search"
              trim
              @keypress.enter="search"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <div id="selectFilterType_ALL">
              <input type="radio" v-model="filter_type" value="and" />
              <label for="and">AND</label>
              <input type="radio" v-model="filter_type" value="or" />
              <label for="or">OR</label>
            </div>
          </b-col>
          <b-col>
            <button v-on:click="search">検索</button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-table striped :items="rows" :fields="fields">
      <template #cell(courseNumber)="data">
        <a
          :href="`https://kdb.tsukuba.ac.jp/syllabi/${data.item.year}/${data.item.courseNumber}/jpn/`"
          target="_blank"
          rel="noopener"
          >{{ data.value }}</a
        >
      </template>

      <template #cell(standardRegistrationYear)="data">
        <span v-for="(item, index) in data.value" v-bind:key="index">
          {{ item }}
        </span>
      </template>

      <template #cell(period)="data">
        <span v-for="(item, index) in data.value" v-bind:key="index">
          {{ item }}
        </span>
      </template>

      <template #cell(term)="data">
        <span v-for="(item, index) in data.value" v-bind:key="index">
          {{ decodeTerm(item) }}
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

      <template #cell(courseOverview)="data">
        {{ getShortString(data.value) }}
      </template>

      <template #cell(remarks)="data">
        {{ getShortString(data.value) }}
      </template>

      <template #cell(applicationConditions)="data">
        {{ getShortString(data.value) }}
      </template>
    </b-table>
    <infinite-loading
      v-if="searched"
      @infinite="infiniteHandler"
      :identifier="infiniteLoadingIdentifier"
    >
      <div slot="no-more">検索結果はこれ以上ありません</div>
      <div slot="no-results">検索条件にヒットする科目はありません</div>
    </infinite-loading>
  </div>
</template>

<script lang="ts">
import {
  Configuration,
  Course,
  GetCourseCourseNameFilterTypeEnum,
  GetCourseCourseOverviewFilterTypeEnum,
  GetCourseFilterTypeEnum,
  CourseApi,
} from "@/openapi";
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

export default Vue.extend({
  name: "search",
  components: {
    InfiniteLoading,
  },
  data(): {
    fields: {
      label: string;
      key: string;
    }[];
    rows: Course[];
    apiHost: string;
    substringMaxNum: number;
    searchPlaceholderMessage: string;
    course_name_keyword: string;
    course_overview_keyword: string;
    course_name_filter_type: GetCourseCourseNameFilterTypeEnum;
    course_overview_filter_type: GetCourseCourseOverviewFilterTypeEnum;
    filter_type: GetCourseFilterTypeEnum;
    page: number;
    limit: number;
    searched: boolean;
    infiniteLoadingIdentifier: number;
  } {
    return {
      fields: [
        {
          label: "科目番号",
          key: "courseNumber",
        },
        {
          label: "科目名",
          key: "courseName",
        },
        {
          label: "授業方法",
          key: "instructionalType",
        },
        {
          label: "単位",
          key: "credits",
        },
        {
          label: "年次",
          key: "standardRegistrationYear",
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
          key: "courseOverview",
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
          key: "creditedAuditors",
        },
        {
          label: "申請条件",
          key: "applicationConditions",
          // display: function (row) {
          //   return row.application_conditions
          //     ? row.application_conditions.substring(0, this.substringMaxNum)
          //     : null;
          // },
        },
        {
          label: "英語（日本語）科目名",
          key: "altCourseName",
        },
        {
          label: "科目コード",
          key: "courseCode",
        },
        {
          label: "要件科目名",
          key: "courseCodeName",
        },
        {
          label: "最終更新日時",
          key: "csvUpdatedAt",
        },
      ],
      rows: [],
      apiHost: process.env.VUE_APP_SYLMS_DAIFUKU_API_HOST,
      substringMaxNum: 5,
      course_name_keyword: "",
      course_overview_keyword: "",
      searchPlaceholderMessage: "検索したい語句を入力してください。",
      course_name_filter_type: GetCourseCourseNameFilterTypeEnum.And,
      course_overview_filter_type: GetCourseCourseOverviewFilterTypeEnum.And,
      filter_type: GetCourseFilterTypeEnum.And,
      page: 1,
      limit: 20,
      searched: false,
      infiniteLoadingIdentifier: 0,
    };
  },
  methods: {
    search: async function () {
      this.searched = true;
      this.page = 1;
      this.rows = [];
      // vue-infinite-loading を初期状態に戻すために、この変数に変更を加えている
      this.infiniteLoadingIdentifier++;
    },

    getShortString: function (str: string) {
      return str ? `${str.substring(0, this.substringMaxNum)} ...` : "";
    },

    // TODO: any
    infiniteHandler: function ($state: any) {
      const offset = this.limit * (this.page - 1);

      const conf = new Configuration({
        basePath: this.apiHost,
      });
      const courseApi = new CourseApi(conf);
      courseApi
        .getCourse({
          courseName: this.course_name_keyword,
          courseOverview: this.course_overview_keyword,
          courseNameFilterType: this.course_name_filter_type,
          courseOverviewFilterType: this.course_overview_filter_type,
          limit: this.limit,
          filterType: this.filter_type,
          offset: offset,
        })
        .then((courses) => {
          this.rows.push(...courses);
          if (courses.length < this.limit) {
            $state.complete();
            return;
          }
          this.page++;
          $state.loaded();
        })
        .catch((err) => console.error(err));
    },

    decodeTerm: function (num: number) {
      const ls: string[] = [
        "春A",
        "春B",
        "春C",
        "秋A",
        "秋B",
        "秋C",
        "夏季休業中",
        "春季休業中",
        "通年",
        "春学期",
        "秋学期",
      ];
      return ls[num - 1];
    },
  },
});
</script>

<style>
.root {
  padding: 0px 15px;
}
</style>
