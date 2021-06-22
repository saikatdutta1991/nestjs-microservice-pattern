export default () => ({
  MONGODB_URI: process.env.ACCOUNT_SERVICE_MONGODB_URI,
  JWT_SECRET: process.env.ACCOUNT_SERVICE_JWT_SECRET || 'jwt-secret',
});
