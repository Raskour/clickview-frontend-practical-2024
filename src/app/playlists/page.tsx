"use client";

import { useState } from "react";

import { Alert, Button, Spinner, Stack } from "react-bootstrap";
import Link from "next/link";

import { PlaylistItem } from "@/components/playlist-item";
import useFetchPlayLists from "@/hooks/useFetchPlaylists";
import AddPlaylistDialog from "@/components/add-playlist-dialog";
import toast from "react-hot-toast";

export default function PlaylistsPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { playlists, isLoading, error, setPlaylists, handleRemovePlaylist } =
    useFetchPlayLists();

  const handleSubmit = (name: string, description: string) => {
    setPlaylists([
      ...playlists,
      { name, description, id: Date.now(), videoIds: [] },
    ]);
    toast.success("Playlist created successfully");
    handleClose();
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1>Playlists route</h1>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleShow}
          className="p-2 ms-auto"
        >
          Create Playlist
        </Button>
      </Stack>

      {playlists.map((playlist) => (
        <Link
          key={playlist.id}
          href={`/playlists/${playlist.id}`}
          className="text-decoration-none"
        >
          <PlaylistItem
            playlist={playlist}
            handleRemovePlaylist={handleRemovePlaylist}
          />
        </Link>
      ))}
      {show && (
        <AddPlaylistDialog
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
