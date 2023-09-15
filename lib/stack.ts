import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class AwsCdkTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Print to console the variables used
    const env = this.node.tryGetContext('environment');
    console.log('Synthing with the following context variables...👉', env);
    const removalPolicySetting = this.node.tryGetContext(env)['removalPolicy'];
    const removalPolicy = removalPolicySetting === "DESTROY" ? cdk.RemovalPolicy.DESTROY : cdk.RemovalPolicy.RETAIN;

    const bucket = new s3.Bucket(this, 'SampleBucket', {
      bucketName: `bucketname-${env}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: this.node.tryGetContext(env)['autoDeleteObjects']
    });

    const table = new dynamodb.Table(this, 'SampleTable', {
      tableName: `tableName-${env}`,
      partitionKey: {name: 'todoId', type: dynamodb.AttributeType.NUMBER},
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
