class Budget {
    constructor() {
        // Initialize total income, total expenses, and an array to store transactions
        this.totalIncome = 0;
        this.totalExpenses = 0;
        this.transactions = [];
    }

    // Method to add income to the budget
    addIncome(description, amount) {
        // Create an income object
        const income = {
            type: 'income',
            description: description,
            amount: parseFloat(amount)
        };
        // Add the income to the transactions array
        this.transactions.push(income);
        // Increase total income
        this.totalIncome += income.amount;
        // Update the budget display
        this.updateBudget();
    }

    // Method to add an expense to the budget
    addExpense(description, amount) {
        // Create an expense object
        const expense = {
            type: 'expense',
            description: description,
            amount: parseFloat(amount)
        };
        // Add the expense to the transactions array
        this.transactions.push(expense);
        // Increase total expenses
        this.totalExpenses += expense.amount;
        // Update the budget display
        this.updateBudget();
    }

    // Method to update the budget display
    updateBudget() {
        // Calculate the total budget (income - expenses)
        const totalBudget = this.totalIncome - this.totalExpenses;
        // Update the display for total income, total expenses, and total balance
        document.getElementById('total-income').textContent = this.totalIncome.toFixed(2);
        document.getElementById('total-expenses').textContent = this.totalExpenses.toFixed(2);
        document.getElementById('total-balance').textContent = totalBudget.toFixed(2);
        // Render the list of expenses
        this.renderExpenses();
    }

    // Method to render the list of expenses
    renderExpenses() {
        // Get the element to display expenses
        const expensesList = document.getElementById('expenses-list');
        // Clear any existing expenses
        expensesList.innerHTML = '';

        // Loop through transactions and display each expense
        this.transactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                const li = document.createElement('li');
                li.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)}`;
                expensesList.appendChild(li);
            }
        });
    }
}

// Create a new budget instance
const budget = new Budget();

// Select DOM elements for income and expense inputs and buttons
const incomeAmountInput = document.querySelector('.budget input');
const setBudgetButton = document.querySelector('.budget button');
const expenseDescriptionInput = document.querySelector('.expenses select');
const expenseAmountInput = document.querySelector('.expenses input');
const addExpenseButton = document.querySelector('.expenses button');

// Add event listener to set the budget
setBudgetButton.addEventListener('click', () => {
    const description = 'Total Budget';
    const amount = incomeAmountInput.value.trim();
    // Check if the input amount is valid
    if (amount && !isNaN(amount) && amount > 0) {
        // Add income to the budget
        budget.addIncome(description, amount);
        // Clear the input field
        incomeAmountInput.value = '';
    } else {
        // Alert if the input amount is invalid
        alert('Please enter a valid budget amount.');
    }
});

// Add event listener to add an expense
addExpenseButton.addEventListener('click', () => {
    const description = expenseDescriptionInput.value.trim();
    const amount = expenseAmountInput.value.trim();
    // Check if the input description and amount are valid
    if (description !== '*Select an option*' && amount && !isNaN(amount) && amount > 0) {
        // Add expense to the budget
        budget.addExpense(description, amount);
        // Reset the input fields
        expenseDescriptionInput.value = '*Select an option*';
        expenseAmountInput.value = '';
    } else {
        // Alert if the input description or amount is invalid
        alert('Please enter a valid expense description and amount.');
    }
});

