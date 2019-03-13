/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as extend from 'extend';
import { RequestResponse } from 'request';
import { BaseService } from '../lib/base_service';
import { getDefaultHeaders } from '../lib/common';
import { getMissingParams } from '../lib/helper';

/**
 * REST API used to configure Cloud Object Storage buckets.  This version of the API only supports reading bucket metadata and setting IP access controls.
 */

class ResourceConfigurationV1 extends BaseService {

  static URL: string = 'https://config.cloud-object-storage.cloud.ibm.com/v1';
  name: string; // set by prototype to ''
  serviceVersion: string; // set by prototype to 'v1'

  /**
   * Construct a ResourceConfigurationV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/v1'). The base url may differ between Bluemix regions.
   * @param {string} [options.iam_access_token] - An IAM access token fully managed by the application. Responsibility falls on the application to refresh the token, either before it expires or reactively upon receiving a 401 from the service, as any requests made with an expired token will fail.
   * @param {string} [options.iam_apikey] - An API key that can be used to request IAM tokens. If this API key is provided, the SDK will manage the token and handle the refreshing.
   * @param {string} [options.iam_url] - An optional URL for the IAM service API. Defaults to 'https://iam.bluemix.net/identity/token'.
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {ResourceConfigurationV1}
   */
  constructor(options: ResourceConfigurationV1.Options) {
    super(options);
  }

  /*************************
   * buckets
   ************************/

  /**
   * Returns metadata for the specified bucket.
   *
   * Returns metadata for the specified bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucket - Name of a bucket.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getBucketConfig(params: ResourceConfigurationV1.GetBucketConfigParams, callback?: ResourceConfigurationV1.Callback<ResourceConfigurationV1.Bucket>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['bucket'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'bucket': _params.bucket
    };

    const defaultHeaders = getDefaultHeaders('', 'v1', 'getBucketConfig');

    const parameters = {
      options: {
        url: '/b/{bucket}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, defaultHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Make changes to a bucket's configuration.
   *
   * Updates a bucket using [JSON Merge Patch](https://tools.ietf.org/html/rfc7396). This request is used to add
   * functionality (like an IP access filter) or to update existing parameters.  **Primitives are overwritten and
   * replaced in their entirety. It is not possible to append a new (or to delete a specific) value to an array.**
   * Arrays can be cleared by updating the parameter with an empty array `[]`. Only updates specified mutable fields.
   * Please don't use `PATCH` trying to update the number of objects in a bucket, any timestamps, or other non-mutable
   * fields.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucket - Name of a bucket.
   * @param {Firewall} [params.firewall] - A filter that controls access based on the network where request originated.
   * Requests not originating from IP addresses listed in the `allowed_ip` field will be denied.  Viewing or updating
   * the `Firewall` element requires the requester to have the `manager` role.
   * @param {string} [params.if_match] - An Etag previously returned in a header when fetching or updating a bucket's
   * metadata. If this value does not match the active Etag, the request will fail.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateBucketConfig(params: ResourceConfigurationV1.UpdateBucketConfigParams, callback?: ResourceConfigurationV1.Callback<ResourceConfigurationV1.Bucket>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['bucket'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'firewall': _params.firewall
    };

    const path = {
      'bucket': _params.bucket
    };

    const defaultHeaders = getDefaultHeaders('', 'v1', 'updateBucketConfig');

    const parameters = {
      options: {
        url: '/b/{bucket}',
        method: 'PATCH',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, defaultHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'if-match': _params.if_match
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

}

ResourceConfigurationV1.prototype.name = '';
ResourceConfigurationV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace ResourceConfigurationV1 {

  /** Options for the `ResourceConfigurationV1` constructor. */
  export type Options = {
    url?: string;
    iam_access_token?: string;
    iam_apikey?: string;
    iam_url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, body?: T, response?: RequestResponse) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getBucketConfig` operation. */
  export interface GetBucketConfigParams {
    /** Name of a bucket. */
    bucket: string;
    headers?: Object;
  }

  /** Parameters for the `updateBucketConfig` operation. */
  export interface UpdateBucketConfigParams {
    /** Name of a bucket. */
    bucket: string;
    /** A filter that controls access based on the network where request originated. Requests not originating from IP addresses listed in the `allowed_ip` field will be denied.  Viewing or updating the `Firewall` element requires the requester to have the `manager` role. */
    firewall?: Firewall;
    /** An Etag previously returned in a header when fetching or updating a bucket's metadata. If this value does not match the active Etag, the request will fail. */
    if_match?: string;
    headers?: Object;
  }

  /*************************
   * model interfaces
   ************************/

  /** A bucket. */
  export interface Bucket {
    /** The name of the bucket. Non-mutable. */
    name?: string;
    /** The service instance that holds the bucket. Non-mutable. */
    crn?: string;
    /** The service instance that holds the bucket. Non-mutable. */
    service_instance_id?: string;
    /** The service instance that holds the bucket. Non-mutable. */
    service_instance_crn?: string;
    /** The creation time of the bucket in RFC 3339 format. Non-mutable. */
    time_created?: string;
    /** The modification time of the bucket in RFC 3339 format. Non-mutable. */
    time_updated?: string;
    /** Total number of objects in the bucket. Non-mutable. */
    object_count?: number;
    /** Total size of all objects in the bucket. Non-mutable. */
    bytes_used?: number;
    /** A filter that controls access based on the network where request originated. Requests not originating from IP addresses listed in the `allowed_ip` field will be denied.  Viewing or updating the `Firewall` element requires the requester to have the `manager` role. */
    firewall?: Firewall;
  }

  /** A filter that controls access based on the network where request originated. Requests not originating from IP addresses listed in the `allowed_ip` field will be denied.  Viewing or updating the `Firewall` element requires the requester to have the `manager` role. */
  export interface Firewall {
    /** List of IPv4 or IPv6 addresses in CIDR notation to be affected by firewall in CIDR notation is supported. Passing an empty array will lift the IP address filter.  The `allowed_ip` array can contain a maximum of 1000 items. */
    allowed_ip?: string[];
  }

}

export = ResourceConfigurationV1;
