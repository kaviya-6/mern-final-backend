import Budget from '../models/Budget.js';

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addBudget = async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const newBudget = new Budget({ title, amount, category });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
