//We use fn() when we want to manipulate/transform the data using JavaScript
fn(state => {
  const today = new Date().toISOString().slice(0, 10);
  const { femalePatients, malePatients } = state;

  const isBetween = (value, range) => {
    const [minValue, maxValue] = range.split('-');
    return value >= minValue && value <= maxValue;
  };

  const uniqueCount = patients => {
    const uniqueIds = new Set(); // A Set to keep track of unique IDs
    return patients.filter(patient => {
      if (!uniqueIds.has(patient.pid)) {
        uniqueIds.add(patient.pid);
        return true;
      }
      return false;
    }).length;
  };

  const patientsCount = (patients, condition, ageGroup) => {
    switch (condition) {
      case '<':
        return uniqueCount(patients.filter(patient => patient.age < ageGroup));

      case '>':
        return uniqueCount(patients.filter(patient => patient.age > ageGroup));
      case '..':
        return uniqueCount(
          patients.filter(patient => isBetween(patient.age, ageGroup))
        );
    }
  };

  const femaleAt15y = patientsCount(femalePatients, '<', 15);
  const femaleFrom15To24y = patientsCount(femalePatients, '..', '15-24');
  const maleFrom15To24y = patientsCount(malePatients, '..', '15-24');
  const femaleFrom25To49y = patientsCount(femalePatients, '..', '25-49');
  const maleFrom25To49y = patientsCount(malePatients, '..', '25-49');
  const maleAt15y = patientsCount(malePatients, '<', 15);
  const femaleAt49y = patientsCount(femalePatients, '>', 49);
  const maleAt49y = patientsCount(malePatients, '>', 49);

  const dataValues = [
    {
      categoryOptionCombo: 'qNCMOhkoQju',
      dataElement: 'srXmZTeJxxT',
      value: femaleAt15y,
    },
    {
      categoryOptionCombo: 'LbeIlyHEhKr',
      dataElement: 'srXmZTeJxxT',
      value: femaleFrom15To24y,
    },
    {
      categoryOptionCombo: 'qa0VqgYlgtN',
      dataElement: 'srXmZTeJxxT',
      value: femaleFrom25To49y,
    },
    {
      categoryOptionCombo: 'rCMUTmcreqP',
      dataElement: 'srXmZTeJxxT',
      value: femaleAt49y,
    },

    {
      categoryOptionCombo: 'TkDhg29x18A',
      dataElement: 'srXmZTeJxxT',
      value: maleAt15y,
    },
    {
      categoryOptionCombo: 'zPpvbvpmkxN',
      dataElement: 'srXmZTeJxxT',
      value: maleFrom15To24y,
    },
    {
      categoryOptionCombo: 'uX9yDetTdOp',
      dataElement: 'srXmZTeJxxT',
      value: maleFrom25To49y,
    },
    {
      categoryOptionCombo: 'GuJESuyOCMW',
      dataElement: 'srXmZTeJxxT',
      value: maleAt49y,
    },
  ];

  return { ...state, today, dataValues };
});

// Load datavalue sets using dhis2's version of "UPSERT" (see `importStrategy`)
create(
  'dataValueSets',
  state => ({
    dataSet: 'OsPTWNqq26W', //TB/HIV (VCCT) monthly summary
    completeDate: state.today,
    period: '202308', //Aug 2023
    orgUnit: 'DiszpKrYNg8', //Ngelehun CHC
    dataValues: state.dataValues,
  }),
  {
    importStrategy: 'CREATE_AND_UPDATE',
  }
);
