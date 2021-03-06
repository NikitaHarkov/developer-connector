const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');

const app = express();
const PORT = process.env.PORT || 5000;
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extented: false }));

//Define Routes
// app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

userRoute('/api/users', app);
authRoute('/api/auth', app);

app.listen(PORT, () => {
  console.log(`Your server is running on PORT: ${PORT}`);
});
