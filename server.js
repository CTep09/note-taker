const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./router/htmlRouter")(app);
require("./router/apiRouter")(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
