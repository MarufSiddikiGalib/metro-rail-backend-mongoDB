const redis = require("redis");
const client = redis.createClient(); // Defaults to localhost:6379

client.connect(); // For redis >= v4

// Add token to blacklist until it expires
async function blacklistToken(token, exp) {
  const ttl = exp - Math.floor(Date.now() / 1000); // seconds until expiry
  if (ttl > 0) {
    await client.set(token, "blacklisted", { EX: ttl });
  }
}

// Check if token is blacklisted
async function isTokenBlacklisted(token) {
  const result = await client.get(token);
  return result === "blacklisted";
}

module.exports = { blacklistToken, isTokenBlacklisted };