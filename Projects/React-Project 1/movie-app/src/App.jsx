import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import MovieGrid from './components/MovieGrid';
import MovieDetail from './components/MovieDetail';
import CartPage from './components/CartPage';

const API_KEY = 'a6460252'; 
const BASE_URL = 'https://www.omdbapi.com';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('batman');
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetail = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  

  const addToCart = (movie) => {
    setCart((prevCart) => {
      
      const existing = prevCart.find(item => item.imdbID === movie.imdbID);
      
      if (existing) {
        
        return prevCart.map(item =>
          item.imdbID === movie.imdbID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
      
        return [...prevCart, { ...movie, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.imdbID === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.imdbID !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleBack = () => {
    setSelectedMovie(null);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    setSelectedMovie(null);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setSelectedMovie(null);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <Header 
        cartCount={cartCount} 
        cartTotal={cartTotal}
        onCartClick={handleCartClick} 
      />

      {/* Show Cart Page */}
      {showCart && (
        <CartPage 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
          onContinueShopping={handleContinueShopping}
        />
      )}

      {/* Show Movie Detail */}
      {!showCart && selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          onBack={handleBack}
          onAddToCart={addToCart}
        />
      )}

      {/* Show Search + Grid */}
      {!showCart && !selectedMovie && (
        <>
          <SearchBox onSearch={handleSearch} />
          <MovieGrid 
            movies={movies} 
            loading={loading} 
            onSelectMovie={fetchMovieDetail}
            onAddToCart={addToCart}
          />
        </>
      )}
    </div>
  );
}

export default App;