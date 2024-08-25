import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import { db } from './database';
import loginRoute from './routes/loginserver';
import listingsRoute from './routes/listings';
import { deleteListingRoute } from './routes/deleteListing';
import { createNewListingRoute } from './routes/createNewListing';
import { updateListingRoute } from './routes/updateListing';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
console.log('JWT_SECRET:', SECRET_KEY); 

const server = Hapi.server({
    port: 8000,
    host: '10.10.20.153',
    routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
});

const start = async () => {
    try {
        // Register routes
        server.route(loginRoute);
        server.route(listingsRoute);
        server.route(deleteListingRoute);
        server.route(createNewListingRoute);
        server.route(updateListingRoute);


        // Connect to the database
        db.connect();

        await server.start();
        console.log(`Server is listening on ${server.info.uri}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('Stopping server...');
    await server.stop({ timeout: 10000 });
    db.end();
    console.log('Server stopped');
    process.exit(0);
});

start();
