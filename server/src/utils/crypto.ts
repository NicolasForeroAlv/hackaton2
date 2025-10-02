import crypto from 'crypto'
const KEY_HEX = process.env.CRYPTO_KEY || '00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff'
const KEY = Buffer.from(KEY_HEX, 'hex')

export function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv)
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, encrypted]).toString('base64')
}

export function decrypt(payload: string): string {
  const data = Buffer.from(payload, 'base64')
  const iv = data.slice(0,12)
  const tag = data.slice(12,28)
  const encrypted = data.slice(28)
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv)
  decipher.setAuthTag(tag)
  const out = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return out.toString('utf8')
}
