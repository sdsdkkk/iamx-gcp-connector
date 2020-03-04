'use strict';

const Promise = require('bluebird');
const { google } = require('googleapis');
const ResourceManager = google.cloudresourcemanager('v1');

exports.AccountManager = class AccountManager {
  constructor (config) {
    this.config = config;
  };

  getUserPolicies (iamUser) {
    let memberOfRoles = [];
    return this.getIamPolicy()
      .then((response) => {
        let roleMembers = response.data.bindings;
        return Promise.each(roleMembers, (roleMember) => {
          if (roleMember.members.includes(`user:${iamUser.username}`)) {
            memberOfRoles.push(roleMember.role);
          }
        });
      })
      .then(() => {
        return Promise.resolve({
          username: iamUser.username,
          roles: memberOfRoles
        });
      });
  }

  getAuthClient () {
    let auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      credentials: this.config.credentials
    });

    return auth.getClient();
  };

  getIamPolicy () {
    return this.getAuthClient().then((authClient) => {
      return ResourceManager.projects.getIamPolicy({
        resource: this.config.credentials.project_id,
        auth: authClient
      });
    });
  }

  setIamPolicy(iamUser, accessPolicies) {
    return this.getAuthClient().then((authClient) => {
      return ResourceManager.projects.setIamPolicy({
        resource: this.config.credentials.project_id,
        auth: authClient
      });
    });
  }
};
