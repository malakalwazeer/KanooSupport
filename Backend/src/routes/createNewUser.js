import bcrypt from 'bcryptjs';
import { db } from '../database';  // Ensure this path is correct and db is properly configured

export const createNewUserRoute = {
    method: 'POST',
    path: '/api/users',  // Ensure the path starts with a leading '/'
    handler: async (request, h) => {
        const { id, UserName, Password, EmailAddress, FirstName, LastName,PasswordSalt } = request.payload;
        try {
            const rand = await bcrypt.genSalt(16);
            const hashedPassword = await bcrypt.hash(Password, rand);  // Use 10 for bcrypt salt rounds
            await db.query('INSERT INTO users (id, UserName, Password, EmailAddress, FirstName,LastName,PasswordSalt) VALUES (?, ?, ?, ?, ?, ?,?)', [id, UserName, hashedPassword, EmailAddress, FirstName, LastName,rand]);
            return h.response({ message: 'User registered' }).code(201);
        } catch (error) {
            console.error(error);
            return h.response({ message: 'Database error' }).code(500);
        }
    }
};