'use strict';

const CredentialsRegistryDataSchema = {
  type: 'object',
  properties: {
    credentials: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        project_id: { type: 'string' },
        private_key_id: { type: 'string' },
        private_key: { type: 'string' },
        client_email: { type: 'string' },
        client_id: { type: 'string' },
        auth_uri: { type: 'string' },
        token_uri: { type: 'string' },
        auth_provider_x509_cert_url: { type: 'string' },
        client_x509_cert_url: { type: 'string' }
      },
      required: [ 'type', 'project_id', 'private_key_id', 'private_key',
        'client_email', 'client_id', 'auth_uri', 'token_uri',
        'auth_provider_x509_cert_url', 'client_x509_cert_url' ]
    },
    region: { type: 'string' }
  },
  required: [ 'credentials' ]
};

const MutatingWorkflowContextSchema = {
  type: "object",
  properties: {
    iamUser: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        deleteUser: { type: 'boolean', default: false }
      },
      required: [ 'username' ]
    },
    loginProfile: {
      type: 'object',
      properties: {
        password: { type: 'string' },
        requirePasswordReset: { type: 'boolean', default: true }
      },
      required: [ 'password' ]
    },
    accessPolicies: {
      type: 'object',
      properties: {
        userPolicyArns: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        groups: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    }
  }
};

const ReadOnlyWorkflowContextSchema = {
  type: 'object',
  properties: {
    iamUser: {
      type: 'object',
      properties: {
        username: { type: 'string' }
      },
      required: [ 'username' ]
    }
  }
};

exports.CredentialsRegistryDataSchema = CredentialsRegistryDataSchema;
exports.MutatingWorkflowContextSchema = MutatingWorkflowContextSchema;
exports.ReadOnlyWorkflowContextSchema = ReadOnlyWorkflowContextSchema;
