import('mongoose').then(async (mongooseModule) => {
  const mongoose = mongooseModule.default;
  const ChatHistory = (await import('./models/chatHistory.models.js')).default;
  await mongoose.connect('mongodb://localhost:27017/BrieflyDB');
  
  await ChatHistory.updateMany({}, { $set: { messages: [] } });
  
  console.log('Cleared all chat histories');
  process.exit();
});
