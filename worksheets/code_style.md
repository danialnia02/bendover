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

  .App {
    text-align: center;
  }

  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }


### Bad Example

div > nav > ul > li > a {
    color: #1200FF;
}
