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
 * 開講時期ごとの検索結果に含まれる件数
 * @export
 * @interface FacetTermFacet
 */
export interface FacetTermFacet {
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _1?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _2?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _3?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _4?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _5?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _6?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _7?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _8?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _9?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _10?: number;
    /**
     * 
     * @type {number}
     * @memberof FacetTermFacet
     */
    _11?: number;
}

export function FacetTermFacetFromJSON(json: any): FacetTermFacet {
    return FacetTermFacetFromJSONTyped(json, false);
}

export function FacetTermFacetFromJSONTyped(json: any, ignoreDiscriminator: boolean): FacetTermFacet {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_1': !exists(json, '1') ? undefined : json['1'],
        '_2': !exists(json, '2') ? undefined : json['2'],
        '_3': !exists(json, '3') ? undefined : json['3'],
        '_4': !exists(json, '4') ? undefined : json['4'],
        '_5': !exists(json, '5') ? undefined : json['5'],
        '_6': !exists(json, '6') ? undefined : json['6'],
        '_7': !exists(json, '7') ? undefined : json['7'],
        '_8': !exists(json, '8') ? undefined : json['8'],
        '_9': !exists(json, '9') ? undefined : json['9'],
        '_10': !exists(json, '10') ? undefined : json['10'],
        '_11': !exists(json, '11') ? undefined : json['11'],
    };
}

export function FacetTermFacetToJSON(value?: FacetTermFacet | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '1': value._1,
        '2': value._2,
        '3': value._3,
        '4': value._4,
        '5': value._5,
        '6': value._6,
        '7': value._7,
        '8': value._8,
        '9': value._9,
        '10': value._10,
        '11': value._11,
    };
}

