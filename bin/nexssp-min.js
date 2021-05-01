#!/usr/bin/env node
const { compress } = require("../dist/min");
const { header, ok, info } = require("@nexssp/logdebug");
const { bold, yellow } = require("@nexssp/ansi");
(async () => {
  console.time(bold("@nexssp/min"));

  const [, , ...args] = process.argv;

  const from = process.argv[2] || "./src/";
  const to = process.argv[3] || "./dist/";

  const glob = process.argv[3] || "**/*.js";

  const result = await compress(from, to, { glob });
  header("Starting @nexssp/min module");
  info("Starting compression..");
  result.forEach((r) =>
    ok(
      `${bold(yellow(r.file))} ${r.length} => ${r.compressed.length} ${bold(
        "(" + r.compressed.percentage + "%)"
      )}`
    )
  );
  ok(bold("@nexssp/min -> done."));
  console.timeEnd(bold("@nexssp/min"));
})();
//    const percentage = 100 - (compressed.code.length / code.length) * 100;
// const percentageRounded = Math.round(percentage, 2);
//
