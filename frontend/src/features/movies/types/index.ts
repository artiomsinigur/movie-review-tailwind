// Matches the JSON sent from your backend Controller
export interface Movie {
    id: number,
    title:string,
    rating: string,
    imdb: number,
    duration: number,
    release_date: number,
    director: string,
    music_composed_by: string,
    distributed_by: string,
    budget: number,
    genre: string[],
    trailer_url: string,
    poster_url: string,
    description: string,
    created_at: string,
    updated_at: string
}

// Using this pattern Omit keeps your types DRY by deriving NewMovieRequest from Movie 
// rather than manually redefining all the fields. If you later add properties to Movie, 
// NewMovieRequest automatically gets them too—minus the id.
export type NewMovieRequest = Omit<Movie, 'id'>;

export interface MovieState {
    value: number
}
