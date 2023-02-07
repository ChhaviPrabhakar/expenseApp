const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.post('/add-expense', expenseController.postAddExpense);
router.get('/get-expense', expenseController.getExpense);
router.delete('/delete-expense/:id', expenseController.deleteExpense);
router.post('/edit-user/:id', expenseController.editExpense);

module.exports = router;