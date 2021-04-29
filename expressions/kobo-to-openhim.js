post("Encounter", {
  body: fields(
    field("resourceType", "Encounter"),
    field("status", "finished"),
    field("contained", [
      fields(
        field("resourceType", "Patient"),
        field("id", dataValue("$body.Godata_ID")),
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
            value: dataValue("$body.Godata_ID"),
          },
        ]),
        field("name", [
          {
            use: "official",
            text: dataValue("$body.Patient_name"),
          },
        ]),
        field("gender", dataValue("$body.Sex")),
        field("birthDate", (state) => {
          const year =
            Intl.DateTimeFormat("en", { year: "numeric" }).format() -
            Number(dataValue("$body.Age_in_year")(state));
          return `${year}-01-01`;
        })
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
