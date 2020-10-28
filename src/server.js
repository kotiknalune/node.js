const { PORT } = require('./configs/app.config');
const connectToDB = require('./utils/mongo');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () =>
    console.info(`App is running on http://localhost:${PORT}`)
  );
});
