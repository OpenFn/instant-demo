fn(state => {
  const { form } = state.data;
  const { patient_data } = form;

  const patient = {
    body: {
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
    },
    headers: {
      'Content-Type': 'application/fhir+json',
      accept: 'application/fhir+json',
      // 'If-None-Exist': `identifier=${patient_data.patient_id}`,
    },
  };

  const encounter = {
    body: {
      resourceType: 'Encounter',
      status: 'finished',
      subject: {
        reference: `Patient/${patient_data.patient_id}`,
      },
    },
    headers: {
      'Content-Type': 'application/fhir+json',
      accept: 'application/fhir+json',
    },
  };

  return { ...state, data: { patient, encounter } };
});
