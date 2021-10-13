#!/usr/bin/env node
//#!C:\Program Files\nodejs\node_modules\npm

// У меня Windows 7
const fs = require("fs").promises
//const fs = require('fs/promises');
const { lstatSync } = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');

let currentDir = process.cwd();
console.log(currentDir);
const options = yargs
  .positional('d', {
    describe: 'Path to directory',
    default: process.cwd(),
  })
  .positional('p', {
    describe: 'Pattern',
    default: '',
  }).argv;

if (!options.d) console.log(currentDir);
else {
  currentDir = options.d;
  console.log(currentDir);
}

class ListItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }

  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

const run = async () => {
  const list = await fs.readdir(currentDir);
  const items = list.map((fileName) => {
    return new ListItem(path.join(currentDir, fileName), fileName);
  });

  const item = await inquirer
    .prompt([
      {
        name: 'fileName',
        type: 'list',
        message: `Choose: ${currentDir}`,
        choices: items.map(item => ({ name: item.fileName, value: item })),
      }
    ]).then(answer => answer.fileName);

  if (item.isDir) {
    currentDir = item.path;
    return await run();
  } else {
    const data = await fs.readFile(item.path, 'utf-8');

    if (!options.p) console.log(data);
    else {
      const regExp = new RegExp(options.p, 'igm');
      console.log(data.match(regExp));
    }
  }
};

run();