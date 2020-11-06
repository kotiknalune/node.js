const { hash } = require('bcrypt');
const { RestError } = require('../../error');

const SALT_ROUND = 10;

// const passwordAdmin = async () => {
//   await hash('admin', SALT_ROUND);
// };

async function createHash() {
  await hash(this.password, SALT_ROUND, (err, encrypted) => {
    if (err) throw new RestError(err.message);
    this.password = encrypted;
  });
}

module.exports = createHash;
