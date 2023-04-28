fn(state => {
  const { patient, encounter } = state;
  console.log('Patient:', JSON.stringify(patient, null, 2));
  console.log('Encounter:', JSON.stringify(encounter, null, 2));

  console.log('Next, we will send these to a Google managed FHIR API...');
  return state;
});

// TODO, send to Google FHIR api: https://cloud.google.com/healthcare-api/docs/concepts/fhir#fhir_stores
