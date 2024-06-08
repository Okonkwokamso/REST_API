import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
//import tokenMiddleware from "./middleware/getToken";



const port = config.get('port') as number;

const app = express();

app.use(express.json());

//app.use(tokenMiddleware)
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  await connect();

  routes(app);
});









