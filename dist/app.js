'use strict';
var CosResourceConfigurationApiV0 = require('../cos-resource-configuration-api/v0-generated');
var IamTokenManager = require('../iam-token-manager/v1');
// url?: string;
// iam_access_token?: string;
// iam_apikey?: string;
// iam_url?: string;
// username?: string;
// password?: string;
// use_unauthenticated?: boolean;
// headers?: object;
var service = {
    iam_apikey: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    //iam_url: '',
    url: 'http://localhost:8089/v1'
};
var configApi = new CosResourceConfigurationApiV0(service);
configApi.getBucketConfig({
    bucket: "myBucket"
}, function (err, data) {
    console.log("ERROR: ", err);
    console.log("DATA: ", data);
});
//# sourceMappingURL=app.js.map