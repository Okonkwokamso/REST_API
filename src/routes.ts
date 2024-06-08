import { Express, Request, Response } from 'express'
import { createUserHandler } from "./controller/userController";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/userSchema";
import { createUserSessionHandler, getUserSessionHandler, deleteUserSession } from "./controller/sessionCotroller";
import { createSessionSchema } from "./schema/sessionSchema";
import requireUser from "./middleware/requireUser";
import { RequestPayload } from "./middleware/deserializeUser";

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200)
  });

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);

  app.get('/api/sessions', requireUser, getUserSessionHandler);

  app.delete('/api/sessions', deleteUserSession);

};


export default routes;