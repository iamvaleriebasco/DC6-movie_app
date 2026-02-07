import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../services/api.js";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err){
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        }catch(err) {
            console.log(err)
            setError("Failed to search movies...")
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
             type="text"
             placeholder="Search for movies..."
             className="search-input"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             />
        </form>
        
        {error && <div className="error-message">{ error }</div>}

        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie ={movie} key={movie.id} />
                ))}
            </div>
            )}
        </div>
    );
}

export default Home;