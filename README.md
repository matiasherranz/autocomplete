# ReactJS Autocomplete Box component

## TL;DR: How to run the project

- Clone this repo,
- Move to the base folder,
- Install dependencies (typically with `npm install`),
- And run the project! (`npm start`),
- Then go to [localhost:3000](localhost:3000) on your browser to see the project in action!

You can run the tests with `npm run test`.

## Tech stack used and setting up the project dependencies

### NodeJS

The node version used is 20.o. To set it, I use `nvm` like this:

```bash
$ nvm use 20
```

The version number can be omitted (if sitting at the root of the repo), since I added an `.nvmrc` file. You can take a look [here](https://github.com/nvm-sh/nvm) to learn more about `nvm`, including setup instruction and full documentation.

### Base stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Then I configured Prettier with the built-in configuration os ESLint that it comes bundled with to get a good foundational preparation.

To create the initial app with Create React App, using Typescript, I used this command:

```
npx create-react-app autocomplete --template typescript
```

Install Prettier:

```
npm install --save-dev --save-exact prettier
```

Finally, install `eslint-config-prettier` to make sure Prettier and ESLint play together nicely:

```
npm install --save-dev eslint-config-prettier
```

ESLint comes installed with CRA, so we just need to add `prettier` last in the config, in package.json, under the extends array of `eslintConfig` key.

> Docs: https://github.com/prettier/eslint-config-prettier#installation

One last note on ESLint: I added the [sort-imports](https://eslint.org/docs/latest/rules/sort-imports) rule, that I find very positive for code quality.

### Development environment setup and code style considerations

The main pieces of the code styling and standard-compliance setup I used are the following:

- .gitignore: I used a standard .gitignore file from the [GitHub gitignore project](https://github.com/github/gitignore/blob/master/Node.gitignore),
- prettier: ([link](https://prettier.io/)) A great code formatter that smoothly integrates with both editors and commit/push hooks,
- eslint: ([link](https://eslint.org/)) ESLint statically analyzes your code to quickly find problems. Many problems ESLint finds can be automatically fixed. I set it up to work side-by-side with prettier.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts (apart from the usual ones to start, build and run tests)

In the project directory, you can run:

### `npm run format`

Runs Prettier and applies fixes to the issues it finds and can fix.

### `npm run lint`

Runs ESLint and tries to fix any violations it finds.

And the usual ones:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Further Reading

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
