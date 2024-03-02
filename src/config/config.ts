import dotenv from 'dotenv'
dotenv.config()

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || '',
  jwtSecrete: process.env.JWT_SECRET || ''
}
