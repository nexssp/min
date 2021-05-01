# @nexssp/min

I want just to minify src to dist folder by one command.

## Installation

```sh
npm i @nexssp/min -D # install for devDependencies
```

## CLI or package.json

```sh
npx @nexssp/min # it will just compress js files from ./src/ to ./dist/
npx @nexssp/min ./source/ ./destination/ # change source and destination
```

## API Example

```js
const { compress } = require("@nexssp/min");

(async () => {
  const result = await compress(from, to, { glob });

  result.forEach((r) =>
    ok(
      `${bold(yellow(r.file))} ${r.length} => ${r.compressed.length} ${bold(
        "(" + r.compressed.percentage + "%)"
      )}`
    )
  );
})();
```
