import { int, sqliteTable,text } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable('products', {
    id: int().primaryKey({
        autoIncrement: true
    }),
    name: text().notNull(),
    description: text()
});

export const usersTable = sqliteTable('users', {
    id: int().primaryKey({
        autoIncrement: true
    }),
    username: text().notNull(),
    password: text().notNull()
})