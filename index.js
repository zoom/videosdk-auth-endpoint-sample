require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.post('/', (req, res) => {

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    app_key: process.env.ZOOM_VIDEO_SDK_KEY,
    tpc: req.body.sessionName,
    role_type: req.body.role,
    user_identity: req.body.userIdentity,
    session_key: req.body.sessionKey,
    geo_regions: req.body.geoRegions,
    cloud_recording_option: req.body.cloudRecordingOption,
    cloud_recording_election: req.body.cloudRecordingElection,
    version: 1,
    iat: iat,
    exp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_VIDEO_SDK_SECRET)

  res.json({
    signature: signature
  })
})

app.listen(port, () => console.log(`Zoom Video SDK Auth Endpoint Sample Node.js listening on port ${port}!`))
