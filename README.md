# test rollup / typescript map path generation

```shell
$ npx tsc
```

This outputs sources with correct relative links:

```shell
$ jq . dist/background.js.map
```

```json
{
  "version": 3,
  "file": "background.js",
  "sourceRoot": "",
  "sources": [
    "../src/WebExtension/background.ts"
  ],
  "names": [],
  "mappings": ";AAEA,OAAO,CAAC,OAAO,CAAC,WAAW,CAAC,WAAW,CAAC,GAAG,EAAE;IACzC,OAAO,CAAC,GAAG,CAAC,4BAA4B,CAAC,CAAC;AAC9C,CAAC,CAAC,CAAC"
}

```



