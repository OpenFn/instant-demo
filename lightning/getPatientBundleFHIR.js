// Get patient resource bunlde
get('Bundle/c393585c-1f5d-4eab-b19e-2c51bdce0d11', {}, state => {
  const patientResource = state.data;
  return { ...state, data: {}, response: {}, references: [], patientResource };
});

// Create new patents in HAPI FHIR
// createTransactionBundle(state => state.patientResource);
