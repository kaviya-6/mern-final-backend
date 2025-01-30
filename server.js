const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const server = express();
server.use(cors()); 
server.use(express.json()); 


const mongoURI = process.env.mongo_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not defined in the .env file.');
  process.exit(1);
}

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => console.error('MongoDB connection error:', error));


const budgetSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: String,
});

const Budget = mongoose.model('Budget', budgetSchema);


server.post('/api/budgets', async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(400).json({ message: 'Error saving budget', error });
  }
});


server.get('/api/budgets', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budgets', error });
  }
});

server.delete('/api/budgets/:id', async (req, res) => {
  try {
    const budgetId = req.params.id; 
    const deletedBudget = await Budget.findByIdAndDelete(budgetId);  

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    res.status(200).json({ message: 'Budget deleted successfully', deletedBudget });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget', error });
  }
});


server.put('/api/budgets/:id', async (req, res) => {
  try {
    const budgetId = req.params.id; 
    const updatedBudget = await Budget.findByIdAndUpdate(budgetId, req.body, { new: true });  

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    res.status(200).json({ message: 'Budget updated successfully', updatedBudget });
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget', error });
  }
});


const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
