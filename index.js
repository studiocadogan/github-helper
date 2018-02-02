require('dotenv').config()
const GithubApi=require("github");
const readline = require('readline');
const chalk = require('chalk');

const github=new GithubApi({debug:false});

const GITHUB_TOKEN=process.env.GITHUB_TOKEN;

console.log("Using Github token:",GITHUB_TOKEN);

github.authenticate({
    type: 'token',
    token: GITHUB_TOKEN
  });



const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});


rl.question(chalk.blue('Repo name?\n'), (inputRepoName) => {
    // TODO: Log the answer in a database
    console.log(chalk.blue(`Create repo: ${inputRepoName}`));

    github.repos.create({
        name:inputRepoName,
        auto_init:true,
        private:true
    },function(err,res){
        if (err){
            console.error(chalk.red("Failed to create repository!"));
          
            const e=JSON.parse(err);

            console.error(chalk.red(e.errors[0].message));
            return;
        }
        console.log(chalk.green(`Successfully created repository: http://github.com/studiocadogan/${inputRepoName}`));
        
    });


    rl.close();
});