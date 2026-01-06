import { Pool } from "pg"

export const pool = new Pool({
    connectionString: `${process.env.DB_CONNECTION}`
});

export const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR (150) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL
        CHECK (email = LOWER(email)),
        password TEXT NOT NULL
        CHECK (LENGTH(password)>=6),
        phone VARCHAR(15) UNIQUE NOT NULL,
        role TEXT CHECK(role IN ('admin' ,'customer')) NOT NULL
        )
        `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS Vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type TEXT CHECK(type IN('car','bike', 'van','SUV')) NOT NULL,
            registration_number VARCHAR(200) UNIQUE NOT NULL,
            daily_rent_price NUMERIC CHECK(daily_rent_price > 0) NOT NULL,
            availability_status TEXT CHECK(availability_status IN ('available', 'booked'))
            )
            `)

    await pool.query(`
            CREATE TABLE IF NOT EXISTS Bookings(
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL ,
            total_price NUMERIC CHECK(total_price > 0) NOT NULL,
            status TEXT CHECK(status IN ('active','cancelled','returned')),
            CHECK(rent_start_date < rent_end_date)
            )
            `)
};

