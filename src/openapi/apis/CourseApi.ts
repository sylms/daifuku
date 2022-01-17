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


import * as runtime from '../runtime';
import {
    Course,
    CourseFromJSON,
    CourseToJSON,
    Req,
    ReqFromJSON,
    ReqToJSON,
} from '../models';

export interface GetCourseRequest {
    req?: Req;
}

/**
 * 
 */
export class CourseApi extends runtime.BaseAPI {

    /**
     * 科目を検索します。  例えば、`course_name` に「情報」と指定した場合、科目名に「情報」を含む科目の情報を返します。 `course_name` と `course_overview` のどちらかはクエリにつける必要があります。 
     * /course
     */
    async getCourseRaw(requestParameters: GetCourseRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<Course>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/course`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ReqToJSON(requestParameters.req),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CourseFromJSON));
    }

    /**
     * 科目を検索します。  例えば、`course_name` に「情報」と指定した場合、科目名に「情報」を含む科目の情報を返します。 `course_name` と `course_overview` のどちらかはクエリにつける必要があります。 
     * /course
     */
    async getCourse(requestParameters: GetCourseRequest, initOverrides?: RequestInit): Promise<Array<Course>> {
        const response = await this.getCourseRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
