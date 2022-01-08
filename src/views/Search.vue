<template>
  <div class="root">
    <h1>sylms Explorer</h1>
    <router-link to="/about">sylms Explorer とは</router-link>
    <div class="freeWordForm">
      <b-container fluid>
        <b-row>
          <b-col sm="3">
            <label for="courseNameNumber">科目番号</label>
          </b-col>
          <b-col sm="2"> </b-col>
          <b-col sm="7">
            <b-form-input
              id="course_name_number"
              v-model="course_name_number"
              :placeholder="searchPlaceholderMessage"
              type="search"
              trim
              @keypress.enter="search"
            ></b-form-input>
          </b-col>
        </b-row>
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
                id="courseNameFilterTypeAnd"
              />
              <label for="courseNameFilterTypeAnd">AND</label>
              <input
                type="radio"
                v-model="course_name_filter_type"
                value="or"
                id="courseNameFilterTypeOr"
              />
              <label for="courseNameFilterTypeOr">OR</label>
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
                id="courseOverviewFilterTypeAnd"
              />
              <label for="courseOverviewFilterTypeAnd">AND</label>
              <input
                type="radio"
                v-model="course_overview_filter_type"
                value="or"
                id="courseOverviewFilterTypeOr"
              />
              <label for="courseOverviewFilterTypeOr">OR</label>
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
          <b-col sm="3">
            <label for="coursePeriodKeyword">曜/時限</label>
          </b-col>
          <b-col sm="2"> </b-col>
          <b-col sm="7">
            <b-form-input
              id="period"
              v-model="period"
              :placeholder="searchPlaceholderMessage"
              type="search"
              trim
              @keypress.enter="search"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label for="courseTermKeyword">開講時期</label>
          </b-col>
          <b-col sm="2"> </b-col>
          <b-col sm="7">
            <b-form-input
              id="term"
              v-model="term"
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
              <input
                type="radio"
                v-model="filter_type"
                value="and"
                id="filterTypeAllAND"
              />
              <label for="filterTypeAllAND">AND</label>
              <input
                type="radio"
                v-model="filter_type"
                value="or"
                id="filterTypeAllOr"
              />
              <label for="filterTypeAllOr">OR</label>
            </div>
          </b-col>
          <b-col>
            <button v-on:click="search">検索</button>
          </b-col>
          <b-col>
            <button v-on:click="download">ダウンロード</button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="facetAndList">
      <b-container fluid>
        <b-row>
          <b-col sm="2">
            <label>開講時期</label>
            <template v-for="(val, key) in this.facet['termFacet']">
              <b-button
                class="btn-block"
                variant="outline-primary"
                v-if="val"
                :key="key"
                v-on:click="facetSearch(key.replace('_', ''))"
                >{{
                  decodeTerm(key.replace("_", "")) + "(" + val + ")"
                }}</b-button
              >
              <b-button
                class="btn-block"
                variant="outline-primary"
                v-if="!val"
                :key="key"
                v-on:click="facetSearch(key.replace('_', ''))"
                >{{
                  decodeTerm(key.replace("_", "")) + "(" + 0 + ")"
                }}</b-button
              >
            </template>
          </b-col>
          <b-col sm="10">
            <b-table
              striped
              :items="rows"
              :fields="fields"
              stacked="sm"
              thead-class="fixed-table-header"
            >
              <template #cell(searchOnTwitter)="data">
                <a
                  :href="`https://twitter.com/search?q=%22${removeAlphanumeric(
                    data.item.courseName
                  )}%22%20AND%20(%22ITF%22%20OR%20%22筑波%22%20OR%20%22${
                    data.item.courseNumber
                  }%22%20OR%20%22tsukuba%22%20OR%20%22tkb%22%20OR%20%22つくば%22)&src=typed_query&f=live`"
                  target="_blank"
                  rel="noopener"
                  >検索(Twitter)</a
                ><br />

                <a
                  :href="`https://twitter.com/intent/tweet?hashtags=${data.item.courseName}%20%23${data.item.courseNumber}`"
                  class="twitter-hashtag-button"
                  data-show-count="false"
                  target="_blank"
                  rel="noopener"
                  >Tweet</a
                >
              </template>

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

              <template #cell(instructionalType)="data">
                <span>
                  {{ decodeInstructionalType(data.value) }}
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

              <template #cell(archiveLink)="data">
                <a
                  :href="`/archive/#query=https://kdb.tsukuba.ac.jp/syllabi/${data.item.year}/${data.item.courseNumber}/&view=resources&urlSearchType=prefix`"
                  target="_blank"
                  rel="noopener"
                  ><font-awesome-icon icon="external-link-alt"
                /></a>
              </template>
            </b-table>
            <b-alert v-if="searchQueryErrorMessage" variant="danger" show>{{
              searchQueryErrorMessage
            }}</b-alert>
            <infinite-loading
              v-if="searched"
              @infinite="infiniteHandler"
              :identifier="infiniteLoadingIdentifier"
            >
              <div slot="no-more">検索結果はこれ以上ありません</div>
              <div slot="no-results">検索条件にヒットする科目はありません</div>
            </infinite-loading>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Configuration,
  Course,
  Facet,
  ReqCourseNameFilterTypeEnum,
  ReqCourseOverviewFilterTypeEnum,
  ReqFilterTypeEnum,
  CourseApi,
  FacetApi,
  CsvApi,
  //   GetCsvRequest,
} from "@/openapi";
import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";

library.add(faExternalLinkAlt);

