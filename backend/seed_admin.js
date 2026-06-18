const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/hcp').then(async () => {
  const db = mongoose.connection.db;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('admin123', salt);
  await db.collection('users').insertOne({
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashed,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  console.log('Admin user created:');
  console.log('Email: admin@example.com');
  console.log('Password: admin123');
  process.exit();
}).catch(console.error);
