# Setup/Building the Repo

1. Make sure `node.js` is installed on your machine
2. Clone the repository using the git command ```git clone https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27.git```
   1. To switch branches to a different repo, try the git command ```git checkout <branch name>```
   2. To update the current repo you are on with the `main` branch try: ```git fetch``` and then ```git rebase origin/main```
3. In the root directory, run ```npm ci``` in the terminal to install all required dependencies. (DO NOT RUN NPM INSTALL unless `npm ci` does not work)
   1. Optionally, also run ```npm ci --save-dev eslint eslint-config-google``` to install the required google config (only if google config not recognized)
   2. If ```npm ci``` does not work, you can try running `npm install`, but do not push the changes made in `package-lock.json` or `package.json`
4. There are multiple commands in the package.json file that you can run.
   1. ```npm run lint``` runs ESLint on the assets directory and the `jest_tests` directory
   2. ```npm run docs``` runs JSDocs on the  `assets/scripts directory` and the `jest_tests` directory, and generates documentation in `specs/documentation/generated`. (DO NOT RUN THIS COMMAND LOCALLY)
   3. ```npm run test``` runs all Jest unit tests and E2E tests
   4. ```npm run GHtest``` runs all the Jest Unit tests
   5. Run `git pull` every time before you make a change to a branch that was recently checked out, and after every time you push to a remote branch run `git pull` to get the changes that the automated JSDocs generation or linters may have made to your code in GitHub actions.

# Pipeline Steps
 **This process should be run when you are finished with code that resolves an issue defined in GitHub issues.**


1. Pull latest changes from `main` branch and the branch you are working on
2. Resolve merge conflicts with the branch if necessary
4. Run the defined commands in the package.json file locally (```npm run lint```, `npm run test`), and if errors occur regarding linter syntax try to fix them if they are not automatically fixed (Note: do not run ```npm run docs``` locally, let GitHub Actions handle that).
5. Make sure liveserver of `index.html` is running and the port is set to `5500` when running `npm run test`. Basically make sure your liveserver url is set to `http://127.0.0.1:5500/index.html` and if it's not check the path of your IDE and make sure you are in the root of the project repo.
6. Add unit tests if necessary for your code (at your own discretion), as well as necessary inline comments
7. Add E2E tests for your code if necessary (if your code implements a new feature that has not been tested yet).
8. Push to the repo when ESLint (`npm run lint`) and the tests (`npm run test`) all pass
   i. If the build run by GitHub Actions fails, try to fix the errors in your local repo and restart this process again.
   ii. GitHub Actions on push runs ESLint, Super Linter (regarding css styling), and Jest Unit Tests.
   iii. Make sure to pull from your branch as well in case GitHub Actions made any changes to your repo (regarding style syntax)
8. Create a pull request to merge into the `main` branch when all GitHub Actions pass
   i. Assign the pull request to the issue it resolves (if it was meant to resolve an issue)
   ii. Another GitHub actions will run on the pull request that generates documentation using JSDocs and reports unit test coverage to CodeClimate 
   iii. CodeClimate will also check your code for duplication or code complexity, try to resolve any issues it finds
   iv. Assign a reviewer to your code in the pull request
   v. Resolve merge issues with `main` if needed
9. The reviewer will manually checkout to your branch and check your changes (using liveserver to run through the project, and running `npm run test`).
10. They will also merge the code with `main` locally to see if the code breaks with any pre-existing code in `main`.
11. If there are merge conflicts the reviewer cannot fix, they will have you resolve those merge conflicts.
12. Reviewers will finish reviewing code by approving it by using the GitHub approve pull request feature, or requesting a change through GitHub.
13. Another GitHub action will run (the testing GitHub action) that only runs Jest Unit Tests on the `main` branch.
14. Deployment - Github Pages will automatically deploy `index.html` as a GitHub Action.
15. The reviewer will remove the working branch that was merged with `main` (pruning) unless you let them know that you want to keep working on that branch.
16. Upon a pull request being successfully merged into the `main` branch, another GitHub Action will run a unit test coverage tool Istanbul and the Code Climate reporter program to gather information on unit test coverage information from running Jest and code maintainability information and send this information to the Code Climate dashboard.  This reporting will be useful to help our development team refactor code and improve unit test coverage across the codebase.

## Notes and Troubleshooting:

- `npm run test` runs all E2E tests in `headless=false` mode. If you do not want puppeteer to open a new chromium browser every time you run a test, change the headless property from false to true in `jest-puppeteer.config.js`.
<br>

- Make sure that you have the browser that the (false headless) mode for E2E tests opens being the current open window on your screen, otherwise some tests may fail. Essentially, you need to watch the E2E tests do their magic on your screen (the focus of your screen should be the puppeteer browser) if you open it in `headless=false` mode. 
<br>

- All scripts ignore files in the root directory and the `.github` folder and node modules folder
<br>

- If you have folders generated from libraries after running `npm ci`, then make sure you do not push them (they should be in `.gitignore` file at the root)
<br>

- When adding ESLint code, please add code only in the `/assets directory` or `/jest_tests` direcotry, as ESLint does not check outside of those two directories
<br>

- Please refer to the code style [document](/specs/documentation/codestyle.md) when styling javascript code.
<br>

- Do not push changes in `package-lock.json` or `package.json` unless you are working on pipeline.
<br>

- You can set the liveserver port for this repository by creating a `.vscode` folder in the root of this repository and creating a `settings.json` file inside of it. 
<br>

- If you have two live server version opens (two different versions of the repo) then one of the versions will be of port `5501` (by default) and the other will be `5500`. Please be sure to only have one live server version open when running `npm run test`.
<br>

- Inside `.vscode/settings.json` put:

    ```
    {
        "liveServer.settings.port": 5500
    }
    ```
   if the default liveserver is not set to `5500`.
   <br>

## Regarding Configuration Files in root

### ESLint Configuration Files

- `.eslintignore` is the equivalent of `.gitignore` but for ESLint, so ESLint ignores those directories
<br>

- `.eslintrc.js` is the configuration file of ESLint, that details our code rules
<br>

### JSDocs Configuration Files

- `conf.json` is the configuration file for JSdocs.
<br>

### Jest and Puppeteer Configuration Files

- `jest-puppeteer.config.js` is the configuration file for jest puppeteer (E2E tests)
<br>

- `jest.unit.config.js` is the configuration file for running only unit tests in jest
<br>

### Code Climate Configuration Files

- `.codeclimate.yml` is the configuration file for code climate (which checks code quality)
<br>


### Other Configuration Files

- `package.json` and `package-lock.json` store all the dependencies required for pipeline (ESlint, jest tests, JSDocs).
<br>

- `.gitignore` ignores certain files and directories when adding changes
<br>

- `babel.config.js` is the configuration file for babel (converting ECMA script to JS for unit test usage)
<br>

UPDATED 6/6/2023

UPDATED 6/12/2023

UPDATED 6/14/2023