export default Vue.extend({
  name: "search",
  components: {
    InfiniteLoading,
    FontAwesomeIcon,
  },
  metaInfo: {
    title: "sylms Explorer",
  },
  data(): {
    fields: {
      label: string;
      key: string;
    }[];
    rows: Course[];
    facet: Facet;
    periodTable: { [key: string]: boolean };
    apiHost: string;
    substringMaxNum: number;
    searchPlaceholderMessage: string;
    course_name_number: string;
    course_name_keyword: string;
    credits: string;
    standardRegistrationYear: number;
    term: string;
    period: string;
    classroom: string;
    instructor: string;
    course_overview_keyword: string;
    remarks: string;
    course_name_filter_type: ReqCourseNameFilterTypeEnum;
    course_overview_filter_type: ReqCourseOverviewFilterTypeEnum;
    filter_type: ReqFilterTypeEnum;
    page: number;
    limit: number;
    searched: boolean;
    searchQueryErrorMessage: string;
    infiniteLoadingIdentifier: number;
  } {
    return {
      fields: [
        {
          label: "Twitter で検索",
          key: "searchOnTwitter",
        },
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
        },
        {
          label: "備考",
          key: "remarks",
        },
        {
          label: "アーカイブ",
          key: "archiveLink",
        },
      ],
      rows: [],
      facet: {},
      periodTable: {},
      apiHost: process.env.VUE_APP_SYLMS_DAIFUKU_API_HOST,
      substringMaxNum: 5,
      course_name_number: "",
      course_name_keyword: "",
      credits: "",
      standardRegistrationYear: -1,
      term: "",
      period: "",
      classroom: "",
      instructor: "",
      course_overview_keyword: "",
      remarks: "",
      searchPlaceholderMessage: "検索したい語句を入力してください。",
      course_name_filter_type: ReqCourseNameFilterTypeEnum.And,
      course_overview_filter_type: ReqCourseOverviewFilterTypeEnum.And,
      filter_type: ReqFilterTypeEnum.And,
      page: 1,
      limit: 20,
      searched: false,
      searchQueryErrorMessage: "",
      infiniteLoadingIdentifier: 0,
    };
  },
  mounted: function () {
    this.search();
  },
  methods: {
    search: async function () {
      this.searched = !"";
      this.page = 1;
      this.rows = [];
      this.facet = {};
      this.periodTable = {};
      // vue-infinite-loading を初期状態に戻すために、この変数に変更を加えている
      this.infiniteLoadingIdentifier++;

      const conf = new Configuration({
        basePath: this.apiHost,
      });
      const facetApi = new FacetApi(conf);
      facetApi
        .getFacet({
          req: {
            courseNumber: this.course_name_number,
            courseName: this.course_name_keyword,
            term: this.term,
            period: this.period,
            courseOverview: this.course_overview_keyword,
            courseNameFilterType: this.course_name_filter_type,
            courseOverviewFilterType: this.course_overview_filter_type,
            filterType: this.filter_type,
            limit: 0,
            offset: 0,
          },
        })
        .then((res) => {
          this.facet = res;
        })
        .catch((err) => console.error(err));
    },
    download: async function () {
      this.searched = !"";
      this.page = 1;
      this.rows = [];
      this.facet = {};
      this.periodTable = {};
      // vue-infinite-loading を初期状態に戻すために、この変数に変更を加えている
      this.infiniteLoadingIdentifier++;

      const conf = new Configuration({
        basePath: this.apiHost,
      });
      const csvApi = new CsvApi(conf);
      csvApi
        .getCsv({
          req: {
            courseNumber: this.course_name_number,
            courseName: this.course_name_keyword,
            term: this.term,
            period: this.period,
            courseOverview: this.course_overview_keyword,
            courseNameFilterType: this.course_name_filter_type,
            courseOverviewFilterType: this.course_overview_filter_type,
            filterType: this.filter_type,
            limit: 10,
            offset: 0,
          },
        })
        .then((res) => {
          //   this.facet = res;
          const fileName = "sample.csv";
          let blob = new Blob([res], {
            type: "text/csv",
          });
          saveAs(blob, fileName);
        })
        .catch((err) => console.error(err));
    },

    facetSearch: function (message: number) {
      const term = this.decodeTerm(message);
      this.term += term;
      this.search();
    },

    getShortString: function (str: string) {
      return str ? `${str.substring(0, this.substringMaxNum)} ...` : "";
    },

    removeAlphanumeric: function (str: string) {
      return str.replace(/^[0-9a-zA-Z-]*/g, "").replace(/[0-9a-zA-Z-]*$/g, "");
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
          req: {
            courseNumber: this.course_name_number,
            courseName: this.course_name_keyword,
            term: this.term,
            period: this.period,
            courseOverview: this.course_overview_keyword,
            courseNameFilterType: this.course_name_filter_type,
            courseOverviewFilterType: this.course_overview_filter_type,
            filterType: this.filter_type,
            limit: this.limit,
            offset: offset,
          },
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

    decodeInstructionalType: function (num: number) {
      const ls: string[] = [
        "講義",
        "演習",
        "実習/実験/実技",
        "講義/演習",
        "講義/実習/実験/実技",
        "演習/実習/実験/実技",
        "講義/演習/実習/実験/実技",
        "卒業論文/卒業研究",
        "その他",
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

.fixed-table-header {
  position: sticky;
  /* for Safari */
  position: -webkit-sticky;

  top: 0;

  border-style: hidden;
}

@supports (backdrop-filter: blur(12px)) {
  .fixed-table-header {
    backdrop-filter: blur(12px);
  }
}

@supports not (backdrop-filter: blur(12px)) {
  .fixed-table-header {
    background-color: lightgray;
  }
}
</style>
