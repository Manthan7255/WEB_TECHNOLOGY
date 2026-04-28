import { useState } from 'react';

function AddTransaction({ onAdd }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload

    if (!text || !amount) {
      alert('Please fill both fields!');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount // converts string to number
    };

    onAdd(newTransaction);
    setText('');     // Clear input
    setAmount('');   // Clear input
  };

  return (
    <div>
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Description</label>
          <input 
            type="text" 
            placeholder="Enter description..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Amount</label>
          <input 
            type="number" 
            placeholder="Enter amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <p className="hint">
          <strong>Negative (-) = Expense</strong> | <strong>Positive (+) = Income</strong>
        </p>
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;