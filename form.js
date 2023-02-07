const myForm = document.getElementById('form');
const exAmoInput = document.getElementById('exAmo');
const choDesInput = document.getElementById('choDes');
const choCatInput = document.getElementById('choCat');

myForm.addEventListener('submit', postDetails)

async function postDetails(e) {
    e.preventDefault();
    var obj = {
        expenseAmount: exAmoInput.value,
        description: choDesInput.value,
        category: choCatInput.value
    }

    try {
        const response = await axios
            .post('http://localhost:8000/expense/add-expense', obj)
        addExpenseOnScreen(response.data.newExpense)
    } catch (err) {
        console.log(err);
    };

    //clearing fields for best experience
    exAmoInput.value = '';
    choDesInput.value = '';
    choCatInput.value = '';
}

function addExpenseOnScreen(expense) {

    let parentNode = document.getElementById('expenseList');
    let childHTML = `<li id=${expense.id}> ${expense.expenseAmount} - ${expense.description} - ${expense.category}
    <button type=del onclick= deleteExpense('${expense.id}')> Delete Expense </button>
    <button type=edit onclick= editExpense('${expense.expenseAmount}','${expense.description}','${expense.category}','${expense.id}')> Edit Expense </button>
    </li>`;
    parentNode.innerHTML += childHTML;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios
            .get('http://localhost:8000/expense/get-expense')
            console.log(response.data.allExpense);
        for (var i = 0; i < response.data.allExpense.length; i++) {
            addExpenseOnScreen(response.data.allExpense[i]);
        }
    } catch (err) {
        console.log(err);
    }
});

async function deleteExpense(expenseId) {
    try {
        const response = await axios
            .delete(`http://localhost:8000/expense/delete-expense/${expenseId}`)
        removeExpenseFromScreen(expenseId)
    } catch (err) {
        console.log(err);
    }
}

function removeExpenseFromScreen(expenseId) {
    let parentNode = document.getElementById('expenseList');
    childNodeToBedeleted = document.getElementById(expenseId);
    if (childNodeToBedeleted) {
        parentNode.removeChild(childNodeToBedeleted);
    }
}

function editExpense(expenseA, chooseD, chooseC, expenseId) {
    document.getElementById('exAmo').value = expenseA;
    document.getElementById('choDes').value = chooseD;
    document.getElementById('choCat').value = chooseC;
    deleteExpense(expenseId);
}