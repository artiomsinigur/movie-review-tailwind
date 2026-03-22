import Movie from "../features/movies/components/Movie";
import Watchlist from "../features/watchlist/components/Watchlist";

const HomePage = () => {
    
    return (
        <div>
            <h1>Redux Toolkit</h1>
            <Movie />
            <h1>RTK Query</h1>
            <Watchlist />
        </div>
    )
}

export default HomePage