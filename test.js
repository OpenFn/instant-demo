const fs = require("fs");
const assert = require("assert");

const { getPatients, postToInbox, isInboxAvailable } = require("./clients");

(async function () {
  console.log("Waiting for Microservice to be available...");
  await isInboxAvailable();

  const organization = fs.readFileSync("fixtures/organization.json", "utf8");
  let response = await postToInbox(organization);

  assert.strictEqual(
    response.data.data[0],
    "create-organization",
    "Payload didn't match the create-organization trigger"
  );

  const patient = fs.readFileSync("fixtures/patient.json", "utf8");
  response = await postToInbox(patient);

  assert.strictEqual(
    response.data.data[0],
    "create-patient",
    "Payload didn't match the create-patient trigger"
  );

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
