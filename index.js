const app = require("./src/app")();
const port = 3001;

app.listen(port, () =>
    console.log(`App started and listening on port ${port}`)
);