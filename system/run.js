#!/usr/bin/env node

const command = process.argv.slice(2, 3)[0];

const args = process.argv.slice(3, process.argv.length);

if (command) {
  const split = command.split(".");
  const moduleName = split[0];
  const moduleMethodName = split[1];

  const byteforgeModule = require(`./modules/${moduleName}`);

  const moduleMethod = moduleMethodName ? byteforgeModule[moduleMethodName] : byteforgeModule;

  if (!moduleMethod) {
    return console.error(`Module ${moduleName} does not have the method ${moduleMethodName}`);
  } 

  moduleMethod.apply(null, args);
} else {
  console.error(`Invalid command`)
}
