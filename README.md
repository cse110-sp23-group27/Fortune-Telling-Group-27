# Fortune-Telling-Group-27
[![Maintainability](https://api.codeclimate.com/v1/badges/87f25017229aa77c661a/maintainability)](https://codeclimate.com/github/cse110-sp23-group27/Fortune-Telling-Group-27/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/87f25017229aa77c661a/test_coverage)](https://codeclimate.com/github/cse110-sp23-group27/Fortune-Telling-Group-27/test_coverage)
[![Pipeline CI](https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27/actions/workflows/main_actions.yml/badge.svg)](https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27/actions/workflows/github_actions.yml)

> :crystal_ball: A Tarot Card fortune telling application to discover your past, present and future.


## Table of Contents
- [GitHub Pages Deployment](#live)
- [Current Features](#features)
- [Installation](#install)
- [Onboarding Document](#onboarding)
- [Main Project Repo](#main)
- [Image and Audio Sources](#sources)


## <a name="live"></a> GitHub Pages Deployment:

https://cse110-sp23-group27.github.io/Fortune-Telling-Group-27/

## <a name="features"></a> Current features
* Shuffle animation
* Three different responses for each tarot card
* Local storage that displays what cards have been found/seen
* "Flip" animation for the cards
* Text display effect


## <a name="install"></a> Installation
1. Make sure `node.js` is installed on your machine.
2. Clone the repository using the following git command:
    ```
     git clone https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27.git
    ```
3. In the root directory, run `npm ci` in the terminal to install all the required dependencies.

    - Optionally, also run `npm ci --save-dev eslint eslint-config-google` to install the required Google config (only if google config not recognized).
    <br>

    > :warning: **Do not run `npm install` unless `npm ci` does not work**

   - If ```npm ci``` does not work, you can try running `npm install`, but do not push the changes made in `package-lock.json` or `package.json`.


## <a name="onboarding"></a> Onboarding Document 
- First place new developers should read through for the process on how to push code, resolve GitHub issues, use CI/CD pipeline and local testing.

[Onboarding](/specs/documentation/onboard.md)


## <a name="main"></a> Main Project Repo
- This repository contains our ADRs, CI/CD pipeline information, brainstorming documents, meeting notes and other important internal documents.

[Main Repo](https://github.com/cse110-sp23-group27/cse110-sp23-group27)


## <a name="sources"></a> Image and Audio Sources
- A list of references can be found here for all the audio and images we use in our application.

[Sources](https://github.com/cse110-sp23-group27/Fortune-Telling-Group-27/blob/main/specs/documentation/images-and-sounds-sources.md)