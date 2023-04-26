fn(state => {
  const { patient, encounter } = state.data;

  return { ...state, patient, encounter };
});

fn(state => {
  return post('Patient', state.patient, state => {
    const { encounter } = state;

    encounter.body.subject.reference = `Patient/${state.data.id}`;
    return { ...state, encounter };
  })(state);
});

fn(state => {
  const { encounter } = state;

  return post('Encounter', encounter)(state);
});
