#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {CdkStack} from '../lib/cdk-ts-app-stack';

const app = new cdk.App();

new CdkStack(app, 'cdk-stack', {
  stackName: 'cdk-ts-app',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});