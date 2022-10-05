/**
 * (C) Copyright IBM Corp. 2022.
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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.57.1-4c556507-20220928-143422
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * REST API used to configure Cloud Object Storage buckets.
 *
 * API Version: 1.0.0
 */

class ResourceConfigurationV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://config.cloud-object-storage.cloud.ibm.com/v1';

  static DEFAULT_SERVICE_NAME: string = 'resource_configuration';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ResourceConfigurationV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ResourceConfigurationV1}
   */

  public static newInstance(options: UserOptions): ResourceConfigurationV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ResourceConfigurationV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a ResourceConfigurationV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ResourceConfigurationV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(ResourceConfigurationV1.DEFAULT_SERVICE_URL);
    }
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
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.Bucket>>}
   */
  public getBucketConfig(
    params: ResourceConfigurationV1.GetBucketConfigParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.Bucket>> {
    const _params = { ...params };
    const _requiredParams = ['bucket'];
    const _validParams = ['bucket', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket': _params.bucket,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceConfigurationV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getBucketConfig'
    );

    const parameters = {
      options: {
        url: '/b/{bucket}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Make changes to a bucket's configuration.
   *
   * Updates a bucket using [JSON Merge Patch](https://tools.ietf.org/html/rfc7396). This request is used to add
   * functionality (like an IP access filter) or to update existing parameters.  **Primitives are overwritten and
   * replaced in their entirety. It is not possible to append a new (or to delete a specific) value to an array.**
   * Arrays can be cleared by updating the parameter with an empty array `[]`. A `PATCH` operation only updates
   * specified mutable fields. Please don't use `PATCH` trying to update the number of objects in a bucket, any
   * timestamps, or other non-mutable fields.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucket - Name of a bucket.
   * @param {Firewall} [params.firewall] - An access control mechanism based on the network (IP address) where request
   * originated. Requests not originating from IP addresses listed in the `allowed_ip` field will be denied regardless
   * of any access policies (including public access) that might otherwise permit the request.  Viewing or updating the
   * `Firewall` element requires the requester to have the `manager` role.
   * @param {ActivityTracking} [params.activityTracking] - Enables sending log data to IBM Cloud Activity Tracker to
   * provide visibility into object read and write events. All object events are sent to the activity tracker instance
   * defined in the `activity_tracker_crn` field.
   * @param {MetricsMonitoring} [params.metricsMonitoring] - Enables sending metrics to IBM Cloud Monitoring. All
   * metrics are sent to the IBM Cloud Monitoring instance defined in the `monitoring_crn` field.
   * @param {number} [params.hardQuota] - Maximum bytes for this bucket.
   * @param {string} [params.ifMatch] - An Etag previously returned in a header when fetching or updating a bucket's
   * metadata. If this value does not match the active Etag, the request will fail.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.EmptyObject>>}
   */
  public updateBucketConfig(
    params: ResourceConfigurationV1.UpdateBucketConfigParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['bucket'];
    const _validParams = ['bucket', 'firewall', 'activityTracking', 'metricsMonitoring', 'hardQuota', 'ifMatch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'firewall': _params.firewall,
      'activity_tracking': _params.activityTracking,
      'metrics_monitoring': _params.metricsMonitoring,
      'hard_quota': _params.hardQuota,
    };

    const path = {
      'bucket': _params.bucket,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceConfigurationV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateBucketConfig'
    );

    const parameters = {
      options: {
        url: '/b/{bucket}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/merge-patch+json',
            'if-match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace ResourceConfigurationV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getBucketConfig` operation. */
  export interface GetBucketConfigParams {
    /** Name of a bucket. */
    bucket: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateBucketConfig` operation. */
  export interface UpdateBucketConfigParams {
    /** Name of a bucket. */
    bucket: string;
    /** An access control mechanism based on the network (IP address) where request originated. Requests not
     *  originating from IP addresses listed in the `allowed_ip` field will be denied regardless of any access policies
     *  (including public access) that might otherwise permit the request.  Viewing or updating the `Firewall` element
     *  requires the requester to have the `manager` role.
     */
    firewall?: Firewall;
    /** Enables sending log data to IBM Cloud Activity Tracker to provide visibility into object read and write
     *  events. All object events are sent to the activity tracker instance defined in the `activity_tracker_crn` field.
     */
    activityTracking?: ActivityTracking;
    /** Enables sending metrics to IBM Cloud Monitoring. All metrics are sent to the IBM Cloud Monitoring instance
     *  defined in the `monitoring_crn` field.
     */
    metricsMonitoring?: MetricsMonitoring;
    /** Maximum bytes for this bucket. */
    hardQuota?: number;
    /** An Etag previously returned in a header when fetching or updating a bucket's metadata. If this value does
     *  not match the active Etag, the request will fail.
     */
    ifMatch?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Enables sending log data to IBM Cloud Activity Tracker to provide visibility into object read and write events. All object events are sent to the activity tracker instance defined in the `activity_tracker_crn` field. */
  export interface ActivityTracking {
    /** If set to `true`, all object read events (i.e. downloads) will be sent to Activity Tracker. */
    read_data_events?: boolean;
    /** If set to `true`, all object write events (i.e. uploads) will be sent to Activity Tracker. */
    write_data_events?: boolean;
    /** Required the first time `activity_tracking` is configured. The instance of Activity Tracker that will
     *  receive object event data. The format is "crn:v1:bluemix:public:logdnaat:{bucket location}:a/{storage
     *  account}:{activity tracker service instance}::".
     */
    activity_tracker_crn?: string;
  }

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
    /** Number of non-current object versions in the bucket. Non-mutable. */
    noncurrent_object_count?: number;
    /** Total size of all non-current object versions in the bucket. Non-mutable. */
    noncurrent_bytes_used?: number;
    /** Total number of delete markers in the bucket. Non-mutable. */
    delete_marker_count?: number;
    /** An access control mechanism based on the network (IP address) where request originated. Requests not
     *  originating from IP addresses listed in the `allowed_ip` field will be denied regardless of any access policies
     *  (including public access) that might otherwise permit the request.  Viewing or updating the `Firewall` element
     *  requires the requester to have the `manager` role.
     */
    firewall?: Firewall;
    /** Enables sending log data to IBM Cloud Activity Tracker to provide visibility into object read and write
     *  events. All object events are sent to the activity tracker instance defined in the `activity_tracker_crn` field.
     */
    activity_tracking?: ActivityTracking;
    /** Enables sending metrics to IBM Cloud Monitoring. All metrics are sent to the IBM Cloud Monitoring instance
     *  defined in the `monitoring_crn` field.
     */
    metrics_monitoring?: MetricsMonitoring;
    /** Maximum bytes for this bucket. */
    hard_quota?: number;
  }

  /** An access control mechanism based on the network (IP address) where request originated. Requests not originating from IP addresses listed in the `allowed_ip` field will be denied regardless of any access policies (including public access) that might otherwise permit the request.  Viewing or updating the `Firewall` element requires the requester to have the `manager` role. */
  export interface Firewall {
    /** List of IPv4 or IPv6 addresses in CIDR notation to be affected by firewall in CIDR notation is supported.
     *  Passing an empty array will lift the IP address filter.  The `allowed_ip` array can contain a maximum of 1000
     *  items.
     */
    allowed_ip?: string[];
    /** List of IPv4 or IPv6 addresses in CIDR notation to be affected by firewall in CIDR notation is supported.
     *  Passing an empty array will lift the IP address filter.  The `denied_ip` array can contain a maximum of 1000
     *  items.
     */
    denied_ip?: string[];
    /** Indicates which network types are allowed for bucket access. May contain `public`, `private`, and/or
     *  `direct` elements. Setting `allowed_network_type` to only `private` will prevent access to object storage from
     *  outside of the IBM Cloud.  The entire array will be overwritten in a `PATCH` operation. For more information on
     *  network types, [see the
     *  documentation](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-endpoints#advanced-endpoint-types).
     */
    allowed_network_type?: string[];
  }

  /** Enables sending metrics to IBM Cloud Monitoring. All metrics are sent to the IBM Cloud Monitoring instance defined in the `monitoring_crn` field. */
  export interface MetricsMonitoring {
    /** If set to `true`, all usage metrics (i.e. `bytes_used`) will be sent to the monitoring service. */
    usage_metrics_enabled?: boolean;
    /** If set to `true`, all request metrics (i.e. `rest.object.head`) will be sent to the monitoring service. */
    request_metrics_enabled?: boolean;
    /** Required the first time `metrics_monitoring` is configured. The instance of IBM Cloud Monitoring that will
     *  receive the bucket metrics. The format is "crn:v1:bluemix:public:logdnaat:{bucket location}:a/{storage
     *  account}:{monitoring service instance}::".
     */
    metrics_monitoring_crn?: string;
  }
}

export = ResourceConfigurationV1;
