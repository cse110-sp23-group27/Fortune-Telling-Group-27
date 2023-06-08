# Setup/Building the Repo

1. Make sure node.js is installed on your machine
2. Clone the repository using the git command ```git clone https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27.git```
   1. To switch branches to a different repo, try the git command ```git checkout <branch name>```
   2. To update the current repo you are on with the main branch try: ```git fetch``` and then ```git rebase origin/main```
3. In the root directory, run ```npm ci``` in the terminal to install all required dependencies. (DO NOT RUN NPM INSTALL unless `npm ci` does not work)
   1. Optionally, also run ```npm ci --save-dev eslint eslint-config-google``` to install the required google config (only if google config not recognized)
   2. If ```npm ci``` does not work, you can try running `npm install`, but do not push the changes made in package-lock.json or package.json
4. There are multiple commands in the package.json file that you can run.
   1. ```npm run lint``` runs ESLint on the assets directory and the jest_tests directory
   2. ```npm run docs``` runs JSDocs on the assets/scripts directory and the jest_tests directory, and generates documentation in specs/documentation/generated.(DO NOT RUN THIS COMMAND LOCALLY)
   3. ```npm run test``` runs all Jest unit tests and E2E tests
   4. ```npm run GHtest``` runs all the Jest Unit tests
   5. Run `git pull` every time before you make a change to a branch that was recently checked out, and after every time you push to a remote branch run `git pull` to get the changes that the automated JSDocs generation or linters may have made to your code in GitHub actions.

## Notes:

All scripts ignore files in the root directory and the .github folder and node modules folder

If you have folders generated from libraries after running `npm ci`, then make sure you do not push them (they should be in .gitignore file at the root)

When adding JSLint code, please add code only in the /assets directory or the /scripts directory, as ESLint does not check outside of those two directories

Please refer to the code style [document](/specs/documentation/codestyle.md) when styling code

Do not push changes in package-lock.json or package.json unless you are working on pipeline.

MAKE SURE THE LIVESERVER PORT IS SET TO 5500, OTHERWISE THE E2E TESTS WILL NOT WORK UNLESS YOU REPLACE THE URL.

You can set the liveserver port for this repository by creating a .vscode folder in the root of this repository and creating a settings.json file inside of it. 

Inside settings.json put:

```
{
    "liveServer.settings.port": 5500
}
```

## Regarding config files in root

.eslintignore is the equivalent of .gitignore but for ESLint, so ESLint ignores those directories

.eslintrc.js is the configuration file of ESLint, that details our code rules

.gitignore ignores certain files and directories when adding changes

babel.config.js is the configuration file for babel (converting ECMA script to JS for unit test usage)

conf.json is the configuration file for JSdocs.

jest-puppeteer.config.js is the configuration file for jest puppeteer (E2E tests)

jest.unit.config.js is the configuration file for running only unit tests in jest

.codeclimate.yml is the configuration file for code climate (which checks code quality)

package.json and package-lock.json store all the dependencies required for pipeline (ESlint, jest tests, JSDocs).

# Pipeline steps
## This process should be run when you are finished with code that resolves an issue defined in GitHub issues


1. Pull latest changes from main branch and the branch you are working on
2. Resolve merge conflicts with the branch if necessary
3. Run the defined commands in the package.json file locally (```npm run lint```, etc), and if errors occur regarding linter syntax try to fix them if they are not automatically fixed (Note: do not run ```npm run docs``` locally, let GitHub Actions handle that).
4. Add unit tests if necessary for your code (at your own discretion), as well as necessary inline comments
5. Add E2E tests for your code if necessary (if your code implements a new function that has not been tested yet).
7. Push to the repo
   1. If the build run by GitHub Actions fails, try to fix it in your local repo and restart this process again.
   2. Make sure to pull from your branch as well in case GitHub Actions made any changes to your repo (regarding documentation or syntax)
8. Create a pull request to merge into the main branch 
   1. Assign the pull request to the issue it resolves
   2. Code climate will also check your code, try to resolve any issues it finds
   3. Assign a reviewer to your code
   4. Resolve merge issues with main if needed
9. Reviewers will review code and merge if it's good, otherwise they will let you know what doesn't work and restart this pipeline process when the issue is fixed
10. Deployment - Github Pages will automatically deploy index.html as a GitHub Action.
11. Remove the working branch that was merged with main (pruning)

UPDATED 6/6/2023
