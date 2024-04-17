const express = require('express');
const axios = require('axios');
const { connection } = require('../config/db');

const userRouter = express.Router();

// POST route to create a new user
userRouter.post('/', async (req, res) => {
    try {
        const { id, name, email, city, phone, website, company } = req.body;

        const query = 'INSERT INTO users (id, name, email, city, phone, website, company) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const insertValues = [id, name, email, city, phone, website, company].map(value => (value !== undefined ? value : null));

        connection.execute(query, insertValues);


        res.status(201).json({ id, name, email, city, phone, website, company });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error while creating user' });
    }
});

// GET route to fetch users from an external API and check if they exist in the database
userRouter.get('/', async (req, res) => {
    try {
        // Fetch users from external API
        const externalUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
        const externalUserData = externalUsers.data;

        // Retrieve all user IDs from the database
        const dbUsers = await sqlQuery('SELECT id FROM users');
        const dbUserIds = dbUsers.map(user => user.id);
        // console.log(dbUsers)

        // Merge external data with database presence indicator
        const enrichedUserData = externalUserData.map(user => ({
            status: dbUserIds.includes(user.id) ? true : false,
            ...user,
            inDB: dbUserIds.includes(user.id)
        }));

        res.status(200).json(enrichedUserData);
    } catch (error) {
        console.error('Error in fetching and processing user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


function sqlQuery(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
module.exports = { userRouter, sqlQuery };
