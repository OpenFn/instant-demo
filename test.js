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

function expectOnePatient(response) {
  assert.strictEqual(response.data.total, 1, "Expected exactly one patient.");
}

const pRetry = require("p-retry");

async function expectOnePatientWith(identifier) {
  async function getPatient() {
    const response = await getPatients(identifier);
    assert.strictEqual(response.data.total, 1, `Expected exactly one patient with ${identifier}.`);

    return true;
  }

  return await pRetry(getPatient, {
    onFailedAttempt: (error) => {
      if (!(error instanceof assert.AssertionError)) {
        throw error
      }

      console.log(
        `Patient not there yet, trying again... ${error.attemptNumber}/10`
      );
    },
    retries: 10,
  });
}

(async function () {
  console.log("Waiting for Microservice to be available...");
  await isInboxAvailable();

  let response = await postToInbox(fixture("organization.json"));
  assertTrigger(response, "create-organization")

  response = await postToInbox(fixture("commcare_sample.json"));
  assertTrigger(response, "commcare-to-openhim")

  response = await postToInbox(fixture("koboCaseRegistration.json"));
  assertTrigger(response, "kobo-to-openhim")

  await expectOnePatientWith({ identifier: "C19-930020123" });
  await expectOnePatientWith({ identifier: "test_clinic-0009-01" });

  console.log("👍 Everything checks out.");
})().catch((e) => {
  if (e instanceof assert.AssertionError) {
    console.error(e.message);
    process.exitCode = 10;
  } else {
    throw e;
  }
});
