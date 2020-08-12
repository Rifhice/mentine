#!/usr/bin/env node

import { Route } from "./Routes/interfaces";
import {
  convertCustomRouteToOpenAPIJsonFormat,
  convertTsDocToYaml,
} from "./tsToYamlConverter";

const glob = require("glob");
const fs = require("fs");
const { program } = require("commander");
const path = require("path");

program
  .option("-p, --path <path>", "Source path, default: .", "src")
  .option("-r, --regex <regex>", "File regex, default: /.doc.ts/", ".*.doc.js");

program.parse(process.argv);

const srcPath = program.path;
const fileNameRegex = new RegExp(program.regex);

const getDirectories = function (src: string, callback) {
  glob(src + "/**/*", callback);
};

getDirectories(srcPath, async function (err, res) {
  if (err) return console.log("Error", err);
  const files = res.filter((file) => fileNameRegex.test(file));
  await Promise.all(
    files.map(
      (file) =>
        new Promise((r) => {
          const requiredFile = require(path.join(process.cwd(), file));
          const yaml = convertTsDocToYaml(
            convertCustomRouteToOpenAPIJsonFormat(
              Object.values(requiredFile)[0] as Route
            )
          );
          const jsDoc = `/**\n* @swagger\n${yaml
            .split("\n")
            .map((line) => `* ${line}`)
            .join("\n")}\n*/`;
          fs.writeFileSync(file, jsDoc);
          r();
        })
    )
  );
});
