// create('Bundle', state => state.patientResource);
// fn(state => {
//   console.log(JSON.stringify(state.data, null, 2));
//   return state;
// });

create('Bundle', state => ({...state.data, type: 'collection' }));
// create('', state => ({...state.data, type: 'transaction' }));

// create('Bundle', state => {
//   const { data } = state;
//   delete data.link;
//   delete data.total;
//   const { resourceType, entry } = data;

//   const payload = {
//     resourceType,
//     // entry: entry.map(i => ({ fullUrl: i.fullUrl, resource: i.resource })),
//     entry,
//     type: 'collection',
//   };

//   // console.log(JSON.stringify(payload, null, 2));

//   return payload;
// });
