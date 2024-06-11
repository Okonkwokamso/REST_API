import { Express, Request, Response } from 'express'
import { createUserHandler } from "./controller/userController";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/userSchema";
import { createUserSessionHandler, getUserSessionHandler, deleteUserSession } from "./controller/sessionCotroller";
import { createSessionSchema } from "./schema/sessionSchema";
import requireUser from "./middleware/requireUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/productSchema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/productController";

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200)
  });

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);

  app.get('/api/sessions', requireUser, getUserSessionHandler);

  app.delete('/api/sessions', deleteUserSession);

  app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler)

  app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler)

  app.get('/api/products/:productId', validate(getProductSchema), getProductHandler)

  app.delete('/api/products/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler)
};


export default routes;