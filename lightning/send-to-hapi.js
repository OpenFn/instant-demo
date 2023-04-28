// We first add the patient and extract the new ID.
post(
  'Patient',
  {
    headers: state => state.headers,
    body: state => state.patient,
  },
  state => {
    const { encounter } = state;
    encounter.subject.reference = `Patient/${state.data.id}`;

    return { ...state, encounter };
  }
);

// Then use the returned ID to create an encounter.
post('Encounter', {
  headers: state => state.headers,
  body: state => state.encounter,
});
