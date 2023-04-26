fn(state => {
  const { patient, encounter } = state;
  console.log('Patient', patient);
  console.log('Encounter', encounter);

  return state;
});

// post('blah.com');
