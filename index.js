require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors());

app.post('/', (req, res) => {

  const iat = Math.round(new Date().getTime() / 1000);
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    app_key: process.env.ZOOM_VIDEO_SDK_KEY,
    iat: iat,
    exp: exp,
    tpc: req.body.sessionName,
    pwd: req.body.sessionPasscode,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const signature = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, process.env.ZOOM_VIDEO_SDK_SECRET);

  res.json({
    signature: signature
  })
})

app.listen(port, () => console.log(`Zoom Video SDK Sample Signature Node.js on port ${port}!`))
