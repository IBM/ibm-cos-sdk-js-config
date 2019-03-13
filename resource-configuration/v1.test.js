'use strict';

const ResourceConfigurationV1 = require('../../resource-configuration/v1-generated');
const helper = require('../../lib/helper');
const utils = require('../resources/unitTestUtils');

const {
  missingParamsError,
  missingParamsSuccess,
  checkUrlAndMethod,
  checkCallback,
  checkMediaHeaders,
  checkUserHeader,
  checkDefaultSuccessArgs,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  getOptions,
} = utils;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://config.cloud-object-storage.cloud.ibm.com/v1',
  version: '2018-10-18',
};

const configApi = new ResourceConfigurationV1(service);
const createRequestMock = jest.spyOn(configApi, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');
const noop = () => {};

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
      configApi.getBucketConfig(params);

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

      configApi.getBucketConfig(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      configApi.getBucketConfig(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['bucket'];

      configApi.getBucketConfig({}, err => {
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
      const if_match = 'fake_if_match';
      const params = {
        bucket,
        firewall,
        if_match,
      };

      // invoke method
      configApi.updateBucketConfig(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/b/{bucket}', 'PATCH');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'if-match', if_match);
      expect(options.body['firewall']).toEqual(firewall);
      expect(options.json).toEqual(true);
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

      configApi.updateBucketConfig(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      configApi.updateBucketConfig(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['bucket'];

      configApi.updateBucketConfig({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
    
  });
});
