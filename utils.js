const chalk = require('chalk');
// const figlet = require('figlet');
const shell = require('shelljs');
const CLI = require('clui');
const path = require('path');
const { count } = require('console');
const { reject } = require('lodash');

const Spinner = CLI.Spinner;


/**
 * Clone repo from github and rename the folder
 * @param {*} fname  -> file name
 */
function cloneRenameRepo(fname){
  return new Promise((resolve, rejection)=>{
    let countdown = new Spinner('cloning and renaming.. ',['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);

    countdown.start();
    const path = process.cwd();
    shell.exec(
      `cd ${path} && git clone https://github.com/datopian/portal.js && mv portal.js/packages/portal ${fname} && rmf -f portal.js`,
      ()=>{
        
        countdown.stop()
        resolve(chalk.green('template downloaded'))
      }
    );


  })
}

/**
 * Install package needed for the project using
 * specified package manager either Yarn or NPM
 * @param {*} fname 
 * @param {*} package 
 */
function install(fname, package){
  return new Promise((resolve, rejection)=>{
    const parent_path = process.cwd();
    const file_path = [parent_path, fname].join(path.sep)
    console.log(chalk.yellow(`Installing app package with ${package}`))
    let countdown = new Spinner('npm installing.. ',['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);

    countdown.start();
    shell.exec(
      `cd ${file_path} && ${package} ${package == "npm"? "install" : ''}`
      ,
      (data, stdout, stderr)=>{

        if(stderr){
          rejection(chalk.red(stderr));
        }else{
          resolve(chalk.cyan(`Packages installed with ${package}`));
        }
        countdown.stop()
      }
    );
  }).catch(e=> console.log(e));
}

module.exports = {
  cloneRenameRepo: cloneRenameRepo,
  install: install,
  
}