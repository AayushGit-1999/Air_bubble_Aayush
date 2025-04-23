import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokenId: { type: String },
  sessionId: { type: String },
  name: String,
  createdAt: { type: Date, default: Date.now },
  settings: {
    twoFactorEnabled: { type: Boolean, default: false }
  }
});

// Password hashing before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/api/users', async (req, res) => {
  try {
    const { firebaseUid, email, password, tokenId, sessionId } = req.body;

    if (!firebaseUid || !email || !password || !tokenId || !sessionId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    let user = await User.findOne({ firebaseUid });
    if (user) {
      return res.status(200).json({ message: 'User already exists', user });
    }

    user = new User({ firebaseUid, email, password, tokenId, sessionId });
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        firebaseUid: user.firebaseUid,
        email: user.email,
        sessionId: user.sessionId,
        tokenId: user.tokenId
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password, tokenId, sessionId } = req.body;

    if (!email || !password || !tokenId || !sessionId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update token and session info
    user.tokenId = tokenId;
    user.sessionId = sessionId;
    await user.save();

    res.json({
      message: 'Login successful',
      user: {
        firebaseUid: user.firebaseUid,
        email: user.email,
        sessionId: user.sessionId,
        tokenId: user.tokenId
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User by Firebase UID
app.get('/api/users/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
