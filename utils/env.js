const dotenv = require('dotenv-safe')

exports.config = () => {
  dotenv.config({
    path: '.env',
    example: '.env.example'
  })
  dotenv.config({
    path: '.env.local',
    example: '.env.local.example'
  })
}