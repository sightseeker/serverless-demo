const sleep = async (timeout) => {
  console.log("loggingAfterSleep - start")
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const logging = async(event) => {
  const execTime = new Date();
  
  await sleep(1000);

  const timedOutTime = new Date();
  console.log(`exec -> ${execTime.getHours()}:${execTime.getMinutes()}:${execTime.getSeconds()}, timedOut -> ${timedOutTime.getHours()}:${timedOutTime.getMinutes()}:${timedOutTime.getSeconds()}`)
}

export const main = logging;