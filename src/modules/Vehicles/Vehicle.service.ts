import { pool } from "../../config/DB"

const VehicleCreate = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await pool.query(`INSERT INTO Vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1, $2, $3, $4, $5 ) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status])

    return result;
};

const allVehicle = async () => {
    const result = await pool.query(`SELECT * FROM Vehicles`);
    return result;
};

const singlevehicle = async (payload: Record<string, unknown>) => {
    console.log(payload)
    const { vehicleId } = payload;
    const result = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`, [vehicleId]);
    return result;
};

const updateVehicle = async (id: number, payload: Record<string, unknown>) => {
    const { daily_rent_price, availability_status } = payload;
    const result = await pool.query(`UPDATE Vehicles SET daily_rent_price=$1 ,availability_status=$2 WHERE id=$3 RETURNING *`, [daily_rent_price, availability_status, id]);
    return result;
}

const deleteVehicle = async (id: number) => {
    const result = await pool.query(`DELETE FROM Vehicles WHERE id=$1`, [id]);
    return result;
}

export const vehicleService = {
    VehicleCreate,
    allVehicle,
    singlevehicle,
    updateVehicle,
    deleteVehicle
}