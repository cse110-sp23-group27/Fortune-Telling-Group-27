# Setup/Building the Repo

1. Make sure node.js is installed on your machine
2. Clone the repository using the git command ```git clone https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27.git```
   1. To switch branches to a different repo, try the git command ```git checkout <branch name>```
   2. To update the current repo you are on with the main branch try: ```git fetch``` and then ```git rebase origin/main```
3. In the root directory, run ```npm install``` in the terminal to install all required dependencies.
   1. Also run ```npm install --save-dev eslint eslint-config-google``` to install the required google config (if needed)
4. There are multiple commands in the package.json file that you can run.
   1. ```npm run lint``` runs ESLint on the assets directory and the jest_tests directory
   2. ```npm run docs``` runs JSDocs on the assets/scripts directory and the jest_tests directory, and generates documentation in specs/documentation/generated.(Don't run locally)
   3. ```npm run test --silent``` runs all Jest unit tests and hopefully soon E2E tests (silent tag ignores warnings)
   4. More commands TBA

## Notes:

All scripts ignore files in the root directory and the .github folder

When adding JSLint code, please add code only in the /assets directory or the /scripts directory, as ESLint does not check outside of those two directories

Please refer to the code style [document](/specs/documentation/codestyle.md) when styling code

# Pipeline steps
## This process should be run when you are finished with code that resolves an issue defined in GitHub issues


1. Pull latest changes from main branch and the branch you are working on
2. Resolve merge conflicts with the branch if necessary
3. Run the defined commands in the package.json file locally (```npm run lint```, etc), and if errors occur regarding linter syntax try to fix them if they are not     automatically fixed (Note: do not run ```npm run docs``` locally, let GitHub Actions handle that)
4. Add unit tests if necessary for your code (at your own discretion), as well as necessary inline comments
5. Push to the repo
   1. If the build run by GitHub Actions fails, try to fix it in your local repo and restart this process again.
6. Create a pull request to merge into the main branch 
   1. Assign the pull request to the issue it resolves
   2. Make sure to pull from your branch as well in case GitHub Actions made any changes to your repo (regarding documentation or syntax)
   3. Code climate stuff (not added yet)
   4. Assign reviewer to your code (either Victor or Elvis)
   5. Resolve merge issues with main (maybe assign this to reviewers?)
7. Reviewers will review code and merge if it's good, otherwise they will let you know what doesn't work and restart this pipeline process when the issue is fixed
8. Deployment (TBD)
9. Remove the working branch that was merged with main (pruning)