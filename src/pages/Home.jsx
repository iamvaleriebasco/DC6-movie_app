import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Home(){
    const movies =[
        {id:1, title: "Avatar", release_date: "2026"},
        {id:2, title: "Pyramid Game", release_date: "2024"},
        {id:3, title: "Kimetsu No Yaiba", release_date: "2025"}
    ];
    const handleSearch =() => {};

    return (
        <div className="home">
            <form onSubmit={handleSearch}>
                <input
                type="text"
                placeholder="Search for movies...."
                className = "search-input"
                >
                </input>
            </form>
            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
                
            </div>
        </div>
    )
}

export default Home;