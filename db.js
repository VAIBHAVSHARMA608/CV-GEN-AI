const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/myResumeDB'; // or use 'localhost'

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 s timeout
  family: 4 // enforce IPv4, avoids IPv6 issues
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
