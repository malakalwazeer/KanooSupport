import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../database';
import dotenv from 'dotenv';


dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

const loginRoute = {
    method: 'POST',
    path: '/api/login',
    handler: async (request, h) => {
        const { UserName, Password } = request.payload;


        try {
            const results = await db.query('SELECT * FROM users WHERE username = ?', [UserName]);
            if (results && results.results) {
                const user = results.results[0];
                
                const salt = user.PasswordSalt;

                if (user && await bcrypt.compare(Password, user.Password)) {
                    const token = jwt.sign({ userId: user.id, UserName: user.UserName }, SECRET_KEY, { expiresIn: '1h' });
                    return h.response({ token }).code(200);
                } else {
                    return Boom.unauthorized('Invalid credentials');
                }

            }
            return Boom.unauthorized('Invalid credentials');

        } catch (err) {
            console.error(err);
            return Boom.internal('An error occurred');
        }
    }
};

export default loginRoute;
