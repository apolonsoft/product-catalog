import { seed } from "drizzle-seed";
import { productsTable } from "../db/schema";
import { useDrizzle } from "../utils/drizzle";
import { drizzle } from "drizzle-orm/better-sqlite3";
export default defineEventHandler(async (event) => {
    const productCount = await useDrizzle().$count(productsTable);
    if (productCount === 0) {
        const db = drizzle(process.env.DATABASE_URL!);
        await seed(db, { productsTable });
    }
    const products = useDrizzle().select().from(productsTable).all()

    return {
        products
    }
});