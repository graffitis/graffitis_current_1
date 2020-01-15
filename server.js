const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `GRAFFITIS | Server started on port ${PORT} - use 'localhost:${PORT}/'`
  );
});

let db = require('./config/keys').MongoURI;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true });
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('GRAFFITIS | MongoDB Connected');
});
