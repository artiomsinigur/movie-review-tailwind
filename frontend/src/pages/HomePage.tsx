import Movie from "../features/movies/components/Movie";
import { NewMovie } from "../features/movies/components/NewMovie";
import Watchlist from "../features/watchlist/components/Watchlist";
import Assets from "../assets";

const HomePage = () => {
    
    return (
        <div className="p-8">
            <header className="mb-8">
                <img src={Assets.images.hero} alt="Hero" className="w-full h-64 object-cover rounded-xl shadow-lg mb-4" />
                <h1 className="text-4xl font-bold">Redux Toolkit & RTK Query</h1>
            </header>
            
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">State Management (Slice)</h2>
                <img className="size-1/3" src="/images/photo1.jpg"></img>
                <Movie />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-purple-600">Data Fetching (RTK Query)</h2>
                <Watchlist />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-600">Mutation Example</h2>
                <NewMovie />
            </section>
        </div>
    )
}

export default HomePage