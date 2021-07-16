import middy from "@middy/core"
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler) => {
  return middy(handler)
    .use(doNotWaitForEmptyEventLoop({runOnError:true}))
    .use(middyJsonBodyParser())
}
