const axios = require("axios").default;
const fs = require("fs");
const url = require("url");
const pRetry = require("p-retry");

const host = process.env["TARGET_HOST"] || "localhost";

// ====================== FHIR via OpenHim =====================================

const openHimFhirBaseUrl = `http://${host}:5001/fhir`;

// HAPI FHIR via OpenHIM Client
const openHimFhir = axios.create({
  baseURL: openHimFhirBaseUrl,
  headers: { "Content-Type": "application/json", Authorization: "Custom test" },
  responseType: "json",
});

// curl --location --request POST 'http://localhost:3447/fhir/Organization' \
//   --header 'Content-Type: application/json' \
//   --header 'If-None-Exist: identifier=Gastro' \
//   --data-binary '@fixtures/organization.json'

function postOrganization(data, uniqueIdentifier) {
  const headers = uniqueIdentifier ? { "If-None-Exist": uniqueIdentifier } : {};

  return openHimFhir
    .post("Organization", data, { headers })
    .catch(warnVersionConflict)
    .catch(verboseCatch);
}

function postPatient(data, uniqueIdentifier) {
  const headers = uniqueIdentifier ? { "If-None-Exist": uniqueIdentifier } : {};

  return openHimFhir
    .post("Patient", data, { headers })
    .catch(warnVersionConflict)
    .catch(verboseCatch);
}

function getPatients(search) {
  const params = new url.URLSearchParams(search);

  return openHimFhir.get(`Patient?${params.toString()}`).catch(verboseCatch);
}

// ====================== OpenFn Microservice ==================================

const microserviceBaseUrl = `http://${host}:4001/`;

// HAPI FHIR via OpenHIM Client
const microservice = axios.create({
  baseURL: microserviceBaseUrl,
  headers: { "Content-Type": "application/json" },
  responseType: "json",
});

async function postToInbox(body) {
  return await microservice.post("inbox", body).catch(verboseCatch);
}

async function isInboxAvailable() {
  function getIndex() {
    return microservice.get("");
  }

  const result = await pRetry(getIndex, {
    onFailedAttempt: (error) => {
      console.log(
        `Attempt ${error.attemptNumber}/10 failed.`
      );
    },
    retries: 10,
  });
}

// ============================ Utils ==========================================

function verboseCatch(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
  throw error;
}

function warnVersionConflict(error) {
  if (error.response && error.response.status == 412) {
    console.warn("⚠ Got 412, already exists.");
    return error.response;
  }

  throw error;
}

// ============================ FHIR Methods ===================================

module.exports = {
  postOrganization,
  postPatient,
  getPatients,
  postToInbox,
  isInboxAvailable,
};
