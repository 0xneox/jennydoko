// One-off: extract X.509 cert fingerprints from a JKS without the store password.
// JKS stores certs unencrypted; the password only guards integrity + private keys.
const fs = require('fs');
const crypto = require('crypto');

const buf = fs.readFileSync(process.argv[2]);
let off = 0;
const u32 = () => { const v = buf.readUInt32BE(off); off += 4; return v; };
const utf = () => { const len = buf.readUInt16BE(off); off += 2; const s = buf.slice(off, off + len).toString('utf8'); off += len; return s; };
const fp = (cert, alg) => crypto.createHash(alg).update(cert).digest('hex').toUpperCase().match(/../g).join(':');

if (u32() !== 0xfeedfeed) throw new Error('not a JKS');
u32(); // version
const count = u32();

for (let i = 0; i < count; i++) {
  const tag = u32();
  const alias = utf();
  off += 8; // timestamp
  if (tag === 1) {
    const pkLen = u32(); off += pkLen; // encrypted private key
    const chainLen = u32();
    for (let c = 0; c < chainLen; c++) {
      utf(); // cert type
      const clen = u32();
      const cert = buf.slice(off, off + clen); off += clen;
      console.log(`alias=${alias} chain[${c}]`);
      console.log('  SHA-256:', fp(cert, 'sha256'));
      console.log('  SHA-1:  ', fp(cert, 'sha1'));
      console.log('  MD5:    ', fp(cert, 'md5'));
    }
  } else if (tag === 2) {
    utf();
    const clen = u32();
    const cert = buf.slice(off, off + clen); off += clen;
    console.log(`trusted cert alias=${alias}`);
    console.log('  SHA-256:', fp(cert, 'sha256'));
  }
}
