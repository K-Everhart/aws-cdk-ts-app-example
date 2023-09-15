#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkTestStack } from '../lib/stack';

const app = new cdk.App();
const environment = app.node.tryGetContext('environment');

new AwsCdkTestStack(app, 'StackName' + '-' + environment);