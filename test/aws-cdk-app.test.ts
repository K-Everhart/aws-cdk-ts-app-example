import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as AwsCdkTest from '../lib/stack';

describe('AwsCdkTestStack', () => {

  const environmentName = 'dev';

  const app = new cdk.App();
  app.node.setContext('environment', environmentName);
  const stack = new AwsCdkTest.AwsCdkTestStack(app, 'MyTestStack');
  
  test('S3 Bucket Created', () => {
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: Match.anyValue()
    });
  });

  test('DynamoDb Table Created', () => {
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DynamoDB::Table', {
      TableName: Match.anyValue()
    });
  });

  test('DynamoDB table has correct schema', () => {
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DynamoDB::Table', {
      KeySchema: [
        {
          AttributeName: 'todoId',
          KeyType: 'HASH'
        }
      ]
    });
  });
});
