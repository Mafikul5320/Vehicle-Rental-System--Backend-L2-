import { pool } from "../../config/DB";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";

const loginUser = async (payload: Record<string, unknown>) => {
    const { email, password, role } = payload;
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (result.rows.length === 0) {
        return null;
    };
    const user = result.rows[0];

    const isMatchPass = await bcrypt.compare(password as string, user.password);

    if (!isMatchPass) {
        throw new Error("Invalid password..");
    };

    const token = jwt.sign({
        name: user.name,
        email: user.email,
        role: user.role
    }, config.secretPrivateKey as string, {
        expiresIn: "1h"
    })


    return {
        user,
        token
    };
};

export const authService = {
    loginUser,
}