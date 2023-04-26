fn(state => {
  const { patient, encounter } = state;
  console.log('Patient', patient);
  console.log('Encounter', encounter);
});

post("blah.com")
