import { pool } from "../../config/DB";
import bcrypt from "bcryptjs";

const userCreate = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    const hashPassword = bcrypt.hashSync(password as string, 10);

    const result = await pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashPassword, phone, role]);
    return result;
};

export const userService = {
    userCreate
}