const app = require("./src/app");
const connectToDB = require("./src/config/database.config");
const port = 3000;

connectToDB();


app.listen(port, () => {
  console.log("listening on port");
});

