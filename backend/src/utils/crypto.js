const crypto = require("crypto");

const KEY = process.env.ENCRYPTION_KEY
  ? Buffer.from(process.env.ENCRYPTION_KEY, "hex")
  : null;

const ALGO = "aes-256-gcm";

function encrypt(plainText) {
  if (!plainText) return null;
  if (!KEY) {
    throw new Error(
      "ENCRYPTION_KEY is not set in .env — required to store session cookies securely"
    );
  }

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

function decrypt(payload) {
  if (!payload) return null;
  if (!KEY) {
    throw new Error(
      "ENCRYPTION_KEY is not set in .env — required to read stored session cookies"
    );
  }

  const raw = Buffer.from(payload, "base64");

  const iv = raw.subarray(0, 12);
  const authTag = raw.subarray(12, 28);
  const encrypted = raw.subarray(28);

  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);

  return decrypted.toString("utf8");
}

module.exports = { encrypt, decrypt };
