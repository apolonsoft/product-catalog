import { productsTable } from "../db/schema";
import { useDrizzle } from "../utils/drizzle";

export default defineEventHandler(async (event) => {

    //await new Promise((resolve) => setTimeout(resolve, 3000))
    //throw createError("Error occur")

    const products =  useDrizzle().select().from(productsTable).all()
    
    return {
        products
    }
});