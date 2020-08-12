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
  .option("-p, --path <path>", "Source path, default: .", "dist")
  .option(
    "-re, --readExtension <readExtension>",
    "File extension for reasing, default: .doc.js",
    ".doc.js"
  )
  .option(
    "-we, --writeExtension <writeExtension>",
    "Written files extension, default: .doc.js",
    ".doc.js"
  );

program.parse(process.argv);

const { path: srcPath, readExtension, writeExtension } = program;

const getDirectories = function (src: string, callback) {
  glob(src + "/**/*", callback);
};

getDirectories(srcPath, async function (err, res) {
  if (err) return console.log("Error", err);
  const files = res.filter((file) => file.includes(readExtension));
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
          fs.writeFileSync(file.replace(readExtension, writeExtension), jsDoc);
          r();
        })
    )
  );
});
