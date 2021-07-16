<template>
  <div>
    <table-lite
      :has-checkbox="true"
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
          label: "id",
          field: "id",
          isKey: true,
        },
        {
          label: "course_name",
          field: "course_name",
        },
        {
          label: "course_name",
          field: "course_name",
        },
        {
          label: "instructional_type",
          field: "instructional_type",
        },
        {
          label: "credits",
          field: "credits",
        },
        {
          label: "standard_registration_year",
          field: "standard_registration_year",
        },
        {
          label: "term",
          field: "term",
        },
        {
          label: "period",
          field: "period",
        },
        {
          label: "classroom",
          field: "classroom",
        },
        {
          label: "instructor",
          field: "instructor",
        },
        {
          label: "course_overview",
          field: "course_overview",
        },
        {
          label: "remarks",
          field: "remarks",
        },
        {
          label: "credited_auditors",
          field: "credited_auditors",
        },
        {
          label: "application_conditions",
          field: "application_conditions",
        },
        {
          label: "alt_course_name",
          field: "alt_course_name",
        },
        {
          label: "course_code",
          field: "course_code",
        },
        {
          label: "course_code_name",
          field: "course_code_name",
        },
        {
          label: "csv_updated_at",
          field: "csv_updated_at",
        },
        {
          label: "year",
          field: "year",
        },
        {
          label: "created_at",
          field: "created_at",
        },
        {
          label: "updated_at",
          field: "updated_at",
        },
      ],
      rows: [
        {
          id: 4715,
          course_number: "02AR131",
          course_name: "空間情報科学特別演習I",
          instructional_type: 2,
          credits: "3.0",
          standard_registration_year: null,
          term: null,
          period: null,
          classroom: "2C410 2B412",
          instructor: null,
          course_overview:
            "空間情報科学と関連する地理学研究で得られた新しい分析方法を題材に,その有効性や問題点を検討する.また,各自の研究に関係の深い内外の研究論文の紹介やその論評を行う.",
          remarks: "01AC291, 02AR132と同時実施。",
          credited_auditors: 0,
          application_conditions: "正規生に限る",
          alt_course_name: "Special Seminar on Spatial Information Science I",
          course_code: "02AR131",
          course_code_name: "空間情報科学特別演習I",
          csv_updated_at: "2016-09-30T00:00:00+09:00",
          year: 2021,
          created_at: "2021-07-14T15:49:00.9092+09:00",
          updated_at: "2021-07-14T15:49:00.9092+09:00",
        },
        {
          id: 4716,
          course_number: "02AR132",
          course_name: "空間情報科学特別演習II",
          instructional_type: 2,
          credits: "3.0",
          standard_registration_year: null,
          term: null,
          period: null,
          classroom: "2C410 2B412",
          instructor: null,
          course_overview:
            "空間情報科学と関連する地理学研究で得られた新しい分析方法を題材に,その有効性や問題点を検討する.また,各自の研究に関係の深い内外の研究論文の紹介やその論評を行う.",
          remarks: "01AC291, 02AR131と同時実施。",
          credited_auditors: 0,
          application_conditions: "正規生に限る",
          alt_course_name: "Special Seminar on Spatial Information Science II",
          course_code: "02AR132",
          course_code_name: "空間情報科学特別演習II",
          csv_updated_at: "2016-09-30T00:00:00+09:00",
          year: 2021,
          created_at: "2021-07-14T15:49:00.9092+09:00",
          updated_at: "2021-07-14T15:49:00.9092+09:00",
        },
        {
          id: 18019,
          course_number: "GB13332",
          course_name: "情報科学特別演習",
          instructional_type: 2,
          credits: "2.0",
          standard_registration_year: null,
          term: null,
          period: null,
          classroom: null,
          instructor: null,
          course_overview:
            "受講生は自身が取り組みたいテーマをアドバイザ教員と相談の上で設定し、演習を行う。グループでの履修が可能。発案力、実現力、表現力を養うことを目的とする。",
          remarks:
            "情報科学類生に限る。 オンライン(オンデマンド型) オンライン(同時双方向型) 対面",
          credited_auditors: 0,
          application_conditions:
            "施設設備の許容量上の制約と学類生に対する良質の少人数教育を行うため",
          alt_course_name:
            "Introductory Special Exercise in Information Science",
          course_code: "GB13332",
          course_code_name: "情報科学特別演習",
          csv_updated_at: "2021-02-19T01:10:10+09:00",
          year: 2021,
          created_at: "2021-07-14T15:49:00.9092+09:00",
          updated_at: "2021-07-14T15:49:00.9092+09:00",
        },
      ],
    };
  },
};
</script>
