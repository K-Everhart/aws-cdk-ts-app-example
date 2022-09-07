import { expect as expectCDK, haveResource } from '@aws-cdk/assert'
import { App } from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-ts-app-stack'


///////////////////////
// RESOURCE TESTS
///////////////////////

test('App has aws:kms alias resource', () => {
  const app = new App()

  const cdkStack = new CdkStack(app, 'MyStack', {
  })

  expectCDK(cdkStack).to(haveResource('AWS::KMS::Alias', {
  }))
})

test('App has aws:kms key resource', () => {
  const app = new App()

  const cdkStack = new CdkStack(app, 'MyStack', {
  })

  expectCDK(cdkStack).to(haveResource('AWS::KMS::Key', {
  }))
})

///////////////////////
// PROPERTY TESTS
///////////////////////

test('App has aws:kms key rotation property', () => {
  const app = new App()

  const cdkStack = new CdkStack(app, 'MyStack', {
  })

  expectCDK(cdkStack).to(haveResource('AWS::KMS::Key', {
    EnableKeyRotation: false,
  }))
})