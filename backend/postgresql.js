import postgresql from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = postgresql;

export default (callback = null) => {
  // NOTE: PostgreSQL creates a superuser by default on localhost using the OS username.
  const pool = new Pool({
    user: process.env.PG_USER,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    host: process.env.PG_ENDPOINT,
    port: process.env.PG_PORT,
  });
  try{
  const connection = {
    pool,
    query: (...args) => {
      return pool.connect().then((client) => {
        return client.query(...args).then((res) => {
          client.release();
          return res.rows;
        });
      });
    },
  };
  process.postgresql = connection;
  if (callback) {
    callback(connection);
  }

  return connection;
  }
  catch(error){
    return error;
  }
};