fn(state => {
  const { patient_data } = state.data.form;

  const attributes = [
    { attribute: 'w75KJ2mc4zz', value: patient_data.age.first_name },
    {
      attribute: 'zDhUuAYrxNC',
      value: patient_data.age.last_name,
    },
    { attribute: 'cejWyOfXge6', value: patient_data.age.gender },
  ];

  const patientMapping = {
    orgUnit: 'g8upMTyEZGZ',
    trackedEntityType: 'nEenWmSyUEp',
    attributes,
  };

  return { ...state, patientMapping };
});

create('trackedEntityInstances', state => state.patientMapping);
