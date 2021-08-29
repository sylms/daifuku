/* tslint:disable */
/* eslint-disable */
/**
 * azuki-api
 * github.com/sylms/azuki api document
 *
 * The version of the OpenAPI document: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Course
 */
export interface Course {
    /**
     * 通し番号である。
     * @type {number}
     * @memberof Course
     */
    id?: number;
    /**
     * 科目番号である。
     * @type {string}
     * @memberof Course
     */
    courseNumber?: string;
    /**
     * 科目名である。
     * @type {string}
     * @memberof Course
     */
    courseName?: string;
    /**
     * 授業方法である。値は https://www.tsukuba.ac.jp/education/ug-courses-openclass/2021/pdf/1.pdf#page=2 を参照すること。
     * @type {number}
     * @memberof Course
     */
    instructionalType?: number;
    /**
     * 単位数である。KdB のデータをそのまま保持しており「-」が含まれることがある。
     * @type {string}
     * @memberof Course
     */
    credits?: string;
    /**
     * 標準履修年次である。KdB のデータをほぼそのまま保持しており「?」が含まれることがある。
     * @type {Array<number>}
     * @memberof Course
     */
    standardRegistrationYear?: Array<number>;
    /**
     * 開講時期である。数値と具体的な時期の対応は以下の通りである。
     * 
     * 春A = 1
     * 
     * 春B = 2
     * 
     * 春C = 3
     * 
     * 秋A = 4
     * 
     * 秋B = 5
     * 
     * 秋C = 6
     * 
     * 夏季休業中 = 7
     * 
     * 春季休業中 = 8
     * 
     * 通年 = 9
     * 
     * 春学期 = 10
     * 
     * 秋学期 = 11
     * @type {Array<number>}
     * @memberof Course
     */
    term?: Array<number> | null;
    /**
     * 曜時限である。
     * @type {Array<string>}
     * @memberof Course
     */
    period?: Array<string>;
    /**
     * 教室である。
     * @type {string}
     * @memberof Course
     */
    classroom?: string | null;
    /**
     * 担当教員である。
     * @type {Array<string>}
     * @memberof Course
     */
    instructor?: Array<string>;
    /**
     * 授業概要である。
     * @type {string}
     * @memberof Course
     */
    courseOverview?: string | null;
    /**
     * 備考である。
     * @type {string}
     * @memberof Course
     */
    remarks?: string | null;
    /**
     * 科目等履修生申請可否である。対応は、「×」は 0、「△」は 1、空は 2 となっている。
     * @type {number}
     * @memberof Course
     */
    creditedAuditors?: number;
    /**
     * 申請条件である。
     * @type {string}
     * @memberof Course
     */
    applicationConditions?: string | null;
    /**
     * 英語(日本語)科目名である。
     * @type {string}
     * @memberof Course
     */
    altCourseName?: string | null;
    /**
     * 科目コードである。
     * @type {string}
     * @memberof Course
     */
    courseCode?: string | null;
    /**
     * 要件科目名である。
     * @type {string}
     * @memberof Course
     */
    courseCodeName?: string | null;
    /**
     * KdB からエクスポートした CSV ファイルに記載されている「データ更新日」である。
     * @type {string}
     * @memberof Course
     */
    csvUpdatedAt?: string;
    /**
     * 対象年度である。
     * @type {number}
     * @memberof Course
     */
    year?: number;
    /**
     * azuki が参照する DB 上のデータの作成日時である。
     * @type {string}
     * @memberof Course
     */
    createdAt?: string;
    /**
     * azuki が参照する DB 上のデータの更新日時である。
     * @type {string}
     * @memberof Course
     */
    updatedAt?: string;
}

export function CourseFromJSON(json: any): Course {
    return CourseFromJSONTyped(json, false);
}

export function CourseFromJSONTyped(json: any, ignoreDiscriminator: boolean): Course {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'courseNumber': !exists(json, 'course_number') ? undefined : json['course_number'],
        'courseName': !exists(json, 'course_name') ? undefined : json['course_name'],
        'instructionalType': !exists(json, 'instructional_type') ? undefined : json['instructional_type'],
        'credits': !exists(json, 'credits') ? undefined : json['credits'],
        'standardRegistrationYear': !exists(json, 'standard_registration_year') ? undefined : json['standard_registration_year'],
        'term': !exists(json, 'term') ? undefined : json['term'],
        'period': !exists(json, 'period') ? undefined : json['period'],
        'classroom': !exists(json, 'classroom') ? undefined : json['classroom'],
        'instructor': !exists(json, 'instructor') ? undefined : json['instructor'],
        'courseOverview': !exists(json, 'course_overview') ? undefined : json['course_overview'],
        'remarks': !exists(json, 'remarks') ? undefined : json['remarks'],
        'creditedAuditors': !exists(json, 'credited_auditors') ? undefined : json['credited_auditors'],
        'applicationConditions': !exists(json, 'application_conditions') ? undefined : json['application_conditions'],
        'altCourseName': !exists(json, 'alt_course_name') ? undefined : json['alt_course_name'],
        'courseCode': !exists(json, 'course_code') ? undefined : json['course_code'],
        'courseCodeName': !exists(json, 'course_code_name') ? undefined : json['course_code_name'],
        'csvUpdatedAt': !exists(json, 'csv_updated_at') ? undefined : json['csv_updated_at'],
        'year': !exists(json, 'year') ? undefined : json['year'],
        'createdAt': !exists(json, 'created_at') ? undefined : json['created_at'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : json['updated_at'],
    };
}

export function CourseToJSON(value?: Course | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'course_number': value.courseNumber,
        'course_name': value.courseName,
        'instructional_type': value.instructionalType,
        'credits': value.credits,
        'standard_registration_year': value.standardRegistrationYear,
        'term': value.term,
        'period': value.period,
        'classroom': value.classroom,
        'instructor': value.instructor,
        'course_overview': value.courseOverview,
        'remarks': value.remarks,
        'credited_auditors': value.creditedAuditors,
        'application_conditions': value.applicationConditions,
        'alt_course_name': value.altCourseName,
        'course_code': value.courseCode,
        'course_code_name': value.courseCodeName,
        'csv_updated_at': value.csvUpdatedAt,
        'year': value.year,
        'created_at': value.createdAt,
        'updated_at': value.updatedAt,
    };
}

