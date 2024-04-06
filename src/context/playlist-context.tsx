"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { Playlist } from "@/interfaces/playlist";
import toast from "react-hot-toast";

interface PlayListContextProps {
  playlists: Playlist[];
  isLoading: boolean;
  error: string | null;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  handleRemovePlaylist: (playlistId: number) => void;
}

const PlayListContext = createContext<PlayListContextProps | undefined>(
  undefined
);

export const usePlayListContext = () => {
  const context = useContext(PlayListContext);
  if (!context) {
    throw new Error(
      "usePlayListContext must be used within a PlayListProvider"
    );
  }
  return context;
};

export const PlayListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  return (
    <PlayListContext.Provider
      value={{
        playlists,
        isLoading,
        error,
        setPlaylists,
        handleRemovePlaylist,
      }}
    >
      {children}
    </PlayListContext.Provider>
  );
};
