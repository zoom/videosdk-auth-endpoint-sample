import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { KJUR } from 'jsrsasign'
import { toStringArray } from './utils.js'
import {
  inNumberArray,
  isBetween,
  isLengthLessThan,
  isRequired,
  matchesStringArray,
  validateRequest
} from './validations.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(express.json(), cors())
app.options('*', cors())

// Validations should match Zoom Video SDK's documentation:
// https://developers.zoom.us/docs/video-sdk/auth/#payload
const validator = {
  role: [isRequired, inNumberArray([0, 1])],
  sessionName: [isRequired, isLengthLessThan(200)],
  expirationSeconds: isBetween(1800, 172800),
  userIdentity: isLengthLessThan(35),
  sessionKey: isLengthLessThan(36),
  geoRegions: matchesStringArray(['AU', 'BR', 'CA', 'CN', 'DE', 'HK', 'IN', 'JP', 'MX', 'NL', 'SG', 'US']),
  cloudRecordingOption: inNumberArray([0, 1]),
  cloudRecordingElection: inNumberArray([0, 1]),
  audioCompatibleMode: inNumberArray([0, 1])
}

const coerceRequestBody = (body) => ({
  ...body,
  ...['role', 'expirationSeconds', 'cloudRecordingOption', 'cloudRecordingElection', 'audioCompatibleMode'].reduce(
    (acc, cur) => ({ ...acc, [cur]: typeof body[cur] === 'string' ? parseInt(body[cur]) : body[cur] }),
    {}
  )
})

const joinGeoRegions = (geoRegions) => toStringArray(geoRegions)?.join(',')

app.post('/', (req, res) => {
  const requestBody = coerceRequestBody(req.body)
  const validationErrors = validateRequest(requestBody, validator)

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors })
  }

  const {
    role,
    sessionName,
    expirationSeconds,
    userIdentity,
    sessionKey,
    geoRegions,
    cloudRecordingOption,
    cloudRecordingElection,
    audioCompatibleMode
  } = requestBody

  const iat = Math.floor(Date.now() / 1000)
  const exp = expirationSeconds ? iat + expirationSeconds : iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    app_key: process.env.ZOOM_VIDEO_SDK_KEY,
    role_type: role,
    tpc: sessionName,
    version: 1,
    iat,
    exp,
    user_identity: userIdentity,
    session_key: sessionKey,
    geo_regions: joinGeoRegions(geoRegions),
    cloud_recording_option: cloudRecordingOption,
    cloud_recording_election: cloudRecordingElection,
    audio_compatible_mode: audioCompatibleMode
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_VIDEO_SDK_SECRET)
  return res.json({ signature: sdkJWT })
})

app.listen(port, () => console.log(`Zoom Video SDK Auth Endpoint Sample Node.js, listening on port ${port}!`))
