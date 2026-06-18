const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/hcp').then(async () => {
  const db = mongoose.connection.db;
  const users = await db.collection('users').find({role: 'admin'}).toArray();
  if (users.length > 0) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('admin123', salt);
    await db.collection('users').updateOne({_id: users[0]._id}, {$set: {password: hashed}});
    console.log('Admin email:', users[0].email);
    console.log('Password reset to: admin123');
  } else {
    console.log('No admin found. Searching all users:');
    const allUsers = await db.collection('users').find().toArray();
    console.log(allUsers.map(u => u.email));
  }
  process.exit();
}).catch(console.error);
