# Kardashian

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Installing

TODO. Will be a npm package

## Defining a model

All Kardashian models are .json files with the following structure:

```json
{
  "model": {
    // Any keys and values
  },
  "mandatory" : [
    "strings",
    "corresponding",
    "to",
    "modelKeys"
  ]
}
```

For mandatory keys, nesting is not supported.

## Creating a fake

Add your json models on the preferred folder. By default, Kardashian looks for them in a `kardashian` folder at the same level you are executing your test script.

On your tests, import the kardashian library like any other npm module

```javascript
const kardashian = require('kardashian');
```

Add create copies using the `fake` function:

```javascript
const result = await kardashian.fake('model_name', './optional/folder/route/kardashian');
```

The result follows this schema

```javascript
{
  faked: {
    // Basically the model
  },
  mandatory: {
    // Only the model's mandatory pairs key-value
  }
}
```
