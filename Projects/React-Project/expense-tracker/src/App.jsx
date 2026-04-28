import { useState, useEffect } from 'react';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';

function App() {
  // State: data that changes over time
  const [transactions, setTransactions] = useState([
    { id: 1, text: 'Salary', amount: 50000 },
    { id: 2, text: 'Rent', amount: -15000 },
    { id: 3, text: 'Groceries', amount: -3000 },
    { id: 4, text: 'Freelance', amount: 10000 },
  ]);

// Replace the useEffect in App.jsx with this:

useEffect(() => {
  // Load from localStorage on first render
  const saved = localStorage.getItem('transactions');
  if (saved) {
    setTransactions(JSON.parse(saved));
  }
}, []); // Empty array = run only once (page load)

useEffect(() => {
  // Save to localStorage whenever transactions change
  localStorage.setItem('transactions', JSON.stringify(transactions));
}, [transactions]); // Runs whenever transactions change

  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      
      {/* Props: passing data from parent to child */}
      <Balance transactions={transactions} />
      <IncomeExpenses transactions={transactions} />
      <TransactionList 
        transactions={transactions} 
        onDelete={deleteTransaction} 
      />
      <AddTransaction onAdd={addTransaction} />
    </div>
  );
}

export default App;