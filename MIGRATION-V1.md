# Migration Guide - upgrading to ibm-cos-sdk-config@2.0.0

- [Breaking Changes](#breaking-changes)
  - [Changes in Package Imports](#Changes-in-Package-Imports)
  - [Changes in Create Client](#Changes-in-Create-Client)
  - [Changes in API Method Names](#Changes-in-API-Method-Names)
  - [Changes in Response](#Changes-in-Response)
  - [Change in Agent Name](#Change-in-Agent-Name)

## Breaking changes

### Changes in Package Imports

There is a change in the import statement and a new package needs to be imported as below.

#### Using API Key -

```js
==================================================================================================================================
    Current                          |                 New
==================================================================================================================================
RC = require('ibm-cos-sdk-config');  | ResourceConfigurationV1 = require('ibm-cos-sdk-config/resource-configuration/v1');
                                     | {IamAuthenticator}      = require('ibm-cos-sdk-config/auth');
                                     |   
```

#### Using Access Token -

```js
===================================================================================================================================
    Current                          |                 New
=================================================================================================================================== 
RC = require('ibm-cos-sdk-config');  | ResourceConfigurationV1    = require('ibm-cos-sdk-config/resource-configuration/v1');                               
                                     | {BearerTokenAuthenticator} = require('ibm-cos-sdk-config/auth');
                                     |
```

### Changes in Create Client

Credentials are no longer passed in as constructor parameters. Rather, a single `authenticator` is instantiated and passed in to the constructor.

Example:

#### Using API Key -

```js
====================================================================================================================================
                             Current                  |                            New
====================================================================================================================================
rcConfig = {                                          |     authenticator = new IamAuthenticator({                               
    iam_apikey: "Iam_ApiKey",                         |            apikey: "ApiKey",
    iam_url: "Iam_Url",                               |            url: "IbmAuthEndpoint",
    url: "URL",                                       |            disableSslVerification: true/false
    disable_ssl_verification: true/false              |          }); 
};                                                    |     
                                                      |     rcConfig = {
                                                      |            authenticator: authenticator,
                                                      |            serviceUrl: "RcEndPointUrl",
                                                      |          };
                                                      |
 rcClient = new RC.ResourceConfigurationV1(rcConfig)  |     rcClient = new ResourceConfigurationV1(rcConfig);
                                                      |
```

#### Using Access Token -

```js

===================================================================================================================================
                             Current                  |                      New
===================================================================================================================================                                                      |
rcConfig = {                                          |     bearerTokenAuth = new BearerTokenAuthenticator({                              
    iam_access_token: "iam_access_token",             |            bearerToken: "bearetoken",
    iam_url: "Iam_Url",                               |           });
    url: "URL",                                       |        
    disable_ssl_verification: true/false              |     rcConfig = {
};                                                    |            authenticator: bearerTokenAuth,
                                                      |            serviceUrl: "RcEndPointUrl",
                                                      |           };
                                                      |
 rcClient = new RC.ResourceConfigurationV1(rcConfig)  |     rcClient = new ResourceConfigurationV1(rcConfig);
                                                      |
```

### Changes in API Method Names

All parameter names changed to lower camel case

```js
activity_tracking   -->  activityTracking
hard_quota          -->  hardQuota
metrics_monitoring  -->  metricsMonitoring 
```

### Changes in Response

The structure of response element is changed as below but response parameter names `hard_quota, activity_tracking and metrics_monitoring` are not changed.

Example:

```js
====================================================================================================================================================
                             Current                                |                 New
====================================================================================================================================================
response = rcClient.getBucketConfig({bucket: bucketName});          | response = rcClient.getBucketConfig({bucket: bucketName});
                                                                    |  
(response.firewall).to.exist;                                       | (response.result.firewall).to.exist;
                                                                    |
(response).to.have.property('hard_quota');                          | (response.result).to.have.property('hard_quota')
                                                                    |  
(response).to.have.property('object_count');                        | (response.result).to.have.property('object_count');
                                                                    |
(response.activity_tracking.read_data_events).to.equal(true);       | (response.result.activity_tracking.read_data_events).to.equal(true);
(response.activity_tracking.write_data_events).to.equal(true);      | (response.result.activity_tracking.write_data_events).to.equal(true);
(response.activity_tracking.activity_tracker_crn).to.equal(CRN);    | (response.result.activity_tracking.activity_tracker_crn).to.equal(CRN);
                                                                    |  
(response.metrics_monitoring.request_metrics_enabled).to.eql(true); | (response.result.metrics_monitoring.request_metrics_enabled).to.eql(true);
```

### Change in Agent Name

```md
    ibm-cos-resource-config-sdk-js --> ibm-cos-sdk-js-config 
```
  
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
