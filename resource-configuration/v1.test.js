/**
 * Copyright 2019 IBM All Rights Reserved.
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
'use strict';

const helper = require('ibm-cloud-sdk-core');
const ResourceConfigurationV1 = require('../../resource-configuration/v1');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkCallback,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkUserHeader,
} = utils;

const noop = () => {};

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://config.cloud-object-storage.cloud.ibm.com/v1/v1',
  version: '2018-10-18',
};

const resourceConfiguration = new ResourceConfigurationV1(service);
const createRequestMock = jest.spyOn(resourceConfiguration, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('getBucketConfig', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const bucket = 'fake_bucket';
      const params = {
        bucket,
      };

      // invoke method
      resourceConfiguration.getBucketConfig(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/b/{bucket}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['bucket']).toEqual(bucket);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const bucket = 'fake_bucket';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        bucket,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      resourceConfiguration.getBucketConfig(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const bucket = 'fake_bucket';
      const params = {
        bucket,
      };

      // invoke method
      const getBucketConfigPromise = resourceConfiguration.getBucketConfig(params);
      expectToBePromise(getBucketConfigPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      resourceConfiguration.getBucketConfig(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['bucket'];

      resourceConfiguration.getBucketConfig({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['bucket'];

      const getBucketConfigPromise = resourceConfiguration.getBucketConfig();
      expectToBePromise(getBucketConfigPromise);

      getBucketConfigPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('updateBucketConfig', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const bucket = 'fake_bucket';
      const firewall = 'fake_firewall';
      const activity_tracking = 'fake_activity_tracking';
      const metrics_monitoring = 'fake_metrics_monitoring';
      const if_match = 'fake_if_match';
      const params = {
        bucket,
        firewall,
        activity_tracking,
        metrics_monitoring,
        if_match,
      };

      // invoke method
      resourceConfiguration.updateBucketConfig(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/b/{bucket}', 'PATCH');
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'if-match', if_match);
      expect(options.body['firewall']).toEqual(firewall);
      expect(options.body['activity_tracking']).toEqual(activity_tracking);
      expect(options.body['metrics_monitoring']).toEqual(metrics_monitoring);
      expect(options.path['bucket']).toEqual(bucket);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const bucket = 'fake_bucket';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        bucket,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      resourceConfiguration.updateBucketConfig(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const bucket = 'fake_bucket';
      const params = {
        bucket,
      };

      // invoke method
      const updateBucketConfigPromise = resourceConfiguration.updateBucketConfig(params);
      expectToBePromise(updateBucketConfigPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      resourceConfiguration.updateBucketConfig(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['bucket'];

      resourceConfiguration.updateBucketConfig({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['bucket'];

      const updateBucketConfigPromise = resourceConfiguration.updateBucketConfig();
      expectToBePromise(updateBucketConfigPromise);

      updateBucketConfigPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
