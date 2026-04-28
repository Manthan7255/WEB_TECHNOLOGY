function Balance({ transactions }) {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <div className="balance">
      <h3>Your Balance</h3>
      <h2>₹{total}</h2>
    </div>
  );
}

export default Balance;