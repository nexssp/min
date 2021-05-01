const { minify } = require("terser");
const fs = require("fs").promises;
const { error } = require("@nexssp/logdebug");

const file = async (file, dest, options = {}) => {
  // console.log(`converting file: ${file}`);

  const code = await fs.readFile(file).catch((e) => console.error(e));
  if (!code) {
    console.log(`File can't be converted: ${file}`);
    process.exitCode = 1;
  } else {
    const codeString = code.toString();
    options.parse = {
      bare_returns: true,
    };

    const compressed = await minify(codeString, options);
    const destination = file.replace("./src/", dest);

    if (file === destination) {
      error("You cannnot overwrite files with @nexssp/min.");
      process.exit(1);
    }

    const destFolder = require("path").dirname(destination);

    if (!require("fs").existsSync(destFolder)) {
      await fs.mkdir(destFolder);
    }

    const percentage = 100 - (compressed.code.length / code.length) * 100;
    const percentageRounded = Math.round(percentage, 2);

    await fs.writeFile(destination, compressed.code);

    return {
      file,
      dest: destination,
      length: codeString.length,
      compressed: {
        percentage: percentageRounded,
        length: compressed.code.length,
      },
    };
  }
};

const compress = async (
  sourceFolder = "./src/",
  distFolder = "./dist/",
  options = {} //glob,
) => {
  options.glob = options.glob || "**/*.js";

  if (!sourceFolder.endsWith("/") && !sourceFolder.endsWith("\\")) {
    error("Source folder must contain at the end '/' eg: ./src/");
    process.exit(1);
  }

  if (distFolder.includes("src/")) {
    error(
      "You cannot overwrite your source files. Change source to something different then ./src/ or src/"
    );
    process.exit(1);
  }

  if (!distFolder.endsWith("/") && !distFolder.endsWith("\\")) {
    error("Dist folder must contain at the end '/' eg: ./dist/");
    process.exit(1);
  }

  if (sourceFolder !== distFolder) {
    const fg = require("fast-glob");
    const p = `${sourceFolder}${options.glob}`.replace(/\\/g, "/");
    const files = await fg([p]);
    const result = await Promise.all(
      files.map(async (f) => file(`${f}`, distFolder))
    );

    return result;
  } else {
    error(
      "You cannnot overwrite files. You could lost your work. Change destination folder name."
    );
    process.exit(1);
  }
};

module.exports = { file, compress };
