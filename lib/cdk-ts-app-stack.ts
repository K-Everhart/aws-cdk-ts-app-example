import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const key = new kms.Key(this, 'my-kms-key', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pendingWindow: cdk.Duration.days(7),
      alias: 'alias/mykey',
      description: 'KMS key for encrypting the objects in an S3 bucket',
      enableKeyRotation: false,
      policy: new iam.PolicyDocument({
        statements: [new iam.PolicyStatement({
          sid: 'Deny',
          effect: iam.Effect.DENY,
          actions: [
            'kms:*'
          ],
          resources: ['*'],
          principals: [new iam.AnyPrincipal()],
          conditions: [
            {
              'ArnNotLike': {
                'aws:PrincipalArn': [new iam.AccountRootPrincipal()],
              }
            }
          ]
        })],
      })
    });

    new cdk.CfnOutput(this, 'key-arn', {
      value: key.keyArn,
    });
  }
}
