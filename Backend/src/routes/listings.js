import Boom from '@hapi/boom';
import { db } from '../database';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

const validateAuth = async (request, h) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return Boom.unauthorized('Authentication required');
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        request.user = decoded;
        return h.continue;
    } catch (err) {
        console.error('Token verification error:', err);
        return Boom.unauthorized('Invalid or expired token');
    }
};

const listingsRoute = {
    method: 'GET',
    path: '/api/listings',
    options: {
        pre: [validateAuth]
    },
    handler: (request, h) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM listings WHERE IsDeleted = 0', (err, results) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(Boom.internal('An error occurred while fetching listings'));
                }
                console.log('Query result:', results); // Log the result
                resolve(h.response(results).code(200));
            });
        });
    }
    
};



export default listingsRoute;

