import express from 'express';
import {} from './routes/details.js'; // Import routes properly
import cors from 'cors';
import mongoose from 'mongoose';
import Details from './routes/details.js'

const app = express();

// Connect to Database - You must ADD parentheses () to call the function
app.use(cors())
app.use(express.json());

// Use the imported routes
app.use('/api', Details);

const PORT = 3000;
mongoose.connect('mongodb+srv://suhasnayaj_db_user:YGrnAW1flbWdv1g0@iot-aipay.ded0rc6.mongodb.net/?appName=IOT-AIpay')
  .then(() => {
    console.log('✅ MongoDB Connected...');
    
    // ONLY start the server if the DB connection is successful
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    // Exit process with failure
    process.exit(1);
  });

  app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });