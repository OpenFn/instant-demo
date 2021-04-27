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

// curl --location --request POST 'http://10.0.0.25:3447/fhir/Organization' \
//   --header 'Content-Type: application/json' \
//   --data-binary '@fixtures/organisation.json'

function postOrganization(path) {
  return hapiFhir
    .post("Organization", fs.readFileSync(path, "utf8"))
    .catch(verboseCatch);
}

function postPatient(path) {
  return hapiFhir
    .post("Patient", fs.readFileSync(path, "utf8"))
    .catch(verboseCatch);
}

(async function () {
  let response = await postOrganization("fixtures/organization.json");
  console.dir(response.data);

  response = await postPatient("fixtures/patient.json");
  console.dir(response.data);
})();
