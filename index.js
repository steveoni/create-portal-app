#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const argv = require('minimist')(process.argv.slice(2));

const {cloneRenameRepo,install} = require("./utils");
const path = require('path');

async function init(argv){

  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('Portal.JS', {horizontalLayout: 'full'})
    )
  );
 
  const fname = argv._[0]
  if(!fname){
    console.log(
      chalk.red('specify folder name')
    );
    process.exit(1)
  }

  let f_path = [process.cwd(), fname].join(path.sep);
  console.log(
    chalk.cyan(`Creating Portaljs-app in ${f_path}`)
  );

  //check package
  let package;
  if(argv['use-npm']){
    package = "npm"
  }else if(argv["use-yarn"]){
    package = "yarn";
  }else{
    package = "npm";
  }

  const clone = await cloneRenameRepo(fname);
  console.log(clone);

  const installPackage = await install(fname, package);
  console.log(installPackage)

  console.log(
    chalk.cyan('Your app is ready')
  )

}

init(argv);