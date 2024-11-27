import crypto from 'crypto';

const urlObfuscatorSecret = process.env.ENCRYPTION_SECRET ?? "";
if (!urlObfuscatorSecret) {
  throw new Error("No encryption secret provided");
}

export class URLEncryptor {
  private algorithm = 'aes-256-cbc';
  private key: Uint8Array;
  private iv: Uint8Array;

  constructor(secret: string) {
    // Ensure the secret is hashed into 32 bytes for aes-256-cbc
    this.key = Uint8Array.from(crypto.createHash('sha256').update(secret).digest());
    this.iv = new Uint8Array(16); // 16-byte zero-filled IV
  }

  encrypt(url: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(url, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encodeURIComponent(encrypted); // Make URL-safe
  }

  decrypt(encryptedUrl: string): string | Error {
    try {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
      const decoded = decodeURIComponent(encryptedUrl); // Decode the URL-safe string
      let decrypted = decipher.update(decoded, 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (err: unknown) {
      return new Error((err as any)?.message ?? "Error decrypting slug")
    }
  }
}

export const urlObfuscator = new URLEncryptor(urlObfuscatorSecret);

export const decryptSlug = (slug: string) => {
  return urlObfuscator.decrypt(slug);
}

export const encryptSlug = (slug: string) => {
  return urlObfuscator.encrypt(slug);
}
