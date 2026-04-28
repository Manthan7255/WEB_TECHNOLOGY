import MovieCard from './MovieCard';

function MovieGrid({ movies, loading, onSelectMovie, onAddToCart }) {
  
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #334155',
          borderTop: '5px solid #fbbf24',
          borderRadius: '50%',
          margin: '0 auto',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px', color: '#94a3b8' }}>Loading movies...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#94a3b8', padding: '50px' }}>
        🎬 No movies found. Try another search.
      </p>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '25px',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.imdbID}
          movie={movie}
          onClick={onSelectMovie}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default MovieGrid;