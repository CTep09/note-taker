const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRouter = require('./router/apiRouter')
const htmlRouter = require('./router/htmlRouter')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use('/', htmlRouter);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

