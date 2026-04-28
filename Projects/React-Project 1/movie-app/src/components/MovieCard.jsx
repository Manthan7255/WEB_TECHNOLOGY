function MovieCard({ movie, onClick, onAddToCart }) {
  const price = (movie.imdbID.charCodeAt(2) % 15) + 5;

  return (
    <div style={{
      background: '#1e293b',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.3s',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    }}>
      <div onClick={() => onClick(movie.imdbID)} style={{ cursor: 'pointer' }}>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
          alt={movie.Title}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
      </div>

      <div style={{ padding: '15px' }}>
        <h3 
          onClick={() => onClick(movie.imdbID)}
          style={{ 
            fontSize: '15px', 
            marginBottom: '8px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {movie.Title}
        </h3>
        
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '10px' }}>
          📅 {movie.Year}
        </p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <span style={{ 
            color: '#22c55e', 
            fontSize: '22px', 
            fontWeight: 'bold' 
          }}>
            ₹{price}
          </span>
          
          <button
            onClick={() => onAddToCart({ ...movie, price })}
            style={{
              background: '#22c55e',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;