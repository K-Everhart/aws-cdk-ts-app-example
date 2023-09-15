import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as AwsCdkTest from '../lib/stack';

describe('AwsCdkTestStack', () => {
  
  test('S3 Bucket Created', () => {
    const app = new cdk.App();
    const stack = new AwsCdkTest.AwsCdkTestStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: Match.anyValue()
    });
  });

  test('DynamoDb Table Created', () => {
    const app = new cdk.App();
    const stack = new AwsCdkTest.AwsCdkTestStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DynamoDB::Table', {
      TableName: Match.anyValue()
    });
  });

  test('DynamoDB table has correct schema', () => {
    const app = new cdk.App();
    const stack = new AwsCdkTest.AwsCdkTestStack(app, 'MyTestStack');
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