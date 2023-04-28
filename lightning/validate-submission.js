fn(state => {
  const { form } = state.data;
  if (form['@name'] !== 'Register New Patient')
    throw 'This is not the right intake form!';

  return { ...state, person: form.patient_data };
});
