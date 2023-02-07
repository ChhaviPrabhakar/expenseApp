const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const { deepStrictEqual } = require('assert');

const app = express();

app.use(cors());
app.use(express.json());

const expenseRoute = require('./routes/expense');

app.use('/expense', expenseRoute);

sequelize.sync().then(result => {
    // console.log(result);
    app.listen(8000);
}).catch(err => {
    console.log(err);
});