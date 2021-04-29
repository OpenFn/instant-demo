post("Encounter", {
  body: fields(
    field("resourceType", "Encounter"),
    field("status", "finished"),
    field("contained", [
      fields(
        field("resourceType", "Patient"),
        field("id", dataValue("$form.patient_data.patient_id")),
        field("identifier", [
          {
            use: "usual",
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "MR",
                },
              ],
            },
            system: "urn:oid:0.1.2.3.4.5.6.7",
            value: dataValue("$form.patient_data.patient_id"),
          },
        ]),
        field("name", [
          {
            use: "official",
            family: dataValue("$form.patient_data.age.last_name"),
            given: [dataValue("$form.patient_data.age.first_name")],
          },
        ]),
        field("gender", dataValue("$form.patient_data.age.gender")),
        field("birthDate", dataValue("$form.patient_data.age.birthDate"))
      ),
    ])
  ),
  headers: {
    "Content-Type": "application/json",
    Authorization: "Custom test",
    "If-None-Exist": (state) =>
      `identifier=${dataValue("$form.patient_data.patient_id")(state)}`,
  },
});