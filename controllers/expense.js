const Expense = require('../models/expense');

exports.postAddExpense = async (req, res, next) => {
    try {
        const expenseAmount = req.body.expenseAmount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await Expense.create({
            expenseAmount: expenseAmount,
            description: description,
            category: category
        })
        res.status(201).json({newExpense: data});
    } catch (err) {
        console.log(err);
    }
};

exports.getExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findAll();
        res.status(200).json({allExpense: expense});
    } catch(err) {
        console.log(err);
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        await Expense.destroy({where: { id: expenseId }});
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
    }
};

exports.editExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const editExpenseAmount = req.body.expenseAmount;
        const editDescription = req.body.description;
        const editCategory = req.body.category;

        await Expense.update({where: {
            id: expenseId,
            expenseAmount: editExpenseAmount,
            description: editDescription,
            category: editCategory
        }});
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
    }
};