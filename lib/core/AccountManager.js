'use strict';

const Promise = require('bluebird');
const { google } = require('googleapis');
const ResourceManager = google.cloudresourcemanager('v1');

exports.AccountManager = class AccountManager {
  constructor (config) {
    this.config = config;
  };

  getAuthClient () {
    let auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      credentials: this.config.credentials
    });

    return auth.getClient();
  };

  getIamPolicy(iamUser) {
    return this.getAuthClient().then((authClient) => {
      return ResourceManager.projects.getIamPolicy({
        resource: `user:${iamUser.username}`,
        auth: authClient
      });
    });
  }

  setIamPolicy(iamUser, accessPolicies) {
    return this.getAuthClient().then((authClient) => {
      return ResourceManager.projects.setIamPolicy({
        resource: `user:${iamUser.username}`,
        policy: accessPolicies,
        auth: authClient
      });
    });
  }
};
