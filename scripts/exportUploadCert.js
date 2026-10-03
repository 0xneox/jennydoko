// One-off: export the signing certificate from a JKS (no password needed —
// certs are stored unencrypted) as DER + PEM for Play Console upload-key registration.
const fs = require('fs');
const crypto = require('crypto');

const jksPath = process.argv[2];
const outBase = process.argv[3];
const buf = fs.readFileSync(jksPath);
let off = 0;
const u32 = () => { const v = buf.readUInt32BE(off); off += 4; return v; };
const utf = () => { const len = buf.readUInt16BE(off); off += 2; const s = buf.slice(off, off + len).toString('utf8'); off += len; return s; };
const fp = (c, a) => crypto.createHash(a).update(c).digest('hex').toUpperCase().match(/../g).join(':');

if (u32() !== 0xfeedfeed) throw new Error('not a JKS');
u32();
const count = u32();

for (let i = 0; i < count; i++) {
  const tag = u32();
  utf();
  off += 8;
  if (tag === 1) {
    const pkLen = u32(); off += pkLen;
    const chainLen = u32();
    for (let c = 0; c < chainLen; c++) {
      utf();
      const clen = u32();
      const cert = buf.slice(off, off + clen); off += clen;
      if (c === 0) {
        fs.writeFileSync(outBase + '.der', cert);
        const b64 = cert.toString('base64').match(/.{1,64}/g).join('\n');
        fs.writeFileSync(outBase + '.pem', '-----BEGIN CERTIFICATE-----\n' + b64 + '\n-----END CERTIFICATE-----\n');
        console.log('wrote ' + outBase + '.der and ' + outBase + '.pem');
        console.log('SHA-256:', fp(cert, 'sha256'));
        console.log('SHA-1:  ', fp(cert, 'sha1'));
      }
    }
  } else if (tag === 2) {
    utf();
    const clen = u32();
    off += clen;
  }
}
