import Movie from "../features/movies/components/Movie";
import { NewMovie } from "../features/movies/components/NewMovie";
import Watchlist from "../features/watchlist/components/Watchlist";

const HomePage = () => {
    
    return (
        <div>
            <h1>Redux Toolkit</h1>
            <Movie />
            <h1>RTK Query</h1>
            <Watchlist />
            <h1>Add new movie</h1>
            <NewMovie />
        </div>
    )
}

export default HomePage