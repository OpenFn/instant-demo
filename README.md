# OpenFn & HAPI FHIR Demo

[![CircleCI](https://circleci.com/gh/OpenFn/instant-demo.svg?style=svg)](https://circleci.com/gh/OpenFn/instant-demo)

A demo of OpenFn Microservice, OpenHIM and HAPI FHIR using Instant OpenHIE.

It contains a custom instant config (in `openfn/`) which loads everything.

The `microservice` project.yaml file is located here: [`openfn/docker/config/project.yaml`](openfn/docker/config/project.yaml).

## How data gets to HAPI FHIR

Using the example payload [commcare_sample.json](fixtures/commcare_sample.json)
we send that to the configured OpenFn Microservice.

Microservice is configurated to run a job based on the shape of the incoming 
payload _see [project.yaml](openfn/docker/config/project.yaml)_.

The job `commcare-to-him` will match against this message and will be invoked
performing the following actions:

- creates a payload in the FHIR standard containing
  - a Encounter resource that contains (`contained` resource field) a Paitent resource
- sends the payload to OpenHIM
- which in turn sends the payload to HAPI FHIR

## Setting up

```
npm install -g yarn
yarn
```

## Initialising the demo

```
yarn setup
```

The `setup` step will take a while, so grab a coffee.

## Running the tests

```
yarn test
```

## Starting over

When testing this locally, you probably will at some point will want to take
everything down and start over; this can be achieved like this:

```
(cd instant && yarn docker:instant destroy core openfnHimHapi --custom-package="../openfn")
```

## Notes

- The HAPI FHIR service runs on port `3447`
- The OpenHIM channel that we go through is on port `5001`.  
  The API is identical, with the exception of a required `Authorization` header.
