import jwt from "jsonwebtoken";
import type { JwtUserInfo } from '../../../shared/types/jwt-user-info.ts';
export default defineEventHandler(async (event) => {
    const { token } = await readBody(event);

    if (!token) {
        throw createError({
            statusCode: 400,
            message: "No token was passed"
        })
    }
    const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtUserInfo;
    if (user) {
        return { success: true, user: { user } };
    }

    throw createError({
        statusCode: 401,
        message: ""
    })

});