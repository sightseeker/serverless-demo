import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import logging from '@functions/logging';

const serverlessConfiguration: AWS = {
  service: 'apigateway-lambda-demo',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
    runtime: 'nodejs14.x',
    iamRoleStatements:[
      {
        Effect:'Allow',
        Action:'lambda:InvokeFunction',
        Resource:[
          'arn:aws:lambda:${self:provider.region}:*:function:apigateway-lambda-demo-${self:provider.stage}-*'
        ]
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      IS_LOCAL: '${env:IS_LOCAL}'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, logging },
};

module.exports = serverlessConfiguration;
