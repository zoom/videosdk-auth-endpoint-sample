# Zoom Video SDK Auth Endpoint sample

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/video-sdk-terms/).

This is a Node.js / Express server that generates a [Video SDK JWT](https://developers.zoom.us/docs/video-sdk/auth/#generate-a-video-sdk-jwt) via an http request for authorized use of the [Zoom Video SDK](https://developers.zoom.us/docs/video-sdk/).

If you would like to skip these steps and just deploy the finished code to Heroku, click the Deploy to Heroku button. (You will still need to configure a few simple things, so skip to [Deployment](#deployment).)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/zoom/videosdk-auth-endpoint-sample)

## Installation

In terminal, run the following command to clone the repo:

`$ git clone https://github.com/zoom/videosdk-auth-endpoint-sample.git`

## Setup

1. In terminal, cd into the cloned repo:

   `$ cd videosdk-auth-endpoint-sample`

1. Then install the dependencies:

   `$ npm install`

1. Create an environment file to store your Video SDK credentials:

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
| sessionKey           | Required if set with the host. A key you can provide to identify your sessions. This value will show up in the [Video SDK APIs](https://developers.zoom.us/docs/api/rest/reference/video-sdk/methods/#operation/sessions) and Dashboard. If set with the host, the sessionKey needs to match for all participants.  |
| userIdentity          | Optional, an identifier you can provide to identify your users. This value will show up in the [Video SDK APIs](https://developers.zoom.us/docs/api/rest/reference/video-sdk/methods/#operation/sessionUsers) and Dashboard.                   |
| geoRegions          | Optional, the data center connection preference for the user joining the session. The data center/s you specify must also be enabled on your [account](https://zoom.us/account). Comma seperated string of the following supported geo regions `US`, `AU`, `CA`, `IN`, `CN`, `BR`, `MX`, `HK`, `SG`, `JP`, `DE`, `NL`. [Abreviation reference here](https://developers.zoom.us/docs/api/rest/other-references/abbreviation-lists/#countries).                   |
| cloudRecordingOption          | Optional, `0` for a cloud recording file with user videos combined into one, default.<br>`1` for separate cloud recording video files for each user. [Contact Sales to enable](https://explore.zoom.us/en/video-sdk/). Can only be set by the host (`role_type` of `1`).                   |
| cloudRecordingElection          | Optional, `1` to record this user's self view, default.<br>`0` to not record this user's self view.                   |

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

In the [Video SDK](https://developers.zoom.us/docs/video-sdk/auth/#start-and-join-sessions-with-the-video-sdk-jwt), pass in the `signature` to the `join()` function:

```js
// Make http request to your auth endpoint to get the Video SDK JWT

// Video SDK - web - example:

client.join(
   signature: signature,
   topic: sessionName,
   userName: userName,
   password: sessionPasscode
)
```

## Deployment

If you used the Deploy to Heroku button, enter a name for your app on the page the button took you to (or leave it blank to have a name generated for you), and fill in the values for these,

- `ZOOM_VIDEO_SDK_KEY` (Your Zoom Video SDK Key, found on your Zoom Video SDK App's Credentials page)
- `ZOOM_VIDEO_SDK_SECRET` (Your Zoom Video SDK Secret, found on your Zoom Video SDK App's Credentials page)

Then click "Deploy App".

Now you can generate [your Video SDK JWT](#usage) via the deployed url Heroku provides.

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
   
### Other Server Hosting

For Other Server Hosting information, see [this tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#choosing_a_hosting_provider).

Now you can [generate your Video SDK JWT](#usage) via the deployed url Heroku provides.

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us)   or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.
