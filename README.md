# @nexssp/min

## Installation

```sh
npm i @nexssp/min -D # install for devDependencies
```

Just **FAST** minify/compress src to dist folder by one command.

![image](https://user-images.githubusercontent.com/53263666/116790584-3e8a8500-aab5-11eb-9aee-dee90f7ae5cb.png)

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
