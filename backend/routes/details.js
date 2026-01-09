import express from 'express';
const router = express.Router();
import User from '../models/details.js';
import { v4 as uuidv4 } from 'uuid';

// Function to generate a unique UUID

async function generateUniqueUUID() {
  let isUnique = false;
  let newId;

  while (!isUnique) {
    newId = uuidv4(); // Generate a new UUID
    // Check if it exists in the database
    const existing = await User.findOne({ customId: newId });
    if (!existing) {
      isUnique = true;
    }
  }
  return newId;
}

router.post('/register', async (req, res) => {
  try {
    const { url, phoneNo, username } = req.body;
    const uuid = await generateUniqueUUID();

    console.log('connected')


    // 1. Check if user already exists
    let user = await User.findOne({ phoneNo });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // 3. Save User
    user = new User({ username, url, phoneNo, uuid });
    await user.save();

    console.log('User registered with UUID:', uuid);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).send("Server error");
    console.error(err.message);
  }
});

router.post('/login', async (req, res) => {
  console.log('App connected')
  try {
    const { uuid } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ uuid });
    if (!user) return res.status(400).json({ msg: "User not found" });

    res.status(201).json({ msg: "Login successfully", user: uuid });
  } catch (err) {
    res.status(500).send("Server error");
    console.error(err.message);
  }
});

export default router;

