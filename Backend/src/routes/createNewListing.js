import { v4 as uuid } from 'uuid';
import { db } from '../database';

export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
        const id = uuid();
        const {
            listingDate='', // Renamed from Date to avoid conflict
            KITREF_NO = '',
            Month = '',
            LENOVO_CLAIM = '',
            Customer = '',
            Machine_Type = '',
            Serial_NO = '',
            Warranty_Expiry = '',
            Warranty_Type = '',
            DEF_FRU = '',
            DEF_SERIAL_NO = '',
            REP_FRU = '',
            REP_SNO = '',
            Problem_Reported = '',
            Action_Taken = '',
            Recieved_Date='',
            Remarks = ''
        } = req.payload;

        // Set default values
        const CreateUserId = 12345; // Assuming it's an integer
        const userId = '12345';
        const views = 0;

        // Define currentDate in MySQL DATETIME format
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Converts to 'YYYY-MM-DD HH:MM:SS'

        try {
            await db.query(`
                INSERT INTO listings (
                    id, listingDate, KITREF_NO, Month, LENOVO_CLAIM, Customer, Machine_Type, Serial_NO, 
                    Warranty_Expiry, Warranty_Type, DEF_FRU, DEF_SERIAL_NO, REP_FRU, REP_SNO, 
                    Problem_Reported, Action_Taken, Recieved_Date, Remarks, CreateUserId, CreateDate, 
                    user_id, views
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?
                ); 
            `,
                [
                    id,
                    listingDate, // Use the renamed property here
                    KITREF_NO,
                    Month,
                    LENOVO_CLAIM,
                    Customer,
                    Machine_Type,
                    Serial_NO,
                    Warranty_Expiry,
                    Warranty_Type,
                    DEF_FRU,
                    DEF_SERIAL_NO,
                    REP_FRU,
                    REP_SNO,
                    Problem_Reported,
                    Action_Taken,
                    Recieved_Date,
                    Remarks,
                    CreateUserId,
                    currentDate,         // Use the defined currentDate here
                    userId,
                    views
                ]
            );

            return {
                id,
                listingDate, // Use the renamed property here
                KITREF_NO,
                Month,
                LENOVO_CLAIM,
                Customer,
                Machine_Type,
                Serial_NO,
                Warranty_Expiry,
                Warranty_Type,
                DEF_FRU,
                DEF_SERIAL_NO,
                REP_FRU,
                REP_SNO,
                Problem_Reported,
                Action_Taken,
                Recieved_Date,
                Remarks,
                CreateUserId,
                CreateDate: currentDate,  // Use the defined currentDate here
                user_id: userId,
                views
            };
        } catch (err) {
            console.error('Error inserting data:', err.message);  // More detailed logging
            return h.response({ error: 'Failed to create listing' }).code(500);
        }
    }
};
