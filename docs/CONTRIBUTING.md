# How to contribute

First, thank you for taking the to read the contribution guideline.

Secondly here are some resources you might find useful:

- [React docs](https://reactjs.org/docs/getting-started.html)
- [Vite.js docs](https://vitejs.dev/guide/)
- [Graphql docs](https://graphql.org/learn/)
- [Typescript handbook](https://www.typescriptlang.org/docs/handbook/)
- [Tailwindcss website](https://tailwindcss.com/)
- [Apollo server docs](https://www.apollographql.com/docs/apollo-server/getting-started/)

## Cute dev suggestion

Please create an issue with the label `cute-dev-request` containing the following:

- Firstname
- Lastname
- Creations (tools, frameworks, languages, ...)
- A picture (optional)

## Submitting changes

Please send a Pull Request with a clear list of the changes made using clear and conprehensive language. Following our coding conventions and make sure all of your commits are atomic (one feature per commit).

## Coding conventions

- React component's names should be in PascalCase
- Non-component files should be in camelCase
- Folder names should be in camelCase
- Every component file should export (default) a single component
- Destructure your props
- Your Imports should be in the following order:
  - Third party packages imports `(React, Urql, etc...)`
  - Lib/utils/hooks imports `(useWindowsSize, useLogin, etc...)`
- Avoid the use of `Object.assign()` in favor of
  the spread operator `({...anotherObj})`
- Prefer the .map, .filter, .reduce, etc functions over for loops
