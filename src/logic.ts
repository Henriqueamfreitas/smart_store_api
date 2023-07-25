import { Request, Response } from "express";
import { product } from "./database";
import { Product } from "./interfaces";

function formateData(data:Date) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Lembrando que os meses em JavaScript são base 0
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function plus365Days(dataInicial:any) {
    // Crie uma cópia da data inicial para não alterá-la diretamente
    const novaData = new Date(dataInicial);
  
    // Adicione 365 dias à nova data
    novaData.setDate(novaData.getDate() + 365);
  
    // Retorne a nova data
    return novaData;
  }

const createProduct = (request: Request, response: Response): Response => {
    const today: Date = new Date()
    const novaData: Date = new Date(today);

    novaData.setDate(novaData.getDate() + 365);

    const newProduct: Product = {
        id: product.length + 1,
        name: request.body.name,
        price:  request.body.price, 
        weight: request.body.weight, 
        section: request.body.section, 
        calories: request.body.calories, 
        expirationDate: novaData,     
    }

    product.push(newProduct)
    return response.status(201).json(newProduct)
}

const readAllProducts = (request: Request, response: Response): Response => {
    const productPrices:any = []
    product.forEach((element) => {
        productPrices.push(element.price)
    })
    const soma = productPrices.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);

    const returnObject = {
        total: soma,
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
