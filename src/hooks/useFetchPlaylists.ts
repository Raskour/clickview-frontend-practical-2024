import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Playlist } from "@/interfaces/playlist";


// Custom hook to fetch playlists
const useFetchPlayLists = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleRemovePlaylist = (playlistId: number) => {
        const newPlaylists = playlists.filter(
            (playlist) => playlist.id !== playlistId
        );
        toast.success("Playlist removed successfully");
        setPlaylists(newPlaylists);
    };

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await fetch("/api/playlists");

                if (res.ok) {
                    const data = (await res.json()) as Playlist[];
                    setPlaylists(data);
                } else {
                    throw new Error();
                }
            } catch (err) {
                setError("Failed to fetch playlists! Please try refreshing the page.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    return { playlists, isLoading, error, setPlaylists, handleRemovePlaylist };
};

export default useFetchPlayLists;