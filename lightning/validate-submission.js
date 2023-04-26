fn(state => {
  const { form } = state.data;
  if (form['@name'] == 'Register New Patient') return state;
  throw 'This is not a valid form submission.';
});
