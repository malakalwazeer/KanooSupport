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
            const updateResult = await db.query(`
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

            console.log('Update result:', JSON.stringify(updateResult, null, 2));

            // Retrieve updated record
            const updatedResult = await db.query(
                'SELECT * FROM listings WHERE id=? AND user_id=?',
                [id, userId]
            );

            console.log('Updated result:', JSON.stringify(updatedResult, null, 2));

            // Check the structure of updatedResult
            const updatedRows = updatedResult.results;// updatedResult.rows || updatedResult;
            
            if (Array.isArray(updatedRows) && updatedRows.length > 0) {

                return h.response(updatedRows[0]).code(200);
                
            } else {
                return h.response({ error: 'Listing not found after update' }).code(404);
            }
        } catch (err) {
            console.error('Error updating data:', err.message, err.stack);
            return h.response({ error: 'Failed to update listing' }).code(500);
        }
    }
};
