# README.md

    

## install

```bash
yarn add err-cause
yarn-tool add err-cause
yt add err-cause
```

https://github.com/tc39/proposal-error-cause

```typescript
test(`isSupportedErrorCause: node = ${process.versions.node}, v8 = ${process.versions.v8}`, () =>
{

	let actual = isSupportedErrorCause();
	let expected = gte(process.versions.node, '16.9.0') ? true : expect.any(Boolean);

	console.log(`isSupportedErrorCause = ${actual}`)

	expect(actual).toEqual(expected);

});

test(`errCause`, () =>
{
	const cause = new Error();
	const err = new Error();

	let actual = errCause(err, cause);

	expect(actual).toHaveProperty('cause', cause);

});
```