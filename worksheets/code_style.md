# Code Style

This documents helps to guide the look and feel of the code so that even when there are multiple developer, the style remains consistent. You may read more about it [here](https://javascript.info/coding-style).

## Style Guide

| Rules             | Choices                         |
| ----------------- | ------------------------------- |
| Case Styles       | camelCase/snake_case/PascalCase |
| Acronym Case      | IBM/Ibm/ibm                     |
| Indentation Style | Allman/1TBS                     |
| Indentation       | Tabs/Space                      |
| Indentation Space | 2/4 spaces                      |
| Semicolon         | Optional/Mandatory              |

## Examples

Based on your chosen rules, give an example of a code that follows the code style and an example of a code that does not follow the code style. The examples you give should cover all the above defined rule.

### Good Example

## Case Styles
categoryInformation;
eBook;
worldMap

## Acronym Case
CASE
IBM
DMIT

## Indentation Style (1TBS)
void checknegative(x) {
    if (x < 0) {
        puts("Negative");
    } else {
        nonnegative(x);
    }
}

## Indentation
void checknegative(x) {
    if (x < 0) {
        puts("Negative");
    } else {
        nonnegative(x);
    }
}

## Indentaion Space
void checknegative(x) {
    if (x < 0) {
        puts("Negative");
    } else {
        nonnegative(x);
    }
}

## Semicolon
var test="test";
var info =1;

### Bad Example

## Case Styles
CategoryInformation;
ebook;
Worldap

## Acronym Case
Case
Ibm
dMIT

## Indentation Style (1TBS)
void checknegative(x) 
{
    if (x < 0) 
    {
        puts("Negative");
    } 
    else 
    {
        nonnegative(x);
    }
}

## Indentation
void checknegative(x) {
  if (x < 0) {
  puts("Negative");
  } else {
  nonnegative(x);
  }
}

## Indentaion Space
void checknegative(x){
    if(x < 0){
        puts("Negative");
    }else{
        nonnegative(x);
    }
}

## Semicolon
var test="test"
var info =1;