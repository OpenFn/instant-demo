fn(state => {
  const { person } = state;

  const patient = {
    resourceType: 'Patient',
    id: person.patient_id,
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
        value: person.patient_id,
      },
    ],
    name: [
      {
        use: 'official',
        family: person.last_name,
        given: [person.first_name],
      },
    ],
    gender: person.gender,
    birthDate: person.age.birthDate,
  };

  const encounter = {
    resourceType: 'Encounter',
    status: 'finished',
    subject: {
      reference: `Patient/${person.patient_id}`,
    },
  };

  const headers = {
    'Content-Type': 'application/fhir+json',
    accept: 'application/fhir+json',
  };

  return { ...state, patient, encounter, headers };
});
