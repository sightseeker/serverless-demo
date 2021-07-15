import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  setTimeout(()=>{
    console.log("timed out")
  }, 3000)
  return formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world!`
  });
}

export const main = middyfy(hello);
