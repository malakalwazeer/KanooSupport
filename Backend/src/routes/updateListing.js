import { db } from '../database';

export const updateListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const { id } = req.params;
        const {
            Date: ListingDate,
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
            Remarks
        } = req.payload;

        const userId = '12345';
        const ModifyUserId = '12345';
        const ModifyDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            // Update the record
            await db.query(`
                UPDATE listings
                SET Date=?, KITREF_NO=?, Month=?, LENOVO_CLAIM=?, Customer=?, Machine_Type=?, Serial_NO=?, 
                    Warranty_Expiry=?, Warranty_Type=?, DEF_FRU=?, DEF_SERIAL_NO=?, REP_FRU=?, REP_SNO=?, 
                    Problem_Reported=?, Action_Taken=?, Recieved_Date=?, Remarks=?, ModifyUserId=?, ModifyDate=?
                WHERE id=? AND user_id=?
            `, [
                ListingDate, KITREF_NO, Month, LENOVO_CLAIM, Customer, Machine_Type, Serial_NO, 
                Warranty_Expiry, Warranty_Type, DEF_FRU, DEF_SERIAL_NO, REP_FRU, REP_SNO, 
                Problem_Reported, Action_Taken, Recieved_Date, Remarks, ModifyUserId, ModifyDate, id, userId
            ]);

            // Retrieve updated record
            const { rows: updatedResult } = await db.query(
                'SELECT * FROM listings WHERE id=? AND user_id=?',
                [id, userId]
            );

            if (updatedResult.length > 0) {
                return h.response(updatedResult[0]).code(200);
            } else {
                return h.response({ error: 'Listing not found after update' }).code(404);
            }
        } catch (err) {
            console.error('Error updating data:', err);
            return h.response({ error: 'Failed to update listing' }).code(500);
        }
    }
};

