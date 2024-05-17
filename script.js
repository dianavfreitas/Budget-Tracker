class Budget {
    constructor() {
        this.totalIncome = 0;
        this.totalExpenses = 0;
        this.transactions = [];
    }

    
    addIncome(description, amount) {
        const income = {
            type: 'income',
            description: description,
            amount: parseFloat(amount)
        };
        this.transactions.push(income);
        this.totalIncome += income.amount;
        this.updateBudget();
    }

    
    addExpense(description, amount) {
        const expense = {
            type: 'expense',
            description: description,
            amount: parseFloat(amount)
        };
        this.transactions.push(expense);
        this.totalExpenses += expense.amount;
        this.updateBudget();
    }

    
    updateBudget() {
        const totalBudget = this.totalIncome - this.totalExpenses;
        document.getElementById('total-income').textContent = this.totalIncome.toFixed(2);
        document.getElementById('total-expenses').textContent = this.totalExpenses.toFixed(2);
        document.getElementById('total-balance').textContent = totalBudget.toFixed(2);
        this.renderExpenses();
    }

    
    renderExpenses() {
        const expensesList = document.getElementById('expenses-list');
        expensesList.innerHTML = '';

        this.transactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                const li = document.createElement('li');
                li.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
                expensesList.appendChild(li);
            }
        });
    }
}


const budget = new Budget();


const incomeAmountInput = document.querySelector('.budget input');
const setBudgetButton = document.querySelector('.budget button');
const expenseDescriptionInput = document.querySelector('.expenses select');
const expenseAmountInput = document.querySelector('.expenses input');
const addExpenseButton = document.querySelector('.expenses button');


setBudgetButton.addEventListener('click', () => {
    const description = 'Total Budget';
    const amount = incomeAmountInput.value.trim();
    if (amount && !isNaN(amount) && amount > 0) {
        budget.addIncome(description, amount);
        incomeAmountInput.value = '';
    } else {
        alert('Please enter a valid budget amount.');
    }
});

addExpenseButton.addEventListener('click', () => {
    const description = expenseDescriptionInput.value.trim();
    const amount = expenseAmountInput.value.trim();
    if (description !== '*Select an option*' && amount && !isNaN(amount) && amount > 0) {
        budget.addExpense(description, amount);
        expenseDescriptionInput.value = '*Select an option*';
        expenseAmountInput.value = '';
    } else {
        alert('Please enter a valid expense description and amount.');
    }
});
