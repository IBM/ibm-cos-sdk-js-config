/**
 * (C) Copyright IBM Corp. 2025.
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
 * IBM OpenAPI SDK Code Generator Version: 3.98.0-8be2046a-20241205-162752
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

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
   * backupPolicy
   ************************/

  /**
   * Add a new backup policy to the COS Bucket.
   *
   * Attach a new Backup Policy on a bucket.
   *
   * This request results in the creation of a single, new RecoveryRange on the destination BackupVault.
   *
   * Deletion and re-creation of a BackupPolicy to the same BackupVault destination will generate a new RecoveryRange.
   *
   * The following shall be validated. Any failure to validate shall cause a HTTP 400 to be returned.
   *
   *   * the user has `cloud-object-storage.bucket.post_backup_policy` permissions on the source-bucket
   *   * the source-bucket must have `cloud-object-storage.backup_vault.sync` permissions on the Backup Vault
   *   * the source-bucket must have versioning-on
   *   * the Backup Vault must exist and be able to be contacted by the source-bucket
   *   * the source-bucket must not have an existing BackupPolicy targeting the Backup Vault
   *   * the source-bucket must not have a BackupPolicy with the same policy_name
   *   * the source-bucket must have fewer than 3 total BackupPolicies.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucket - Name of the COS Bucket name.
   * @param {DeleteAfterDays} params.initialRetention - The number of days to retain data within a RecoveryRange.
   * @param {string} params.policyName - The name granted to the policy. Validation :
   *   * chars limited to alphanumeric, underscore, hyphen and period.
   * @param {string} params.targetBackupVaultCrn - The CRN for a COS BackupVault.
   * @param {string} params.backupType - The type of backup to support. For LA+GA this is limited to "continuous".
   * @param {string} [params.mD5] - MD5 hash of content. If provided, the hash of the request must match.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupPolicy>>}
   */
  public createBackupPolicy(
    params: ResourceConfigurationV1.CreateBackupPolicyParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupPolicy>> {
    const _params = { ...params };
    const _requiredParams = ['bucket', 'initialRetention', 'policyName', 'targetBackupVaultCrn', 'backupType'];
    const _validParams = ['bucket', 'initialRetention', 'policyName', 'targetBackupVaultCrn', 'backupType', 'mD5', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'initial_retention': _params.initialRetention,
      'policy_name': _params.policyName,
      'target_backup_vault_crn': _params.targetBackupVaultCrn,
      'backup_type': _params.backupType,
    };

    const path = {
      'bucket': _params.bucket,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'createBackupPolicy');

    const parameters = {
      options: {
        url: '/buckets/{bucket}/backup_policies',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'MD5': _params.mD5,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List BackupPolicies.
   *
   * Get all backup policies on a bucket.
   *
   * Requires that the user has `cloud-object-storage.bucket.list_backup_policies` permissions on the source bucket.
   *
   * This request generates the "cloud-object-storage.bucket-backup-policy.list" ActivityTracking event.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucket - Name of the COS Bucket name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupPolicyCollection>>}
   */
  public listBackupPolicies(
    params: ResourceConfigurationV1.ListBackupPoliciesParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupPolicyCollection>> {
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

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'listBackupPolicies');

    const parameters = {
      options: {
        url: '/buckets/{bucket}/backup_policies',
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
   * Get BackupPolicy.
   *
   * Read a specific backup policy on a bucket.
   *
   * Requires that the user has `cloud-object-storage.bucket.get_backup_policy` permissions on the bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucket - name of the bucket affected.
   * @param {string} params.policyId - uuid of the BackupPolicy.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupPolicy>>}
   */
  public getBackupPolicy(
    params: ResourceConfigurationV1.GetBackupPolicyParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupPolicy>> {
    const _params = { ...params };
    const _requiredParams = ['bucket', 'policyId'];
    const _validParams = ['bucket', 'policyId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket': _params.bucket,
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'getBackupPolicy');

    const parameters = {
      options: {
        url: '/buckets/{bucket}/backup_policies/{policy_id}',
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
   * Delete a BackupPolicy.
   *
   * Delete a specific BackupPolicy.
   *
   * Requires that the user has `cloud-object-storage.bucket.delete_backup_policy` permissions on the bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucket - name of the bucket affected.
   * @param {string} params.policyId - uuid of the BackupPolicy.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.EmptyObject>>}
   */
  public deleteBackupPolicy(
    params: ResourceConfigurationV1.DeleteBackupPolicyParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['bucket', 'policyId'];
    const _validParams = ['bucket', 'policyId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket': _params.bucket,
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteBackupPolicy');

    const parameters = {
      options: {
        url: '/buckets/{bucket}/backup_policies/{policy_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * backupVault
   ************************/

  /**
   * list BackupVaults.
   *
   * Returns a list of BackupVault CRNs owned by the account.
   *
   * Requires that the user has `cloud-object-storage.backup_vault.list_account_backup_vaults` permissions for the
   * account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.serviceInstanceId - Name of the service_instance to list BackupVaults for.
   * @param {string} [params.token] - the continuation token for controlling pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupVaultCollection>>}
   */
  public listBackupVaults(
    params: ResourceConfigurationV1.ListBackupVaultsParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupVaultCollection>> {
    const _params = { ...params };
    const _requiredParams = ['serviceInstanceId'];
    const _validParams = ['serviceInstanceId', 'token', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'service_instance_id': _params.serviceInstanceId,
      'token': _params.token,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'listBackupVaults');

    const parameters = {
      options: {
        url: '/backup_vaults',
        method: 'GET',
        qs: query,
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
   * create a BackupVault.
   *
   * Creates a BackupVault.
   *
   * Requires that the user has `cloud-object-storage.backup_vault.post_backup_vault` permissions for the account.
   *
   * Certain fields will be returned only if the user has specific permissions:
   *   - `activity_tracking` requires `cloud-object-storage.backup_vault.put_activity_tracking`
   *   - `metrics_monitoring` requires `cloud-object-storage.backup_vault.put_metrics_monitoring`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.serviceInstanceId - Name of the service_instance to list BackupVaults for.
   * @param {string} params.backupVaultName - The name given to a Bucket.
   *
   * Bucket names must be between 3 and 63 characters long must be made of lowercase letters, numbers, dots (periods),
   * and dashes (hyphens). Bucket names must begin and end with a lowercase letter or number. Bucket names canâ€t
   * contain consecutive dots or dashes. Bucket names that resemble IP addresses are not allowed.
   *
   * Bucket and BackupVault names exist in a global namespace and therefore must be unique.
   * @param {string} params.region - the region in which this backup-vault should be created within.
   * @param {BackupVaultActivityTracking} [params.activityTracking] - Activity Tracking configuration. An empty object
   * (`{}`) indicates no configuration, and no events will be sent (This is the same behavior as
   * `{"management_events":false}`). Note that read/write events cannot be enabled, and events cannot be routed to a
   * non-default Activity Tracker instance.
   * @param {BackupVaultMetricsMonitoring} [params.metricsMonitoring] - Metrics Monitoring configuration. An empty
   * object (`{}`) indicates no configuration, and no metrics will be collected (This is the same behavior as
   * `{"usage_metrics_enabled":false}`). Note that request metrics cannot be enabled, and metrics cannot be routed to a
   * non-default metrics router instance.
   * @param {string} [params.sseKpCustomerRootKeyCrn] - The CRN for a KeyProtect root key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupVault>>}
   */
  public createBackupVault(
    params: ResourceConfigurationV1.CreateBackupVaultParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupVault>> {
    const _params = { ...params };
    const _requiredParams = ['serviceInstanceId', 'backupVaultName', 'region'];
    const _validParams = ['serviceInstanceId', 'backupVaultName', 'region', 'activityTracking', 'metricsMonitoring', 'sseKpCustomerRootKeyCrn', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'backup_vault_name': _params.backupVaultName,
      'region': _params.region,
      'activity_tracking': _params.activityTracking,
      'metrics_monitoring': _params.metricsMonitoring,
      'sse_kp_customer_root_key_crn': _params.sseKpCustomerRootKeyCrn,
    };

    const query = {
      'service_instance_id': _params.serviceInstanceId,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'createBackupVault');

    const parameters = {
      options: {
        url: '/backup_vaults',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * get the config for a Backup Vault.
   *
   * Gets configuration information for a Backup Vault.
   *
   * Requires that the user has `cloud-object-storage.backup_vault.get_basic` permissions on the backup vault.
   *
   * Certain fields will be returned only if the user has specific permissions:
   *   - `activity_tracking` requires `cloud-object-storage.backup_vault.get_activity_tracking`
   *   - `metrics_monitoring` requires `cloud-object-storage.backup_vault.get_metrics_monitoring`
   *   - `sse_kp_customer_root_key_crn` requires `cloud-object-storage.backup_vault.get_crk_id`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - Name of the backup-vault to create or update.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupVault>>}
   */
  public getBackupVault(
    params: ResourceConfigurationV1.GetBackupVaultParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupVault>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName'];
    const _validParams = ['backupVaultName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'backup_vault_name': _params.backupVaultName,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'getBackupVault');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}',
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
   * Update the config on a Backup Vault.
   *
   * Update the Backup Vault config via JSON Merge Patch update semantics.
   *
   * In particular, note that providing an empty object (`{}`) to either field in the request body will remove any
   * existing configuration.
   *
   * Requires that the user have specific permissions depending on what is being changed:
   *   - `activity_tracking` requires `cloud-object-storage.backup_vault.put_activity_tracking`
   *   - `metrics_monitoring` requires `cloud-object-storage.backup_vault.put_metrics_monitoring`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - Name of the backup-vault to create or update.
   * @param {BackupVaultActivityTracking} [params.activityTracking] - Activity Tracking configuration. An empty object
   * (`{}`) indicates no configuration, and no events will be sent (This is the same behavior as
   * `{"management_events":false}`). Note that read/write events cannot be enabled, and events cannot be routed to a
   * non-default Activity Tracker instance.
   * @param {BackupVaultMetricsMonitoring} [params.metricsMonitoring] - Metrics Monitoring configuration. An empty
   * object (`{}`) indicates no configuration, and no metrics will be collected (This is the same behavior as
   * `{"usage_metrics_enabled":false}`). Note that request metrics cannot be enabled, and metrics cannot be routed to a
   * non-default metrics router instance.
   * @param {string} [params.ifMatch] - Conditionally update the Backup Vault config if and only if the ETag of the
   * existing config exactly matches the provided If-Match MD5.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupVault>>}
   */
  public updateBackupVault(
    params: ResourceConfigurationV1.UpdateBackupVaultParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.BackupVault>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName'];
    const _validParams = ['backupVaultName', 'activityTracking', 'metricsMonitoring', 'ifMatch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'activity_tracking': _params.activityTracking,
      'metrics_monitoring': _params.metricsMonitoring,
    };

    const path = {
      'backup_vault_name': _params.backupVaultName,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'updateBackupVault');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an empty Backup Vault.
   *
   * Delete the Backup Vault.
   *
   * Requires that the BackupVault not contain any RecoveryRanges.  Requires that the user has
   * `cloud-object-storage.backup_vault.delete_backup_vault` permissions for the account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - Name of the backup-vault to create or update.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.EmptyObject>>}
   */
  public deleteBackupVault(
    params: ResourceConfigurationV1.DeleteBackupVaultParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName'];
    const _validParams = ['backupVaultName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'backup_vault_name': _params.backupVaultName,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteBackupVault');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
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
  /*************************
   * recoveryRanges
   ************************/

  /**
   * List RecoveryRanges on a backup vault.
   *
   * List RecoveryRanges on a backup vault. Lists all available ranges for all source resources by default. The
   * `?source_resource_crn` query parameter will limit the list to only ranges for the specified resource.
   *
   * Requires the user have `cloud-object-storage.backup_vault.list_recovery_ranges` permissions to the Backup Vault.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - name of BackupVault.
   * @param {string} [params.sourceResourceCrn] - CRN of source resource to filter on. This limits ranges returned to
   * only ranges where the source_resource_crn matches the parameter value.
   * @param {string} [params.latest] - If "true", then return only the latest RecoveryRange for each source-resource
   * that is backed up.
   *
   * If "false" or not specified, then the default behavior is produced.
   *
   * Value is can insensative. If any value is provided other than "true" or "false" then return 400.
   * @param {string} [params.token] - the continuation token for controlling pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.RecoveryRangeCollection>>}
   */
  public listRecoveryRanges(
    params: ResourceConfigurationV1.ListRecoveryRangesParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.RecoveryRangeCollection>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName'];
    const _validParams = ['backupVaultName', 'sourceResourceCrn', 'latest', 'token', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'source_resource_crn': _params.sourceResourceCrn,
      'latest': _params.latest,
      'token': _params.token,
    };

    const path = {
      'backup_vault_name': _params.backupVaultName,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'listRecoveryRanges');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}/recovery_ranges',
        method: 'GET',
        qs: query,
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
   * get RecoveryRange info.
   *
   * Get info for a specific RecoveryRange.
   *
   * Requires the user have `cloud-object-storage.backup_vault.get_recovery_range` permissions to the Backup Vault.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - name of BackupVault to update.
   * @param {string} params.recoveryRangeId - ID of the RecoveryRange to update.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.RecoveryRange>>}
   */
  public getSourceResourceRecoveryRange(
    params: ResourceConfigurationV1.GetSourceResourceRecoveryRangeParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.RecoveryRange>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName', 'recoveryRangeId'];
    const _validParams = ['backupVaultName', 'recoveryRangeId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'backup_vault_name': _params.backupVaultName,
      'recovery_range_id': _params.recoveryRangeId,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'getSourceResourceRecoveryRange');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}/recovery_ranges/{recovery_range_id}',
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
   * patch RecoveryRange info.
   *
   * Update a RecoveryRange via JSON-merge-patch semantics.
   *
   * Requires the user have `cloud-object-storage.backup_vault.put_retention` permissions to the Backup Vault.
   *
   * The retention.delete_after_days value may only be extended.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - name of BackupVault to update.
   * @param {string} params.recoveryRangeId - ID of the RecoveryRange to update.
   * @param {DeleteAfterDays} [params.retention] - The number of days to retain data within a RecoveryRange.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.RecoveryRange>>}
   */
  public patchSourceResourceRecoveryRange(
    params: ResourceConfigurationV1.PatchSourceResourceRecoveryRangeParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.RecoveryRange>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName', 'recoveryRangeId'];
    const _validParams = ['backupVaultName', 'recoveryRangeId', 'retention', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'retention': _params.retention,
    };

    const path = {
      'backup_vault_name': _params.backupVaultName,
      'recovery_range_id': _params.recoveryRangeId,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'patchSourceResourceRecoveryRange');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}/recovery_ranges/{recovery_range_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * restore
   ************************/

  /**
   * Initiate a Restore.
   *
   * Initiates a restore operation against some RecoveryRange to some destination bucket.
   *
   * The following shall be validated. Any failure to validate shall cause a HTTP 400 to be returned.
   *
   *   * The specified RecoveryRange must exist
   *   * The restore time must be within the RecoveryRange
   *   * the user has `cloud-object-storage.backup-vault.post_restore` permissions on the backup-vault
   *   * the target-bucket must exist and be able to be contacted by the Backup Vault
   *   * target-bucket must have versioning-on
   *   * the Backup Vault must have `cloud-object-storage.bucket.restore_sync` permissions on the target-bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - name of BackupVault to restore from.
   * @param {string} params.recoveryRangeId - A UUID that uniquely identifies a resource.
   * @param {string} params.restoreType - The type of restore to support. More options will be available in the future.
   * @param {string} params.restorePointInTime - Timestamp format used throughout the API.
   *
   * Accepts the following formats:
   *
   * YYYY-MM-DDTHH:mm:ssZ YYYY-MM-DDTHH:mm:ss YYYY-MM-DDTHH:mm:ss-hh:mm YYYY-MM-DDTHH:mm:ss+hh:mm
   * YYYY-MM-DDTHH:mm:ss.sssZ YYYY-MM-DDTHH:mm:ss.sss YYYY-MM-DDTHH:mm:ss.sss-hh:mm YYYY-MM-DDTHH:mm:ss.sss+hh:mm.
   * @param {string} params.targetResourceCrn - The CRN for a COS Bucket.
   *
   * Note that Softlayer CRNs do not contain dashes within the service_instance_id, whereas regular CRNs do. Although
   * bucket backup is not supported for softlayer accounts, this need not be enforced at the CRN parsing level.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.Restore>>}
   */
  public createRestore(
    params: ResourceConfigurationV1.CreateRestoreParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.Restore>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName', 'recoveryRangeId', 'restoreType', 'restorePointInTime', 'targetResourceCrn'];
    const _validParams = ['backupVaultName', 'recoveryRangeId', 'restoreType', 'restorePointInTime', 'targetResourceCrn', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'recovery_range_id': _params.recoveryRangeId,
      'restore_type': _params.restoreType,
      'restore_point_in_time': _params.restorePointInTime,
      'target_resource_crn': _params.targetResourceCrn,
    };

    const path = {
      'backup_vault_name': _params.backupVaultName,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'createRestore');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}/restores',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List Restores.
   *
   * List all current and complete restores.
   *
   * Requires that the user have `cloud-object-storage.backup_vault.list_restores` permission on the backup vault.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - name of BackupVault to restore from.
   * @param {string} [params.token] - the continuation token for controlling pagination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.RestoreCollection>>}
   */
  public listRestores(
    params: ResourceConfigurationV1.ListRestoresParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.RestoreCollection>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName'];
    const _validParams = ['backupVaultName', 'token', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'token': _params.token,
    };

    const path = {
      'backup_vault_name': _params.backupVaultName,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'listRestores');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}/restores',
        method: 'GET',
        qs: query,
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
   * Get Restore.
   *
   * Introspect on a specific restore.
   *
   * Requires that the user have `cloud-object-storage.backup_vault.get_restore` permission on the backup vault.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.backupVaultName - name of BackupVault that the restore occured on.
   * @param {string} params.restoreId - id of the restore to introspect on.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.Restore>>}
   */
  public getRestore(
    params: ResourceConfigurationV1.GetRestoreParams
  ): Promise<ResourceConfigurationV1.Response<ResourceConfigurationV1.Restore>> {
    const _params = { ...params };
    const _requiredParams = ['backupVaultName', 'restoreId'];
    const _validParams = ['backupVaultName', 'restoreId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'backup_vault_name': _params.backupVaultName,
      'restore_id': _params.restoreId,
    };

    const sdkHeaders = getSdkHeaders(ResourceConfigurationV1.DEFAULT_SERVICE_NAME, 'v1', 'getRestore');

    const parameters = {
      options: {
        url: '/backup_vaults/{backup_vault_name}/restores/{restore_id}',
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

  /** Parameters for the `createBackupPolicy` operation. */
  export interface CreateBackupPolicyParams {
    /** Name of the COS Bucket name. */
    bucket: string;
    /** The number of days to retain data within a RecoveryRange. */
    initialRetention: DeleteAfterDays;
    /** The name granted to the policy. Validation :
     *    * chars limited to alphanumeric, underscore, hyphen and period.
     */
    policyName: string;
    /** The CRN for a COS BackupVault. */
    targetBackupVaultCrn: string;
    /** The type of backup to support. For LA+GA this is limited to "continuous". */
    backupType: CreateBackupPolicyConstants.BackupType | string;
    /** MD5 hash of content. If provided, the hash of the request must match. */
    mD5?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createBackupPolicy` operation. */
  export namespace CreateBackupPolicyConstants {
    /** The type of backup to support. For LA+GA this is limited to "continuous". */
    export enum BackupType {
      CONTINUOUS = 'continuous',
    }
  }

  /** Parameters for the `listBackupPolicies` operation. */
  export interface ListBackupPoliciesParams {
    /** Name of the COS Bucket name. */
    bucket: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getBackupPolicy` operation. */
  export interface GetBackupPolicyParams {
    /** name of the bucket affected. */
    bucket: string;
    /** uuid of the BackupPolicy. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteBackupPolicy` operation. */
  export interface DeleteBackupPolicyParams {
    /** name of the bucket affected. */
    bucket: string;
    /** uuid of the BackupPolicy. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listBackupVaults` operation. */
  export interface ListBackupVaultsParams {
    /** Name of the service_instance to list BackupVaults for. */
    serviceInstanceId: string;
    /** the continuation token for controlling pagination. */
    token?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createBackupVault` operation. */
  export interface CreateBackupVaultParams {
    /** Name of the service_instance to list BackupVaults for. */
    serviceInstanceId: string;
    /** The name given to a Bucket.
     *
     *  Bucket names must be between 3 and 63 characters long must be made of lowercase letters, numbers, dots
     *  (periods), and dashes (hyphens). Bucket names must begin and end with a lowercase letter or number. Bucket names
     *  canâ€t contain consecutive dots or dashes. Bucket names that resemble IP addresses are not allowed.
     *
     *  Bucket and BackupVault names exist in a global namespace and therefore must be unique.
     */
    backupVaultName: string;
    /** the region in which this backup-vault should be created within. */
    region: string;
    /** Activity Tracking configuration. An empty object (`{}`) indicates no configuration, and no events will be
     *  sent (This is the same behavior as `{"management_events":false}`). Note that read/write events cannot be
     *  enabled, and events cannot be routed to a non-default Activity Tracker instance.
     */
    activityTracking?: BackupVaultActivityTracking;
    /** Metrics Monitoring configuration. An empty object (`{}`) indicates no configuration, and no metrics will be
     *  collected (This is the same behavior as `{"usage_metrics_enabled":false}`). Note that request metrics cannot be
     *  enabled, and metrics cannot be routed to a non-default metrics router instance.
     */
    metricsMonitoring?: BackupVaultMetricsMonitoring;
    /** The CRN for a KeyProtect root key. */
    sseKpCustomerRootKeyCrn?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getBackupVault` operation. */
  export interface GetBackupVaultParams {
    /** Name of the backup-vault to create or update. */
    backupVaultName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateBackupVault` operation. */
  export interface UpdateBackupVaultParams {
    /** Name of the backup-vault to create or update. */
    backupVaultName: string;
    /** Activity Tracking configuration. An empty object (`{}`) indicates no configuration, and no events will be
     *  sent (This is the same behavior as `{"management_events":false}`). Note that read/write events cannot be
     *  enabled, and events cannot be routed to a non-default Activity Tracker instance.
     */
    activityTracking?: BackupVaultActivityTracking;
    /** Metrics Monitoring configuration. An empty object (`{}`) indicates no configuration, and no metrics will be
     *  collected (This is the same behavior as `{"usage_metrics_enabled":false}`). Note that request metrics cannot be
     *  enabled, and metrics cannot be routed to a non-default metrics router instance.
     */
    metricsMonitoring?: BackupVaultMetricsMonitoring;
    /** Conditionally update the Backup Vault config if and only if the ETag of the existing config exactly matches
     *  the provided If-Match MD5.
     */
    ifMatch?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteBackupVault` operation. */
  export interface DeleteBackupVaultParams {
    /** Name of the backup-vault to create or update. */
    backupVaultName: string;
    headers?: OutgoingHttpHeaders;
  }

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

  /** Parameters for the `listRecoveryRanges` operation. */
  export interface ListRecoveryRangesParams {
    /** name of BackupVault. */
    backupVaultName: string;
    /** CRN of source resource to filter on. This limits ranges returned to only ranges where the
     *  source_resource_crn matches the parameter value.
     */
    sourceResourceCrn?: string;
    /** If "true", then return only the latest RecoveryRange for each source-resource that is backed up.
     *
     *  If "false" or not specified, then the default behavior is produced.
     *
     *  Value is can insensative. If any value is provided other than "true" or "false" then return 400.
     */
    latest?: string;
    /** the continuation token for controlling pagination. */
    token?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSourceResourceRecoveryRange` operation. */
  export interface GetSourceResourceRecoveryRangeParams {
    /** name of BackupVault to update. */
    backupVaultName: string;
    /** ID of the RecoveryRange to update. */
    recoveryRangeId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `patchSourceResourceRecoveryRange` operation. */
  export interface PatchSourceResourceRecoveryRangeParams {
    /** name of BackupVault to update. */
    backupVaultName: string;
    /** ID of the RecoveryRange to update. */
    recoveryRangeId: string;
    /** The number of days to retain data within a RecoveryRange. */
    retention?: DeleteAfterDays;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createRestore` operation. */
  export interface CreateRestoreParams {
    /** name of BackupVault to restore from. */
    backupVaultName: string;
    /** A UUID that uniquely identifies a resource. */
    recoveryRangeId: string;
    /** The type of restore to support. More options will be available in the future. */
    restoreType: CreateRestoreConstants.RestoreType | string;
    /** Timestamp format used throughout the API.
     *
     *  Accepts the following formats:
     *
     *  YYYY-MM-DDTHH:mm:ssZ YYYY-MM-DDTHH:mm:ss YYYY-MM-DDTHH:mm:ss-hh:mm YYYY-MM-DDTHH:mm:ss+hh:mm
     *  YYYY-MM-DDTHH:mm:ss.sssZ YYYY-MM-DDTHH:mm:ss.sss YYYY-MM-DDTHH:mm:ss.sss-hh:mm YYYY-MM-DDTHH:mm:ss.sss+hh:mm.
     */
    restorePointInTime: string;
    /** The CRN for a COS Bucket.
     *
     *  Note that Softlayer CRNs do not contain dashes within the service_instance_id, whereas regular CRNs do. Although
     *  bucket backup is not supported for softlayer accounts, this need not be enforced at the CRN parsing level.
     */
    targetResourceCrn: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createRestore` operation. */
  export namespace CreateRestoreConstants {
    /** The type of restore to support. More options will be available in the future. */
    export enum RestoreType {
      IN_PLACE = 'in_place',
    }
  }

  /** Parameters for the `listRestores` operation. */
  export interface ListRestoresParams {
    /** name of BackupVault to restore from. */
    backupVaultName: string;
    /** the continuation token for controlling pagination. */
    token?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getRestore` operation. */
  export interface GetRestoreParams {
    /** name of BackupVault that the restore occured on. */
    backupVaultName: string;
    /** id of the restore to introspect on. */
    restoreId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Enables sending log data to IBM Cloud Activity Tracker Event Routing to provide visibility into bucket management,
   * object read and write events. (Recommended) When the `activity_tracker_crn` is not populated, then enabled events
   * are sent to the Activity Tracker Event Routing instance at the container's location unless otherwise specified in
   * the Activity Tracker Event Routing Event Routing service configuration. (Legacy) When the `activity_tracker_crn` is
   * populated, then enabled events are sent to the Activity Tracker Event Routing instance specified.
   */
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

  /**
   * The current backup coverage for a COS Bucket.
   */
  export interface BackupPolicy {
    /** The number of days to retain data within a RecoveryRange. */
    initial_retention: DeleteAfterDays;
    /** The name granted to the policy. Validation :
     *    * chars limited to alphanumeric, underscore, hyphen and period.
     */
    policy_name: string;
    /** The CRN for a COS BackupVault. */
    target_backup_vault_crn: string;
    /** The type of backup to support. For LA+GA this is limited to "continuous". */
    backup_type: BackupPolicy.Constants.BackupType | string;
    /** A UUID that uniquely identifies a resource. */
    policy_id: string;
    /** The current status of the backup policy.
     *
     *  pending : the policy has been received and has begun processing. initializing : pre-existing objects are being
     *  sync to the backup vault. active : the policy is active and healthy. action_needed : the policy is unhealthy and
     *  requires some intervention to recover degraded : the policy is unhealthy failed : the policy has failed
     *  unrecoverably.
     */
    policy_status: BackupPolicy.Constants.PolicyStatus | string;
    /** Reports percent-doneness of init. Only present when policy_status=INITIALIZING/PENDING. */
    initial_sync_progress?: number;
    /** reports error cause. Only present when policy_status=ERROR/FAILED. */
    error_cause?: string;
  }
  export namespace BackupPolicy {
    export namespace Constants {
      /** The type of backup to support. For LA+GA this is limited to "continuous". */
      export enum BackupType {
        CONTINUOUS = 'continuous',
      }
      /** The current status of the backup policy. pending : the policy has been received and has begun processing. initializing : pre-existing objects are being sync to the backup vault. active : the policy is active and healthy. action_needed : the policy is unhealthy and requires some intervention to recover degraded : the policy is unhealthy failed : the policy has failed unrecoverably. */
      export enum PolicyStatus {
        PENDING = 'pending',
        INITIALIZING = 'initializing',
        ACTIVE = 'active',
        ACTION_NEEDED = 'action_needed',
        DEGRADED = 'degraded',
        FAILED = 'failed',
      }
    }
  }

  /**
   * A collection of backup policies.
   */
  export interface BackupPolicyCollection {
    /** A collection of backup policies. */
    backup_policies: BackupPolicy[];
  }

  /**
   * Metadata associated with a backup vault.
   */
  export interface BackupVault {
    /** Activity Tracking configuration. An empty object (`{}`) indicates no configuration, and no events will be
     *  sent (This is the same behavior as `{"management_events":false}`). Note that read/write events cannot be
     *  enabled, and events cannot be routed to a non-default Activity Tracker instance.
     */
    activity_tracking?: BackupVaultActivityTracking;
    /** Metrics Monitoring configuration. An empty object (`{}`) indicates no configuration, and no metrics will be
     *  collected (This is the same behavior as `{"usage_metrics_enabled":false}`). Note that request metrics cannot be
     *  enabled, and metrics cannot be routed to a non-default metrics router instance.
     */
    metrics_monitoring?: BackupVaultMetricsMonitoring;
    /** The name given to a Bucket.
     *
     *  Bucket names must be between 3 and 63 characters long must be made of lowercase letters, numbers, dots
     *  (periods), and dashes (hyphens). Bucket names must begin and end with a lowercase letter or number. Bucket names
     *  canâ€t contain consecutive dots or dashes. Bucket names that resemble IP addresses are not allowed.
     *
     *  Bucket and BackupVault names exist in a global namespace and therefore must be unique.
     */
    backup_vault_name: string;
    /** the region in which this backup-vault should be created within. */
    region: string;
    /** The CRN for a KeyProtect root key. */
    sse_kp_customer_root_key_crn?: string;
    /** The CRN for a COS BackupVault. */
    crn?: string;
    /** A COS ServiceInstance CRN. */
    service_instance_crn?: string;
    /** creation time of the backup-vault. Returns "YYYY-MM-DDTHH:mm:ss.sssZ" timestamp format. */
    time_created?: string;
    /** time of last update to the backup-vault Returns "YYYY-MM-DDTHH:mm:ss.sssZ" timestamp format. */
    time_updated?: string;
    /** byte useage of the backup-vault. This should include all usage, including non-current versions. A maximum
     *  value is not defined.
     */
    bytes_used?: number;
  }

  /**
   * Activity Tracking configuration. An empty object (`{}`) indicates no configuration, and no events will be sent
   * (This is the same behavior as `{"management_events":false}`). Note that read/write events cannot be enabled, and
   * events cannot be routed to a non-default Activity Tracker instance.
   */
  export interface BackupVaultActivityTracking {
    /** Whether to send notifications for management events on the BackupVault. */
    management_events?: boolean;
  }

  /**
   * A listing of backup vaults.
   */
  export interface BackupVaultCollection {
    /** Pagination response body. */
    next?: NextPagination;
    /** List of Backup Vaults. If no Backup Vaults exist, this array will be empty. */
    backup_vaults: string[];
  }

  /**
   * Metrics Monitoring configuration. An empty object (`{}`) indicates no configuration, and no metrics will be
   * collected (This is the same behavior as `{"usage_metrics_enabled":false}`). Note that request metrics cannot be
   * enabled, and metrics cannot be routed to a non-default metrics router instance.
   */
  export interface BackupVaultMetricsMonitoring {
    /** Whether usage metrics are collected for this BackupVault. */
    usage_metrics_enabled?: boolean;
  }

  /**
   * A bucket.
   */
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

  /**
   * The number of days to retain data within a RecoveryRange.
   */
  export interface DeleteAfterDays {
    /** The number of days to retain data within a RecoveryRange. */
    delete_after_days?: number;
  }

  /**
   * The retention configuration for a RecoveryRange.
   */
  export interface DeleteAfterDaysWithIndefinite {
    /** The number of days to retain data within a RecoveryRange. -1 is a special value that denotes "indefinite"
     *  retention. This value can only be set implicitly via a policy created during the LA release being upgraded to
     *  the GA release.
     */
    delete_after_days?: number;
  }

  /**
   * An access control mechanism based on the network (IP address) where request originated. Requests not originating
   * from IP addresses listed in the `allowed_ip` field will be denied regardless of any access policies (including
   * public access) that might otherwise permit the request.  Viewing or updating the `Firewall` element requires the
   * requester to have the `manager` role.
   */
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

  /**
   * Enables sending metrics to IBM Cloud Monitoring.  All metrics are opt-in. (Recommended) When the
   * `metrics_monitoring_crn` is not populated, then enabled metrics are sent to the Monitoring instance at the
   * container's location unless otherwise specified in the Metrics Router service configuration. (Legacy) When the
   * `metrics_monitoring_crn` is populated, then enabled metrics are sent to the Monitoring instance defined in the
   * `metrics_monitoring_crn` field.
   */
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

  /**
   * Pagination response body.
   */
  export interface NextPagination {
    /** A URL to the continuation of results. */
    href: string;
    /** The continuation token utilized for paginated results. */
    token: string;
  }

  /**
   * Data structure holding protection management operations.
   */
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

  /**
   * Data structure holding protection management response.
   */
  export interface ProtectionManagementResponse {
    /** Indicates the X number of protection management tokens that have been applied to the bucket in its lifetime. */
    token_applied_counter?: string;
    /** The 'protection management token list' holding a recent list of applied tokens. This list may contain a
     *  subset of all tokens applied to the bucket, as indicated by the counter.
     */
    token_entries?: ProtectionManagementResponseTokenEntry[];
  }

  /**
   * Data structure holding protection management token.
   */
  export interface ProtectionManagementResponseTokenEntry {
    token_id?: string;
    token_expiration_time?: string;
    token_reference_id?: string;
    applied_time?: string;
    invalidated_time?: string;
    expiration_time?: string;
    shorten_retention_flag?: boolean;
  }

  /**
   * Metadata associated with a recovery range.
   */
  export interface RecoveryRange {
    /** The CRN for a COS Bucket.
     *
     *  Note that Softlayer CRNs do not contain dashes within the service_instance_id, whereas regular CRNs do. Although
     *  bucket backup is not supported for softlayer accounts, this need not be enforced at the CRN parsing level.
     */
    source_resource_crn?: string;
    /** The name granted to the policy. Validation :
     *    * chars limited to alphanumeric, underscore, hyphen and period.
     */
    backup_policy_name?: string;
    /** The point in time at which backup coverage of the sourceResource begins.
     *
     *  Returns "YYYY-MM-DDTHH:mm:ss.sssZ" timestamp format.
     */
    range_start_time?: string;
    /** the point in time at which backup coverage of the sourceResource ends. Returns "YYYY-MM-DDTHH:mm:ss.sssZ"
     *  timestamp format.
     */
    range_end_time?: string;
    /** The time at which this recoveryRange was initially created.
     *
     *  Returns "YYYY-MM-DDTHH:mm:ss.sssZ" timestamp format
     *
     *  NOTE : this can be before the start-time.
     */
    range_create_time?: string;
    /** The retention configuration for a RecoveryRange. */
    retention?: DeleteAfterDaysWithIndefinite;
    /** A UUID that uniquely identifies a resource. */
    recovery_range_id?: string;
  }

  /**
   * A collection of recovery ranges.
   */
  export interface RecoveryRangeCollection {
    /** Pagination response body. */
    next?: NextPagination;
    /** A list of recovery ranges. */
    recovery_ranges: RecoveryRange[];
  }

  /**
   * Metadata associated with a requested restore operation.
   */
  export interface Restore {
    /** A UUID that uniquely identifies a resource. */
    recovery_range_id: string;
    /** The type of restore to support. More options will be available in the future. */
    restore_type: Restore.Constants.RestoreType | string;
    /** Timestamp format used throughout the API.
     *
     *  Accepts the following formats:
     *
     *  YYYY-MM-DDTHH:mm:ssZ YYYY-MM-DDTHH:mm:ss YYYY-MM-DDTHH:mm:ss-hh:mm YYYY-MM-DDTHH:mm:ss+hh:mm
     *  YYYY-MM-DDTHH:mm:ss.sssZ YYYY-MM-DDTHH:mm:ss.sss YYYY-MM-DDTHH:mm:ss.sss-hh:mm YYYY-MM-DDTHH:mm:ss.sss+hh:mm.
     */
    restore_point_in_time: string;
    /** The CRN for a COS Bucket.
     *
     *  Note that Softlayer CRNs do not contain dashes within the service_instance_id, whereas regular CRNs do. Although
     *  bucket backup is not supported for softlayer accounts, this need not be enforced at the CRN parsing level.
     */
    target_resource_crn: string;
    /** The CRN for a COS Bucket.
     *
     *  Note that Softlayer CRNs do not contain dashes within the service_instance_id, whereas regular CRNs do. Although
     *  bucket backup is not supported for softlayer accounts, this need not be enforced at the CRN parsing level.
     */
    source_resource_crn?: string;
    /** A UUID that uniquely identifies a resource. */
    restore_id?: string;
    /** The current status for this restore operation.
     *
     *  initializing: The operation is initializing. Do not expect to see restored objects on the target bucket.
     *  running : The operation is ongoing. Expect to see some restored objects on the target bucket.  complete: The
     *  operation has completed successfully.  failed: The operation has completed unsuccessfully.
     */
    restore_status?: Restore.Constants.RestoreStatus | string;
    /** The time at which this restore was initiated Returns "YYYY-MM-DDTHH:mm:ss.sssZ" timestamp format. */
    init_time?: string;
    /** The time at which this restore ended (in both success and error cases) Returns "YYYY-MM-DDTHH:mm:ss.sssZ"
     *  timestamp format.
     */
    complete_time?: string;
    /** reports percent-doneness of init. Only present when restore_status=running. */
    restore_percent_progress?: number;
    /** Only present when restore_status=running. */
    error_cause?: string;
  }
  export namespace Restore {
    export namespace Constants {
      /** The type of restore to support. More options will be available in the future. */
      export enum RestoreType {
        IN_PLACE = 'in_place',
      }
      /** The current status for this restore operation. initializing: The operation is initializing. Do not expect to see restored objects on the target bucket.  running : The operation is ongoing. Expect to see some restored objects on the target bucket.  complete: The operation has completed successfully.  failed: The operation has completed unsuccessfully. */
      export enum RestoreStatus {
        INITIALIZING = 'initializing',
        RUNNING = 'running',
        COMPLETE = 'complete',
        FAILED = 'failed',
      }
    }
  }

  /**
   * A list of restore operations.
   */
  export interface RestoreCollection {
    /** Pagination response body. */
    next?: NextPagination;
    /** A collection of active and completed restore operations. */
    restores: Restore[];
  }

  /*************************
   * pager classes
   ************************/

  /**
   * BackupVaultsPager can be used to simplify the use of listBackupVaults().
   */
  export class BackupVaultsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceConfigurationV1;

    protected params: ResourceConfigurationV1.ListBackupVaultsParams;

    /**
     * Construct a BackupVaultsPager object.
     *
     * @param {ResourceConfigurationV1}  client - The service client instance used to invoke listBackupVaults()
     * @param {Object} params - The parameters to be passed to listBackupVaults()
     * @constructor
     * @returns {BackupVaultsPager}
     */
    constructor(client: ResourceConfigurationV1, params: ResourceConfigurationV1.ListBackupVaultsParams) {
      if (params && params.token) {
        throw new Error(`the params.token field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listBackupVaults().
     * @returns {Promise<string[]>}
     */
    public async getNext(): Promise<string[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.token = this.pageContext.next;
      }
      const response = await this.client.listBackupVaults(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.token;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.backup_vaults;
    }

    /**
     * Returns all results by invoking listBackupVaults() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<string[]>}
     */
    public async getAll(): Promise<string[]> {
      const results: string[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * RecoveryRangesPager can be used to simplify the use of listRecoveryRanges().
   */
  export class RecoveryRangesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceConfigurationV1;

    protected params: ResourceConfigurationV1.ListRecoveryRangesParams;

    /**
     * Construct a RecoveryRangesPager object.
     *
     * @param {ResourceConfigurationV1}  client - The service client instance used to invoke listRecoveryRanges()
     * @param {Object} params - The parameters to be passed to listRecoveryRanges()
     * @constructor
     * @returns {RecoveryRangesPager}
     */
    constructor(client: ResourceConfigurationV1, params: ResourceConfigurationV1.ListRecoveryRangesParams) {
      if (params && params.token) {
        throw new Error(`the params.token field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listRecoveryRanges().
     * @returns {Promise<ResourceConfigurationV1.RecoveryRange[]>}
     */
    public async getNext(): Promise<ResourceConfigurationV1.RecoveryRange[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.token = this.pageContext.next;
      }
      const response = await this.client.listRecoveryRanges(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.token;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.recovery_ranges;
    }

    /**
     * Returns all results by invoking listRecoveryRanges() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceConfigurationV1.RecoveryRange[]>}
     */
    public async getAll(): Promise<ResourceConfigurationV1.RecoveryRange[]> {
      const results: RecoveryRange[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * RestoresPager can be used to simplify the use of listRestores().
   */
  export class RestoresPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceConfigurationV1;

    protected params: ResourceConfigurationV1.ListRestoresParams;

    /**
     * Construct a RestoresPager object.
     *
     * @param {ResourceConfigurationV1}  client - The service client instance used to invoke listRestores()
     * @param {Object} params - The parameters to be passed to listRestores()
     * @constructor
     * @returns {RestoresPager}
     */
    constructor(client: ResourceConfigurationV1, params: ResourceConfigurationV1.ListRestoresParams) {
      if (params && params.token) {
        throw new Error(`the params.token field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listRestores().
     * @returns {Promise<ResourceConfigurationV1.Restore[]>}
     */
    public async getNext(): Promise<ResourceConfigurationV1.Restore[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.token = this.pageContext.next;
      }
      const response = await this.client.listRestores(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.token;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.restores;
    }

    /**
     * Returns all results by invoking listRestores() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceConfigurationV1.Restore[]>}
     */
    public async getAll(): Promise<ResourceConfigurationV1.Restore[]> {
      const results: Restore[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = ResourceConfigurationV1;
