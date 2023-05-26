# Code Style Document for JavaScript

## Variable Formatting

Use camel casing for naming variables, and make sure that variable names are not too long (not more than 3 words).

Put a comment for each variable describing what it's doing.

For Constants:
Hard coded = ALL CAPS
Soft coded = not all caps

Good Example: 

```
// Constant for holding the responses for each tarot card
const tarotCardList = [ ... ]
```

```
// Constant hard coded value of PI
const PI = 3.14
```

Bad Example

```varName``` - Not descriptive enough

```not_camel_case``` - Not camel case

```thisVarIsTooLongOops``` - Variable name is too long

## Using Method/Constructor Headers

Requirement: Each method and class constructor must have a header comment located immediately before the method declaration. 
Include the information below but leave out parameter and/or return-value comments if the method has none.

Example:

```
/**
 * Generates a table head
 * @param {HTMLTableElement} table - The target HTML table
 * @param {Array} data - The array of cell header names
 * @return {void} Nothing
 */
function generateTableHead(table, data) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  for (const i of data) {
    const th = document.createElement("th");
    const text = document.createTextNode(i);
    th.appendChild(text);
    row.appendChild(th);
  }
}
```

```
class Person {
  /**
   * Creates a person 
   * @param {String} name - The name of the person
   * @param {number} age - The age of the person
   * @param {boolean} IsDeveloper - Whether or not the person is a developer
   * @returns {Object} - The person object
   */
  constructor(name, age, IsDeveloper) {
    // code
  }
}
```


The brackets right after the @param or @return specify the type of the parameter/what is returned. 
If the type returned/inputted is unknown, use ```{*}``` instead.

## Using File Headers

At the top of each JS file, please include a file header. 

Example:

```
/** 
 *  @fileOverview Write what's going on in the file here.
 *
 *  @author       Author 1
 *  @author       Author 2
 *
 *  @requires    requirement
 *  @requires    requirement2
 */
 ```

## Using Inline Comments

If there is a length of code that is left unexplained, take the time to type a non-redundant line summarizing this length of code 
(e.g. ```// initialize an int is redundant```, vs. ```// set initial length to 10 inches```)

It will let others who look at your code understand what's going on without having to spend time understanding your logic first.
But don't be too descriptive, as too many comments reduces readability.

Requirement: Use comments within the body of methods to:

* highlight the major steps of your algorithm
* explain long calculations or conditions
* clarify convoluted or unusual code
* mark locations where you suspect a bug may exist
* mark locations where improvements or enhancements are planned
* Do not use comments in methods to explain things that are obvious to programmers. 

For example, it is not useful to provide comments such as "this assignment statement assigns 22 to the variable x". 

Instead use comments to point out things that are not immediately evident or to highlight sections of code.

## Use Minimal Recursion

When writing functions, make sure to use as little recursion as possible. 
If a simple iterative solution exists, try to use that instead.

Good Example: 
```
function countDown(n) {
  for (let i = n; i > 0; i--) {
    console.log(i);
  }
}
```

Bad Example:

```
function countDown(n) {
  console.log(n)
  if(n > 0) {
    countDown(n-1);
  }
}
```

## Function Guidelines

Use at most 80 characters per line of code.

Use same line brackets when brackets are required.

Good Example:
```
function foo() {
  //code
}
```

Bad Example:
```
function foo()
{
  //super long, very long, line of code that is more than 80 chars
}
```

## Proper Indentation

To be handled with autoformatter or Eslint.

## JSDoc generation

To install JSDoc:

```npm install jsdoc```

To generate HTML documentation:

```jsdoc <filename>.js```

## Credits:

[CSE 8B Style Guidelines](https://cseweb.ucsd.edu/classes/fa20/cse8B-a/styleguide.html)

[JSDoc Introduction](https://www.valentinog.com/blog/jsdoc/)

[Video Tutorial for JSDocs](https://www.youtube.com/watch?v=Nqv6UkTROak)
