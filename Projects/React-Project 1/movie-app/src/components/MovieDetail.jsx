function MovieDetail({ movie, onBack, onAddToCart }) {
  const price = (movie.imdbID.charCodeAt(2) % 15) + 5;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px' }}>
      <button 
        onClick={onBack}
        style={{
          background: '#fbbf24',
          border: 'none',
          padding: '12px 25px',
          borderRadius: '25px',
          cursor: 'pointer',
          marginBottom: '30px',
          fontWeight: 'bold',
          fontSize: '15px'
        }}
      >
        ← Back to Search
      </button>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
          alt={movie.Title}
          style={{ 
            borderRadius: '15px', 
            width: '320px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
          }}
        />

        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>
            {movie.Title}
          </h1>
          
          <p style={{ color: '#fbbf24', fontSize: '20px', marginBottom: '20px' }}>
            ⭐ {movie.imdbRating} | 📅 {movie.Year} | ⏱️ {movie.Runtime}
          </p>

          <p style={{ 
            color: '#cbd5e1', 
            lineHeight: '1.8', 
            fontSize: '16px',
            marginBottom: '25px'
          }}>
            {movie.Plot}
          </p>

          <div style={{
            background: '#22c55e',
            padding: '25px',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Price</p>
              <p style={{ margin: 0, fontSize: '36px', fontWeight: 'bold' }}>₹{price}</p>
            </div>
            <button
              onClick={() => onAddToCart({ ...movie, price })}
              style={{
                background: 'white',
                color: '#22c55e',
                border: 'none',
                padding: '15px 35px',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              🛒 Add to Cart
            </button>
          </div>

          <div style={{ marginTop: '25px', lineHeight: '2' }}>
            <p><strong style={{ color: '#fbbf24' }}>Genre:</strong> {movie.Genre}</p>
            <p><strong style={{ color: '#fbbf24' }}>Director:</strong> {movie.Director}</p>
            <p><strong style={{ color: '#fbbf24' }}>Actors:</strong> {movie.Actors}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;