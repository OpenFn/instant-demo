const axios = require("axios").default;
const fs = require("fs");

const host = process.env["TARGET_HOST"] || "localhost";
const fhirBaseUrl = `http://${host}:3447/fhir`;

// HAPI FHIR REST Client
const hapiFhir = axios.create({
  baseURL: fhirBaseUrl,
  headers: { "Content-Type": "application/json" },
  responseType: "json",
});

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

// curl --location --request POST 'http://localhost:3447/fhir/Organization' \
//   --header 'Content-Type: application/json' \
//   --header 'If-None-Exist: identifier=Gastro' \
//   --data-binary '@fixtures/organization.json'

function postOrganization(data, uniqueIdentifier) {
  const headers = uniqueIdentifier ? { "If-None-Exist": uniqueIdentifier } : {};

  return hapiFhir
    .post("Organization", data, { headers })
    .catch(warnVersionConflict)
    .catch(verboseCatch);
}

function postPatient(data, uniqueIdentifier) {
  const headers = uniqueIdentifier ? { "If-None-Exist": uniqueIdentifier } : {};

  return hapiFhir
    .post("Patient", data, { headers })
    .catch(warnVersionConflict)
    .catch(verboseCatch);
}

(async function () {
  const organization = fs.readFileSync("fixtures/organization.json", "utf8");
  let response = await postOrganization(organization, "identifier=Gastro");
  console.dir(response.data);

  const patient = fs.readFileSync("fixtures/patient.json", "utf8");
  response = await postPatient(patient, "identifier=12345");
  console.dir(response.data);
})();
