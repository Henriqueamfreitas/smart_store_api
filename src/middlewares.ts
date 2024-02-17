import { NextFunction, Request, Response } from 'express'
import { product } from './database'
import { Product } from './interfaces'

const ensureProductExistsMiddleWare = (request: Request, response: Response, next: NextFunction) => {
    const id: string = request.params.id
    const findIndexProduct: number = product.findIndex(element => element.id === Number(id))

    if(findIndexProduct === -1) {
        return response.status(404).json({
            message: 'Product not found.'
        })
    }

    response.locals.findIndexProduct = findIndexProduct

    return next()
}  

const ensureNoDuplicatesMiddleWare = (request: Request, response: Response, next: NextFunction) => {
    const productWithSameName: Product|undefined = product.find(element => element.name === request.body.name)
    if(productWithSameName !== undefined){
        return response.status(409).json({
            message: 'Product already registered.'
        })
    }

    return next()

}

export { ensureProductExistsMiddleWare, ensureNoDuplicatesMiddleWare }