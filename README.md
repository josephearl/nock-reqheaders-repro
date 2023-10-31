# Nock reqheaders in mock method to do not work

To reproduce:

```shell
npm install
npm test
```

The third test will fail with:

> Received promise resolved instead of rejected

Expected:

The third test passes, because `undefined` is a valid value for `requestBody`.
