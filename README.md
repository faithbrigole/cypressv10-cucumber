# studio_subsit

If you clone the repo just to **npm install**



How to install:

```
npm init
```
```
npm install cypress --save-dev
```

To configure the cypress run:
```
npx cypress open
```

install the cucumber and cypress es build
```
npm install -D @badeball/cypress-cucumber-preprocessor
npm install -D @bahmutov/cypress-esbuild-preprocessor
```

Go to cypress.config.js and add this code:
```
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
//If using this approach, just call the key "setupNodeEvents" in the E2E configurations
// async function setupNodeEvents(on, config) {
//   await addCucumberPreprocessorPlugin(on, config);
//   on(
//     "file:preprocessor",
//     createBundler({
//       plugins: [createEsbuildPlugin(config)],
//     })
//   );
//   return config;
// }
module.exports = defineConfig({
e2e: {
async setupNodeEvents(on, config) {
const bundler = createBundler({
plugins: [createEsbuildPlugin(config)],
});
on("file:preprocessor", bundler);
await addCucumberPreprocessorPlugin(on, config);
return config;
},
specPattern: "cypress/e2e/features/*.feature",
baseUrl: "https://www.google.com",
chromeWebSecurity: false,
},
});
```

Then, create .cypress-cucumber-preprocessorrc.json
```
{
"json": {
"enabled": true,
"output": "jsonlogs/log.json",
"formatter": "cucumber-json-formatter.exe"
},
"messages": {
"enabled": true,
"output": "jsonlogs/messages.ndjson"
},
"html": {
"enabled": true
},
"stepDefinitions": [
"[filepath]/**/*.{js,ts}",
"[filepath].{js,ts}",
"cypress/e2e/step_definitions/*.{js,ts}"
]
}
```
