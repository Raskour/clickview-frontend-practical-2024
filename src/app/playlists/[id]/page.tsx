"use client";

import { Spinner, Alert } from "react-bootstrap";

import useFetchPlayLists from "@/hooks/useFetchPlaylists";
import { PlaylistItem } from "@/components/playlist-item";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const { playlists, isLoading, error, handleRemovePlaylist } =
    useFetchPlayLists();

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const playlist = playlists.find(
    (playlist) => playlist.id === parseInt(params.id)
  );

  if (!playlist) {
    return <Alert variant="danger">Playlist not found</Alert>;
  }

  return (
    <PlaylistItem
      playlist={playlist}
      handleRemovePlaylist={handleRemovePlaylist}
    />
  );
}
