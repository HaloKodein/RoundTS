import { app } from './app';
import log from "../utils/log";

app.listen(3000 || process.env.PORT, () => {
  log.info("Iniciado na porta: 3000", "API");
});