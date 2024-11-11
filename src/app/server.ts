import app from "./app";
import { Server } from "http";
const PORT = 3000;

let server: Server;

async function bootstrap() {
  let server = app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
}

bootstrap();
