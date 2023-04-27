fn(state => {
  const { patient_data } = state.data.form;

  const patient = {
    resourceType: 'Patient',
    id: patient_data.patient_id,
    identifier: [
      {
        use: 'usual',
        type: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
              code: 'MR',
            },
          ],
        },
        system: 'urn:oid:0.1.2.3.4.5.6.7',
        value: patient_data.patient_id,
      },
    ],
    name: [
      {
        use: 'official',
        family: patient_data.age.last_name,
        given: [patient_data.age.first_name],
      },
    ],
    gender: patient_data.age.gender,
    birthDate: patient_data.age.birthDate,
  };

  const encounter = {
    resourceType: 'Encounter',
    status: 'finished',
    subject: {
      reference: `Patient/${patient_data.patient_id}`,
    },
  };

  const headers = {
    'Content-Type': 'application/fhir+json',
    accept: 'application/fhir+json',
  };

  return { ...state, patient, encounter, headers };
});
