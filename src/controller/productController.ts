import { Request, Response } from 'express';
import { CreateProductInput, UpdateProductInput } from "../schema/productSchema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/productService";
import { log } from "console";

export const createProductHandler = async(req: Request<{}, {}, CreateProductInput["body"] & { user: string }>, res: Response) => {
  try {
    const userId = res.locals.user._id

    const body = req.body
    const product = await createProduct({...body, user: userId})
    await product.save()
    
    return res.send(product)
    
  } catch (error) {
    console.log(error);
    
  }
}


export const updateProductHandler = async(req: Request<UpdateProductInput['params']>, res: Response) => {
  const userId = res.locals.user._id

  const { productId } = req.params

  const update = req.body
  const product = await findProduct({productId})
  if (!product) {
    return res.sendStatus(404)
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403)
  }

  const updatedProduct = await findAndUpdateProduct({productId}, update, {new: true})

  return res.send(updatedProduct)
}

export const getProductHandler = async(req: Request<UpdateProductInput['params']>, res: Response) => {
  try {
    
    const { productId } = req.params
    log(productId)

    const product = await findProduct({productId})
    log(product)
  
    if (!product) {
      return res.sendStatus(404)
    }
    
    return res.send(product)
  } catch (error) {
    console.log(error);
    
  }
 
}

export const deleteProductHandler = async(req: Request<UpdateProductInput['params']>, res: Response) => {
  const userId = res.locals.user._id

  const { productId } = req.params

  const product = await findProduct({productId})
  if (!product) {
    return res.sendStatus(404)
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403)
  }

  await deleteProduct({productId})

  return res.sendStatus(200)
}






