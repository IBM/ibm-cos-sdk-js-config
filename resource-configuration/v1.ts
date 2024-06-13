/**
 * (C) Copyright IBM Corp. 2024.
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
 * IBM OpenAPI SDK Code Generator Version: 3.91.0-d9755c53-20240605-153412
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'getBucketConfig');

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
   * @param {ActivityTracking} [params.activityTracking] - Enables sending log data to IBM Cloud Activity Tracker Event
   * Routing to provide visibility into bucket management, object read and write events. (Recommended) When the
   * `activity_tracker_crn` is not populated, then enabled events are sent to the Activity Tracker Event Routing
   * instance at the container's location unless otherwise specified in the Activity Tracker Event Routing Event Routing
   * service configuration. (Legacy) When the `activity_tracker_crn` is populated, then enabled events are sent to the
   * Activity Tracker Event Routing instance specified.
   * @param {MetricsMonitoring} [params.metricsMonitoring] - Enables sending metrics to IBM Cloud Monitoring.  All
   * metrics are opt-in. (Recommended) When the `metrics_monitoring_crn` is not populated, then enabled metrics are sent
   * to the Monitoring instance at the container's location unless otherwise specified in the Metrics Router service
   * configuration. (Legacy) When the `metrics_monitoring_crn` is populated, then enabled metrics are sent to the
   * Monitoring instance defined in the `metrics_monitoring_crn` field.
   * @param {number} [params.hardQuota] - Maximum bytes for this bucket.
   * @param {ProtectionManagement} [params.protectionManagement] - Data structure holding protection management
   * operations.
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
    const _validParams = ['bucket', 'firewall', 'activityTracking', 'metricsMonitoring', 'hardQuota', 'protectionManagement', 'ifMatch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'firewall': _params.firewall,
      'activity_tracking': _params.activityTracking,
      'metrics_monitoring': _params.metricsMonitoring,
      'hard_quota': _params.hardQuota,
      'protection_management': _params.protectionManagement,
    };

    const path = {
      'bucket': _params.bucket,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'updateBucketConfig');

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
            'If-Match': _params.ifMatch,
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
    /** Enables sending log data to IBM Cloud Activity Tracker Event Routing to provide visibility into bucket
     *  management, object read and write events. (Recommended) When the `activity_tracker_crn` is not populated, then
     *  enabled events are sent to the Activity Tracker Event Routing instance at the container's location unless
     *  otherwise specified in the Activity Tracker Event Routing Event Routing service configuration. (Legacy) When the
     *  `activity_tracker_crn` is populated, then enabled events are sent to the Activity Tracker Event Routing instance
     *  specified.
     */
    activityTracking?: ActivityTracking;
    /** Enables sending metrics to IBM Cloud Monitoring.  All metrics are opt-in. (Recommended) When the
     *  `metrics_monitoring_crn` is not populated, then enabled metrics are sent to the Monitoring instance at the
     *  container's location unless otherwise specified in the Metrics Router service configuration. (Legacy) When the
     *  `metrics_monitoring_crn` is populated, then enabled metrics are sent to the Monitoring instance defined in the
     *  `metrics_monitoring_crn` field.
     */
    metricsMonitoring?: MetricsMonitoring;
    /** Maximum bytes for this bucket. */
    hardQuota?: number;
    /** Data structure holding protection management operations. */
    protectionManagement?: ProtectionManagement;
    /** An Etag previously returned in a header when fetching or updating a bucket's metadata. If this value does
     *  not match the active Etag, the request will fail.
     */
    ifMatch?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Enables sending log data to IBM Cloud Activity Tracker Event Routing to provide visibility into bucket management, object read and write events. (Recommended) When the `activity_tracker_crn` is not populated, then enabled events are sent to the Activity Tracker Event Routing instance at the container's location unless otherwise specified in the Activity Tracker Event Routing Event Routing service configuration. (Legacy) When the `activity_tracker_crn` is populated, then enabled events are sent to the Activity Tracker Event Routing instance specified. */
  export interface ActivityTracking {
    /** If set to `true`, all object read events (i.e. downloads) will be sent to Activity Tracker Event Routing. */
    read_data_events?: boolean;
    /** If set to `true`, all object write events (i.e. uploads) will be sent to Activity Tracker Event Routing. */
    write_data_events?: boolean;
    /** When the `activity_tracker_crn` is not populated, then enabled events are sent to the Activity Tracker Event
     *  Routing instance associated to the container's location unless otherwise specified in the Activity Tracker Event
     *  Routing Event Routing service configuration. If `activity_tracker_crn` is populated, then enabled events are
     *  sent to the Activity Tracker Event Routing instance specified and bucket management events are always enabled.
     */
    activity_tracker_crn?: string;
    /** This field only applies if `activity_tracker_crn` is not populated. If set to `true`, all bucket management
     *  events will be sent to Activity Tracker Event Routing.
     */
    management_events?: boolean;
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
    /** Enables sending log data to IBM Cloud Activity Tracker Event Routing to provide visibility into bucket
     *  management, object read and write events. (Recommended) When the `activity_tracker_crn` is not populated, then
     *  enabled events are sent to the Activity Tracker Event Routing instance at the container's location unless
     *  otherwise specified in the Activity Tracker Event Routing Event Routing service configuration. (Legacy) When the
     *  `activity_tracker_crn` is populated, then enabled events are sent to the Activity Tracker Event Routing instance
     *  specified.
     */
    activity_tracking?: ActivityTracking;
    /** Enables sending metrics to IBM Cloud Monitoring.  All metrics are opt-in. (Recommended) When the
     *  `metrics_monitoring_crn` is not populated, then enabled metrics are sent to the Monitoring instance at the
     *  container's location unless otherwise specified in the Metrics Router service configuration. (Legacy) When the
     *  `metrics_monitoring_crn` is populated, then enabled metrics are sent to the Monitoring instance defined in the
     *  `metrics_monitoring_crn` field.
     */
    metrics_monitoring?: MetricsMonitoring;
    /** Maximum bytes for this bucket. */
    hard_quota?: number;
    /** Data structure holding protection management response. */
    protection_management?: ProtectionManagementResponse;
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
    allowed_network_type?: Firewall.Constants.AllowedNetworkType[] | string[];
  }
  export namespace Firewall {
    export namespace Constants {
      /** Indicates which network types are allowed for bucket access. May contain `public`, `private`, and/or `direct` elements. Setting `allowed_network_type` to only `private` will prevent access to object storage from outside of the IBM Cloud.  The entire array will be overwritten in a `PATCH` operation. For more information on network types, [see the documentation](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-endpoints#advanced-endpoint-types). */
      export enum AllowedNetworkType {
        PUBLIC = 'public',
        PRIVATE = 'private',
        DIRECT = 'direct',
      }
    }
  }

  /** Enables sending metrics to IBM Cloud Monitoring.  All metrics are opt-in. (Recommended) When the `metrics_monitoring_crn` is not populated, then enabled metrics are sent to the Monitoring instance at the container's location unless otherwise specified in the Metrics Router service configuration. (Legacy) When the `metrics_monitoring_crn` is populated, then enabled metrics are sent to the Monitoring instance defined in the `metrics_monitoring_crn` field. */
  export interface MetricsMonitoring {
    /** If set to `true`, all usage metrics (i.e. `bytes_used`) will be sent to the monitoring service. */
    usage_metrics_enabled?: boolean;
    /** If set to `true`, all request metrics (i.e. `rest.object.head`) will be sent to the monitoring service. */
    request_metrics_enabled?: boolean;
    /** When the `metrics_monitoring_crn` is not populated, then enabled metrics are sent to the monitoring instance
     *  associated to the container's location unless otherwise specified in the Metrics Router service configuration.
     *  If `metrics_monitoring_crn` is populated, then enabled events are sent to the Metrics Monitoring instance
     *  specified.
     */
    metrics_monitoring_crn?: string;
  }

  /** Data structure holding protection management operations. */
  export interface ProtectionManagement {
    /** If set to `activate`, protection management action on the bucket is being activated. */
    requested_state?: ProtectionManagement.Constants.RequestedState | string;
    /** This field is required when using requested_state\:`activate` and holds a JWT that is provided by the Cloud
     *  Operator. This should be the encoded JWT.
     */
    protection_management_token?: string;
  }
  export namespace ProtectionManagement {
    export namespace Constants {
      /** If set to `activate`, protection management action on the bucket is being activated. */
      export enum RequestedState {
        ACTIVATE = 'activate',
        DEACTIVATE = 'deactivate',
      }
    }
  }

  /** Data structure holding protection management response. */
  export interface ProtectionManagementResponse {
    /** Indicates the X number of protection management tokens that have been applied to the bucket in its lifetime. */
    token_applied_counter?: string;
    /** The 'protection management token list' holding a recent list of applied tokens. This list may contain a
     *  subset of all tokens applied to the bucket, as indicated by the counter.
     */
    token_entries?: ProtectionManagementResponseTokenEntry[];
  }

  /** Data structure holding protection management token. */
  export interface ProtectionManagementResponseTokenEntry {
    token_id?: string;
    token_expiration_time?: string;
    token_reference_id?: string;
    applied_time?: string;
    invalidated_time?: string;
    expiration_time?: string;
    shorten_retention_flag?: boolean;
  }
}

export = ResourceConfigurationV1;
