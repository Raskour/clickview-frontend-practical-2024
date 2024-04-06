"use client";
import { Alert, Spinner } from "react-bootstrap";
import Link from "next/link";

import { PlaylistItem } from "@/components/playlist-item";
import useFetchPlayLists from "@/hooks/useFetchPlaylists";

export default function PlaylistsPage() {
  const { playlists, isLoading, error } = useFetchPlayLists();

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <h1>Playlists route</h1>

      {playlists.map((playlist) => (
        <Link
          key={playlist.id}
          href={`/playlists/${playlist.id}`}
          className="text-decoration-none"
        >
          <PlaylistItem playlist={playlist} />
        </Link>
      ))}
    </>
  );
}
