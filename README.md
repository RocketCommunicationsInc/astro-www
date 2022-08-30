# Astro WWW

The source code for the Astro UXDS website.

[![Open in StackBlitz][open-img]][open-url]

| [Project Structure](#project-structure) | [Commands](#commands) |
| --- | --- |

> You will need [NodeJS](https://nodejs.org/en/) and [Git](https://docs.github.com/en/get-started/quickstart/set-up-git) to contribute to the website.

## Getting Started

First, clone this project to your local environment.

```shell
git clone git@github.com:RocketCommunicationsInc/astro-www.git
```

Next, install the project dependencies. These are required to develop the website locally.

```shell
npm install
```

Finally, start the server.

```shell
npm start
```

That’s it!

Navigate to http://localhost:3000/. You should see the website, which is now running in your local environment.

The `npm start` command launches the website in development mode. Any saved changes are reflected instantly in the local website.

[Learn about all of the commands](#commands)

## Project Structure

```
/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   └── utils/
├── .editorconfig
├── .gitignore
├── astro.config.js
├── package.json
├── README.md
└── tsconfig.json
```

### The `public` Directory

The `public` directory contains all of the files and assets that do not need to be processed. These files are served untouched.

### The `src` Directory

The `src` directory contains all of the source files that will be processed. This includes all of the pages, components, styles, data, and content.

### The `.editorconfig` File

The `.editorconfig` file is used by GitHub and different editors to maintain consistent coding styles throughout the project.

[Learn More about `.editorconfig`](https://editorconfig.org)

### The `.gitignore` File

The `.gitignore` file is used by Git to prevent specific files from being committed to the project.

### The `package.json` File

The `package.json` file is used by different package managers to handle the installation of external packages used by this project.

### The `astro.config.js` File

The `astro.config.js` file is used by Astro to configure how the website is project is built.

[Learn More about `astro.config.js`](https://docs.astro.build/en/guides/configuring-astro/)

## Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                          |
|:--------------------|:------------------------------------------------|
| `npm install`       | Installs dependencies                           |
| `npm run start`     | Starts local dev server at `localhost:3000`     |
| `npm run build`     | Build the production site to `./dist/`          |
| `npm run serve`     | Serves the production build at `localhost:3000` |
| `npm run check`     | Checks all `.astro` files in the project        |
| `npm run check:css` | Checks all `.css` files in the project          |
| `npm run check:js`  | Checks all `.js` and `.ts` files in the project |

[open-img]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[open-url]: https://stackblitz.com/github/RocketCommunicationsInc/astro-www
