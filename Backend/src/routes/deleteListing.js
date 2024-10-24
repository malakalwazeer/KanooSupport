import { db } from '../database';

export const deleteListingRoute = {
    method: 'DELETE',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return h.response({ error: 'Invalid ID' }).code(400);
        }

        const query = 'UPDATE listings SET IsDeleted = 1 WHERE id = ?';

        try {
            // Execute the soft delete query
            const result = await db.query(query, [id]);

            // Log result for debugging
            console.log('Query result:', result);

            // Check if any rows were affected
            if (result.affectedRows === 0) {
                return h.response({ error: 'Listing not found' }).code(404);
            }

            return h.response('Success!').code(200)//{ message: 'Success!' };
        } catch (error) {
            console.error('Error executing query:', error); // Log entire error object
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    }
};
