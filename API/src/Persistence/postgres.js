const { Client } = require("pg");
const { parseInsertData, parseQueryData } = require("./parsers");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const dbConfig = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
};

let connection;

function handleConn() {
  connection = new Client(dbConfig);
  connection.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleConn, 2000);
    } else {
      console.log("DB Connected");
    }
  });

  connection.on("error", (err) => {
    console.error("[db err]", err);
    if (err.code === "CONNECTION_EXCEPTION") {
      handleConn();
    } else {
      throw err;
    }
  });
}

handleConn();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, result) => {
      if (error) return reject(error);

      resolve(result.rows);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id = '${id}'`,
      (error, result) => {
        if (error) return reject(error);

        resolve(result.rows);
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    query = `INSERT INTO ${table} (${Object.keys(
      data
    )}) VALUES (${parseInsertData(Object.values(data))})`;

    connection.query(query, (error, result) => {
      if (error) return reject(error);

      resolve({
        command: result.command,
        rowCount: result.rowCount,
      });
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    query = `UPDATE ${table} SET ${parseQueryData(data)} WHERE id = '${
      data.id
    }'`;
    console.log(query);

    connection.query(query, (error, result) => {
      if (error) return reject(error);

      resolve({
        command: result.command,
        rowCount: result.rowCount,
      });
    });
  });
}

function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    query = `SELECT * FROM ${table} ${joinQuery} WHERE ${parseQueryData(
      query
    )}`;
    console.log(query);

    connection.query(query, (error, result) => {
      if (error) return reject(error);

      resolve(result.rows);
    });
  });
}

function remove(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${table} WHERE id = '${id}'`,
      (error, result) => {
        if (error) return reject(error);

        resolve(result.rows);
      }
    );
  });
}

module.exports = {
  list,
  get,
  insert,
  update,
  remove,
  query,
};
