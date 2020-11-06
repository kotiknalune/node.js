const { hash } = require('bcrypt');
const { RestError } = require('../../error');

// rounds=10: ~10 hashes/sec
async function createHash() {
  await hash(this.password, 10, (err, encrypted) => {
    if (err) throw new RestError(err.message);
    this.password = encrypted;
  });
}

module.exports = createHash;
