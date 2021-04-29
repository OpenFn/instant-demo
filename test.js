const fs = require("fs");
const assert = require("assert");

const { getPatients, postToInbox, isInboxAvailable } = require("./clients");

function fixture(path) {
  return fs.readFileSync(`fixtures/${path}`, "utf8"); 
}

function assertTrigger(response, trigger) {
  assert.strictEqual(
    response.data.data[0],
    trigger,
    `Payload didn't match the ${trigger} trigger`
  );
  
}

(async function () {
  console.log("Waiting for Microservice to be available...");
  await isInboxAvailable();

  let response = await postToInbox(fixture("organization.json"));
  assertTrigger(response, "create-organization")

  response = await postToInbox(fixture("patient.json"));
  assertTrigger(response, "create-patient")

  response = await postToInbox(fixture("commcare_sample.json"));
  assertTrigger(response, "commcare-to-openhim")


  // TODO: check for all patients... and work out why this is failing currently
  //       I think I'm not doing the lookup/identifier thing correctly.
  response = await getPatients({ identifier: 12345 });

  assert.strictEqual(
    response.data.total,
    1,
    "Expected exactly one patient with identifier of 12345."
  );

  console.log("👍 Everything checks out.");
})().catch((e) => {
  if (e instanceof assert.AssertionError) {
    console.error(e.message);
    process.exitCode = 10;
  } else {
    throw e;
  }
});
