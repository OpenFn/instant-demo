// Find patients with an observed viral load higher than a threshold
query(
  "SELECT P.id AS pid, P.name.family AS family, P.birthDate as birthDate, P.gender AS gender, O.id AS obs_id, OCC.`system`, OCC.code, O.status AS status, O.value.quantity.value AS value FROM Patient AS P, Observation AS O LATERAL VIEW explode(code.coding) AS OCC WHERE P.id = O.subject.PatientId AND OCC.`system` = 'http://loinc.org' AND OCC.code LIKE '856A%' AND O.value.quantity.value > 10000;"
);

// Calculate age from birthDate
fn(state => {
  const calculateAge = birthDate => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();

    // Check if the birthday has occurred this year
    if (
      today.getMonth() < birthDateObj.getMonth() ||
      (today.getMonth() === birthDateObj.getMonth() &&
        today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const uniqueIds = new Set();
  const patients = state.data.filter(patient => {
    if (!uniqueIds.has(patient.pid)) {
      uniqueIds.add(patient.pid);
      return true;
    }
    return false;
  });

  console.log(state.data.length, 'Patients before deduplicate');
  console.log(patients.length, 'Patients');
  return { ...state, data: {}, result: {}, patients };
});
