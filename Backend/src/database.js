import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hapi-server',
    password: 'abc123',
    database: 'mtsa-lenovo',
});

export const db = {
    connect: () => connection.connect((err) => {
        if (err) {
            console.error('Database connection error:', err);
            throw err;
        }
        console.log('Database connected');
    }),
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) {
                    console.error('Database query error:', error);
                    reject(error);
                }
                resolve({ results, fields });
            });
        }),
    end: () => connection.end((err) => {
        if (err) {
            console.error('Database disconnection error:', err);
            throw err;
        }
        console.log('Database disconnected');
    }),
}
