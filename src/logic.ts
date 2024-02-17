import { Request, Response } from 'express';
import { product } from './database';
import { Product } from './interfaces';

const createProduct = (request: Request, response: Response): Response => {
    const today: Date = new Date()
    const newDate: Date = new Date(today);

    newDate.setDate(newDate.getDate() + 365);

    const newProduct: Product = {
        id: product.length + 1,
        name: request.body.name,
        price:  request.body.price, 
        weight: request.body.weight, 
        section: request.body.section, 
        calories: request.body.calories, 
        expirationDate: newDate,     
    }

    product.push(newProduct)
    return response.status(201).json(newProduct)
}

const readAllProducts = (request: Request, response: Response): Response => {
    const productPrices:number[] = []
    product.forEach((element) => {
        productPrices.push(element.price)
    })
    const sum = productPrices.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);

    const returnObject = {
        total: sum,
        products: product
    }
    return response.status(200).json(returnObject)
}

const readProduct = (request: Request, response: Response): Response => {
    const findIndexProduct = response.locals.findIndexProduct

    const selectedProduct = product[findIndexProduct]

    return response.status(200).json(selectedProduct)
}

const updateProduct = (request: Request, response: Response): Response => {
    const findIndexProduct = response.locals.findIndexProduct


    const updatedProduct = {
        ...product[findIndexProduct],
        ...request.body
    } 
    product[findIndexProduct] = updatedProduct

    return response.status(200).json(updatedProduct)
}

const deleteProduct = (request: Request, response: Response): Response => {
    const findIndexProduct = response.locals.findIndexProduct

    product.splice(findIndexProduct, 1)

    return response.status(204).send()
}

export { createProduct, readAllProducts, readProduct, updateProduct, deleteProduct }
