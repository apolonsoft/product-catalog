
const databases = ["apple", "orange", "banana"];

export default defineEventHandler(async (event) => {

    //await new Promise((resolve) => setTimeout(resolve, 3000))
    //throw createError("Error occur")
    
    return {
        databases
    }
});