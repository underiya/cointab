const express = require('express');
const postRouter = express.Router();

const axios = require('axios');
const excel = require('exceljs');
const { Readable } = require('stream');
const { connection } = require('../config/db');
const { sqlQuery } = require("./user");

// POST route to create new posts
postRouter.post('/', async (req, res) => {
    try {
        const postsData = req.body;

        const insertValues = postsData.map(post => [post.id, post.userId, post.title, post.body]);
        const query = 'INSERT INTO posts (id, userId, title, body) VALUES ?';

        await connection.query(query, [insertValues]);

        res.status(200).json({ message: 'Posts created successfully' });
    } catch (error) {
        console.error('Error creating posts:', error);
        res.status(500).json({ error: 'Error while creating posts' });
    }
});

// GET route to fetch posts for a specific userId
postRouter.get('/', async (req, res) => {
    try {
        const { userId } = req.query;

        const postsRows = await connection.execute('SELECT * FROM posts WHERE userId = ?', [userId]);

        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

        if (postsRows.length > 0) {
            return res.status(200).json({ status: true, data: response.data });
        } else {
            return res.status(200).json({ status: false, data: response.data });
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error while getting posts' });
    }
});

// GET route to download posts in Excel format for a specific userId
postRouter.get('/download/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const postsRows = await sqlQuery(`SELECT * FROM posts WHERE userId=${userId}`)
        // const dbPostIds = postsRows.map(post => post.id);
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Posts');
        worksheet.columns = [
            { header: 'UserId', key: 'userId', width: 10 },
            { header: 'PostId', key: 'id', width: 10 },
            { header: 'Title', key: 'title', width: 60 },
            { header: 'Body', key: 'body', width: 80 }
        ];

        console.log("post", postsRows);
        postsRows.forEach(post => {
            worksheet.addRow({ userId: post.userId, id: post.id, title: post.title, body: post.body });
        });

        // const bufferStream = new Readable();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=posts_${userId}.xlsx`);

        await workbook.xlsx.write(res);
        // bufferStream.pipe(res);
        res.end()
    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).json({ error: 'Error generating file' });
    }
});

module.exports = { postRouter };
