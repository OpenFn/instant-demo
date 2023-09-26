//We use fn() when we want to manipulate/transform the data using JavaScript
fn(state => {
  const today = new Date().toISOString().slice(0, 10);

  return { ...state, today };
});

//Using the DB data, we want to submit new data values to report on the key dataElement
create('dataValueSets', {
  dataSet: 'OsPTWNqq26W', //TB/HIV (VCCT) monthly summary
  completeDate: sourceValue('$.today'), //TODO: return today's date in format '2023-03-10'
  period: '202308', //Aug 2023 || Confirm this exisit in DHIS2
  orgUnit: 'DiszpKrYNg8', //Ngelehun CHC | TODO Update this value to TB/HIV (VCCT) monthly summary
  dataValues: [
    {
      dataElement: 'pikOziyCXbM', //# of OPV doses given || Aleksa will share a new dataElement Id
      value: sourceValue('$.patientsCount'), //TODO: return SUM # of 'opv_doses_given' across ALL patients where age < 1 year
    },
  ],
});

// ds=OsPTWNqq26W&pe=202308&ou=DiszpKrYNg8&multiOu=false
