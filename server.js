const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/posts');

const app = express();
const PORT = process.env.PORT || 5000;
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extented: false }));

//Define Routes
userRoute('/api/users', app);
authRoute('/api/auth', app);
profileRoute('/api/profile', app);
postRoute('/api/posts', app);

app.listen(PORT, () => {
  console.log(`Your server is running on PORT: ${PORT}`);
});
