const path = require('path');

module.exports = ({ env }) => {
    const client = env('DATABASE_CLIENT');

    const connections = {
        postgres: {
            connection: {
                connectionString: env('POSTGRES_URL'),
                host: env('POSTGRES_HOST'),
                database: env('POSTGRES_DATABASE'),
                user: env('POSTGRES_USER'),
                password: env('POSTGRES_PASSWORD'),
            },
            pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
        },
    };

    return {
        connection: {
            client,
            ...connections[client],
            acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
        },
    };
};
