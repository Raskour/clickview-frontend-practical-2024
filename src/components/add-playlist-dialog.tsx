import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface PlaylistModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (name: string, description: string) => void;
}

const AddPlaylistDialog = ({
  show,
  handleClose,
  handleSubmit,
}: PlaylistModalProps) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const handleNameChange = (e) => setPlaylistName(e.target.value);
  const handleDescriptionChange = (e) => setPlaylistDescription(e.target.value);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPlaylistName" className="mb-3">
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter playlist name"
              value={playlistName}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formPlaylistDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter playlist description"
              value={playlistDescription}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSubmit(playlistName, playlistDescription)}
        >
          Create Playlist
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPlaylistDialog;
