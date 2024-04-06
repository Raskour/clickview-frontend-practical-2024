import React from "react";

import { Button, Col, Row } from "react-bootstrap";
import { Playlist } from "../interfaces/playlist";

interface PlaylistItemProps {
  playlist: Playlist;
  handleRemovePlaylist: (playlistId: number) => void;
}

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist, handleRemovePlaylist } = props;

  const videoCount =
    playlist.videoIds.length === 1
      ? "1 video"
      : `${playlist.videoIds.length} videos`;

  return (
    <Row className="border rounded p-2 mb-2">
      <Col xs="12" md="3">
        <h2 className="h5">{playlist.name}</h2>
        <p className="mb-0">{videoCount}</p>
      </Col>
      <Col xs="12" md="7">
        <p className="mb-0">{playlist.description}</p>
      </Col>
      <Col xs="12" md="2">
        <Button
          size="sm"
          variant="outline-danger"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault(); // Prevents the default action of the link
            handleRemovePlaylist(playlist.id);
          }}
        >
          Remove
        </Button>
      </Col>
    </Row>
  );
}
