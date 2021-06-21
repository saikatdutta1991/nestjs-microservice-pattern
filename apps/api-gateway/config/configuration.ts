export default () => ({
  port: parseInt(process.env.SERVICE_API_GATEWAY_PORT) || 3000,
});
