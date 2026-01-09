import express from 'express';
import {} from './routes/details.js'; // Import routes properly
import cors from 'cors';
import mongoose from 'mongoose';
import Details from './routes/details.js'

// import { fileURLToPath } from "url";


const app = express();

// Connect to Database - You must ADD parentheses () to call the function
app.use(express.urlencoded({extended:true, limit: '200mb'}))
app.use(express.json({limit: '200mb' }));

app.use(cors({
  origin: true, // reflects request origin automatically
  credentials: true
}));

// Use the imported routes
app.use('/api', Details);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



// app.use(express.static(path.join(__dirname, "../frontend/dist")))
// app.get("/slug", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// })



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