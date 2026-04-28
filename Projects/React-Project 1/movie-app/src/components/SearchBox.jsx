import { useState } from 'react';

function SearchBox({ onSearch }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSearch(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', margin: '30px 0' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search movies..."
        style={{
          padding: '15px 20px',
          width: '400px',
          borderRadius: '30px',
          border: '2px solid #334155',
          background: '#1e293b',
          color: 'white',
          fontSize: '16px'
        }}
      />
      <button type="submit" style={{
        padding: '15px 30px',
        marginLeft: '10px',
        borderRadius: '30px',
        border: 'none',
        background: '#fbbf24',
        color: '#0f172a',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        Search
      </button>
    </form>
  );
}

export default SearchBox;