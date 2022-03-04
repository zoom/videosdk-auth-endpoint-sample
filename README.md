# Zoom Video SDK Sample Signature Node.js

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

This is a Node.js / Express server that generates a [Video SDK signature](https://marketplace.zoom.us/docs/sdk/video/web/build/signature) via an http request from your frontend for use in the [Zoom Video SDK](https://marketplace.zoom.us/docs/sdk/video/web).

If you would like to skip these steps and just deploy the finished code to Heroku, click the Deploy to Heroku button. (You will still need to configure a few simple things, so skip to [Deployment](#deployment).)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Installation

In terminal, run the following command to clone the repo:

`$ git clone https://github.com/zoom/videosdk-sample-signature-node.js.git`

## Setup

1. In terminal, cd into the cloned repo:

   `$ cd videosdk-sample-signature-node.js`

1. Then install the dependencies:

   `$ npm install`

1. Create an environment file to store your Video SDK Apps's Key and Secret:

   `$ touch .env`

1. Add the following code to the `.env` file, and insert your Video SDK Apps's Key and Secret found on the App Credentials page in the Zoom App Marketplace.:

   ```
   ZOOM_VIDEO_SDK_KEY=VIDEO_SDK_KEY_HERE
   ZOOM_VIDEO_SDK_SECRET=VIDEO_SDK_SECRET_HERE
   ```

1. Save and close `.env`.

1. Start the server:

   `$ npm run start`

## Usage

Make a POST request to `http://localhost:4000` (or your deployed url) with the following request body:

| Key                   | Value Description |
| ----------------------|-------------|
| sessionName           | Required, a session name of your choice. |
| role                  | Optional, `0` to specify participant, `1` to specify host. If the role is not set, the first person who joins will be the host. Everyone else will be a participant. If the role is set, the host must join before the participants. |
| sessionKey           | Required if set with the host. A key you can provide to identify your sessions. This value will show up in the [Video SDK APIs](https://marketplace.zoom.us/docs/api-reference/video-sdk/methods#operation/sessions) and Dashboard. If set with the host, the sessionKey needs to match for all participants.  |
| userIdentity          | Optional, an identifier you can provide to identify your users. This value will show up in the [Video SDK APIs](https://marketplace.zoom.us/docs/api-reference/video-sdk/methods#operation/sessionUsers) and Dashboard.                   |

### Example Request

POST `http://localhost:4000`

Request Body:

```json
{
  "sessionName": "Cool Cars",
  "role": 1,
  "sessionKey": "session123",
  "userIdentity": "user123"
}
```

If successful, the response body will be a JSON representation of your signature:

```json
{
  "signature": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiVklERU9fU0RLX0tFWSIsImlhdCI6MTY0NjI0ODc5NiwiZXhwIjoxNjQ2MjU1OTk2LCJ0cGMiOiJDb29sIENhcnMiLCJ1c2VyX2lkZW50aXR5IjoidXNlcjEyMyIsInNlc3Npb25fa2V5Ijoic2Vzc2lvbjEyMyIsInJvbGVfdHlwZSI6MH0.Y6C65mZUxTZFeGiOI6oW5q2UkIXe3nLTK0MVNkfiJ9c"
}
```

In the [Video SDK](https://marketplace.zoom.us/docs/sdk/video/web/essential/create-join-session#initialize-and-join-a-session), pass in the `signature` to the `client.join()` object:

```js
// make http request to your server to get the signature

client.join(
  topic: sessionName,
  signature: signature,
  userName: userName,
  password: sessionPasscode,
).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

## Deployment

If you used the Deploy to Heroku button, enter a name for your app on the page the button took you to (or leave it blank to have a name generated for you), and fill in the values for these,

- `ZOOM_VIDEO_SDK_KEY` (Your Zoom Video SDK Key, found on your Zoom Video SDK App's Credentials page)
- `ZOOM_VIDEO_SDK_SECRET` (Your Zoom Video SDK Secret, found on your Zoom Video SDK App's Credentials page)

Then click "Deploy App".

Now you can generate and [use your signature](#usage) via the deployed url Heroku provides.

If you cloned this repo, use the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to deploy your server.

1. In terminal, create a Heroku app:

   `$ heroku create`

1. Add your files:

   `$ git add -A`

1. Commit your files:

   `$ git commit -m "deploying to heroku"`

1. Deploy your server by pushing your files to Heroku:

   `$ git push origin heroku`

1. Navigate to your app on the Heroku dashboard, click settings, and add your Video SDK App's Credentials in the Config Variables,

   - `ZOOM_VIDEO_SDK_KEY` (Your Zoom Video SDK Key, found on your Zoom Video SDK App's Credentials page)
   - `ZOOM_VIDEO_SDK_SECRET` (Your Zoom Video SDK Secret, found on your Zoom Video SDK App's Credentials page)

Now you can generate and [use your signature](#usage) via the deployed url Heroku provides.

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us)   or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.
