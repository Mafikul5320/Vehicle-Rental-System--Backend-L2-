import { pool } from "../../config/DB";

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

export const BookingService = {
    CreateBooking,
}