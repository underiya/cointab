const mysql = require('mysql2');
require("dotenv").config();
const connection = mysql.createConnection(`${process.env.MYSQL_URL}?ssl-mode=REQUIRED`);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        // Handle error appropriately (e.g., exit the application)
    } else {
        console.log('Database connection successful');
        // Proceed with your database operations
    }
});

module.exports =
    connection.promise();


