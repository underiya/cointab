const express = require('express');
const { userRouter } = require('./src/routes/user');
const { postRouter } = require('./src/routes/post');
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors())
// Routes
app.use('/users', userRouter);
app.use('/posts', postRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
