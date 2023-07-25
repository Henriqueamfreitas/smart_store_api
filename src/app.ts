import express, { Application, json, Request, Response } from "express";
import { createProduct, deleteProduct, readAllProducts, updateProduct } from "./logic";
import { readProduct } from "./logic";
import { ensureProductExistsMiddleWare, ensureNoDuplicatesMiddleWare } from "./middlewares";

const app: Application = express()

app.use(json())

app.post("/products", ensureNoDuplicatesMiddleWare, createProduct)
app.get("/products", readAllProducts)
app.get("/products/:id", ensureProductExistsMiddleWare, readProduct)
app.patch("/products/:id", ensureProductExistsMiddleWare, ensureNoDuplicatesMiddleWare, updateProduct)
app.delete("/products/:id", ensureProductExistsMiddleWare, deleteProduct)

const PORT:number = 3000
const runningMsg = `Server running on http://localhost:${PORT}`
app.listen(PORT, () => {
    console.log(runningMsg)
})