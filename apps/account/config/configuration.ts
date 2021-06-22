export default () => ({
  mongodbUri: process.env.ACCOUNT_SERVICE_MONGODB_URI,
  jwtSecret: process.env.ACCOUNT_SERVICE_JWT_SECRET || 'jwt-secret',
});
