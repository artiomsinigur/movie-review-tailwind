import { useGetFakeWatchlistQuery } from "../api/watchlistApi";

export default function Watchlist() {
    // 1. useGetWatchlistQuery automatically fetches data when the component mounts.
    // 2. It returns an object containing the API response (data) and the request status.
    // const { data, isLoading, isError } = useGetWatchlistQuery();
    const { data, isLoading, isError } = useGetFakeWatchlistQuery()

    if (isLoading) return <div>Loading watchlist...</div>;
    if (isError) return <div>Error loading watchlist.</div>;

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">Watchlist Count: {data?.data}</h2>
        </div>
    );
}
