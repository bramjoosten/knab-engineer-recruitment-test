# Crypto Converter
A coding assignment for Knab bank, built mainly in React.js for the front-end and a bit of php for proxying api requests. 

tested with  
`node v10.16.3`
`npm 6.9.0`
`yarn 1.17.3`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn deploy`

Runs deploy script from src/scripts/deploy.sh.

1. In `src/scripts/deploy.sh`, Change SSH_DEST to deploy to your own server.
2. In `public/proxy/env.sample.php`, rename to env.php and add your own coinmarketcap api key
3. In `package.json`, set "homepage" to your server's public html folder, optionally a subdir.
