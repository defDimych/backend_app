import { app } from "./app";
import { runDb } from "./db/db";

const port = process.env.PORT || 3003;

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp();