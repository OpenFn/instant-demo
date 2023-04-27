fn(state => {
  const { patient, encounter } = state;
  console.log('Patient:', patient);
  console.log('Encounter:', encounter);

  console.log('Next, we will send these to a Google managed FHIR API...');
  return state;
});

// TODO, send to Google FHIR api: https://cloud.google.com/healthcare-api/docs/concepts/fhir#fhir_stores
