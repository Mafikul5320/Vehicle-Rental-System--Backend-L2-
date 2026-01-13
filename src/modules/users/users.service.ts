import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/DB";
import bcrypt from "bcryptjs";

const userCreate = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    const hashPassword = bcrypt.hashSync(password as string, 10);

    const result = await pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashPassword, phone, role]);
    return result;
};

const allUser = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
};

const updateUser = async (payload: Record<string, unknown>, user: JwtPayload, paramsId: Number) => {
    const { email, name, phone, role } = payload;
    console.log(user.id);
    console.log(paramsId)

    const currentUser = user.role;
    console.log(currentUser)
    let updateRole = role;

    if (currentUser !== "admin") {
        updateRole = undefined;
    };

    const value = [];
    const update = [];
    let indx = 1;

    if (name !== undefined) {
        update.push(`name=$${indx}`);
        value.push(name);
        indx++;
    };

    if (phone !== undefined) {
        update.push(`phone=$${indx}`);
        value.push(phone);
        indx++;
    };

    if (updateRole !== undefined && currentUser === "admin") {
        update.push(`role=$${indx}`);
        value.push(updateRole);
        indx++;
    };

    if (update.length === 0) {

    };
    if (currentUser !== "admin" && user.id !== paramsId) {
        throw new Error("You can only update your own profile");
    }

    value.push(paramsId);
    console.log(value)
    const result = await pool.query(`UPDATE users SET ${update.join(", ")} WHERE id=$${indx}`, value);


    return result;
};

const deleteUser = async (payload: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [payload]);
    return result;
}



export const userService = {
    userCreate,
    allUser,
    updateUser,
    deleteUser
}