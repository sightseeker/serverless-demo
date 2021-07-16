import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';

const SERVICE_NAME = 'apigateway-lambda-demo';
const LOGGING_FUNCTION_NAME = "logging";

const hello = async (event) => {
  const execTime = new Date();
  console.log(`IS_LOCAL: ${process.env.IS_LOCAL}`);
  const lambda = new AWS.Lambda({
    endpoint: process.env.IS_LOCAL === 'true' ? 'http://localhost:3002' : 'https://lambda.ap-northeast-1.amazonaws.com'
  });
  const loggingLambdaParam = {
    FunctionName: `${SERVICE_NAME}-dev-${LOGGING_FUNCTION_NAME}`,
    InvocationType: 'Event',
    Payload: JSON.stringify({"execTime": execTime.getTime()})
  }
  const result = await lambda.invoke(loggingLambdaParam).promise();
  console.log(`Invoke Logging Lambda Function result: ${JSON.stringify(result)}`)

  const res = formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world! At ${execTime}`
  });
  return res;
}

export const main = middyfy(hello);

