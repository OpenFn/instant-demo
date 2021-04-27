# OpenFn & HAPI FHIR Demo

A demo of OpenFn Microservice, OpenHIM and HAPI FHIR using Instant OpenHIE.

It contains a custom instant config (in `openfn/`) which loads everything.

The `microservice` project.yaml file is located here: [`openfn/docker/config/project.yaml`](openfn/docker/config/project.yaml).

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
