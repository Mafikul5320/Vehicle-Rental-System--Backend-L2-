import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/DB";
import { response } from "express";

const CreateBooking = async (payload: Record<string, unknown>) => {
    const { vehicle_id, rent_start_date, rent_end_date, customer_id } = payload;

    const BookVehicle = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`, [vehicle_id]);

    if (BookVehicle.rows.length === 0) {
        throw new Error("Vehicle not found");
    }
    const available = BookVehicle.rows[0].availability_status;
    const daily_rent = Number(BookVehicle.rows[0].daily_rent_price);

    if (available !== "available") {
        throw new Error("Vehicle is not available")
    };

    const startdate = new Date(rent_start_date as string);
    const endtdate = new Date(rent_end_date as string);


    const diffTime = endtdate.getTime() - startdate.getTime();
    const NumberOfDays = diffTime / (1000 * 60 * 60 * 24);

    if (NumberOfDays <= 0) {
        throw new Error("rent_end_date must be after rent_start_date");
    };

    const total_price = daily_rent * NumberOfDays;
    const status = "active";

    const result = await pool.query(`INSERT INTO Bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES ($1,$2, $3, $4 , $5,$6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);

    if (result.rowCount !== 1) {
        throw new Error("Vehicle Booking Create faild");
    };

    await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id]);

    const response = await pool.query(`
        SELECT 
        b.id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,

        json_build_object(
        'name',u.name,
        'email',u.email
        ) AS customer,

        json_build_object(
        'vehicle_name',v.vehicle_name,
        'registration_number',v.registration_number
        ) AS vehicle

        FROM bookings b
        JOIN users u ON b.customer_id = u.id
        JOIN Vehicles v ON b.vehicle_id = v.id
        WHERE b.id=$1
        `, [result.rows[0].id]);

    return response.rows[0];
};

const AllBooking = async (Currentuser: JwtPayload) => {
    console.log(Currentuser)


    if (Currentuser.role === "customer") {
        const result = await pool.query(`SELECT * FROM Bookings WHERE customer_id=$1`, [Currentuser.id]);

        const response = await pool.query(`SELECT 
            b.id,
            b.vehicle_id,
            b.rent_start_date,
            b.rent_end_date,
            b.total_price,
            b.status,

            json_build_object(
            "vehicle_name", v.vehicle_name,
            "registration_number",  v.registration_number,
            "type", v.type
            ) AS vehicle

            FROM Bookings b
            JOIN users u ON b.customer_id = u.id
            JOIN Vehicles v ON b.vehicle_id =v.id
            WHERE b.id=$1
            
            `, [result.rows[0].id])
        return response.rows;

    }
    if (Currentuser.role === "admin") {
        const response = await pool.query(`SELECT 
            b.id,
            b.customer_id,
            b.vehicle_id,
            b.rent_start_date,
            b.rent_end_date,
            b.total_price,
            b.status,

            json_build_object(
            "name", u.name,
            "email", u.email
            ) AS customer,

            json_build_object(
            "vehicle_name", v.vehicle_name,
            "registration_number",  v.registration_number
            ) AS vehicle

            FROM Bookings b
            JOIN users u ON b.customer_id = u.id
            JOIN Vehicles v ON b.vehicle_id =v.id

            
            `)
        return response.rows;
    }
};

const UpdateBooking = async (payload: Record<string, unknown>, user: JwtPayload, id: number) => {
    const { status } = payload;
    const today = new Date();
    const result = await pool.query(`SELECT * FROM Bookings WHERE id=$1`, [id]);
    console.log(result.rows[0].rent_start_date, today);

    if (user.role === "customer") {
        if (today <= result.rows[0].rent_start_date) {
            throw new Error("Can't cancel Booking..")
        } else {
            const Upstatus = await pool.query(`UPDATE Bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, id]);
            return Upstatus.rows[0]
        }
    };
    if (user.role === "admin") {

    }

}

export const BookingService = {
    CreateBooking,
    AllBooking,
    UpdateBooking
}