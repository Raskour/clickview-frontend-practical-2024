import {
  Col,
  Image,
  Row,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import { Video } from "../interfaces/video";
import { usePlayListContext } from "@/context/playlist-context";

interface VideoItemProps {
  video: Video;
}

export default function VideoItem(props: VideoItemProps) {
  const { playlists, isLoading, setPlaylists } = usePlayListContext();
  const { video } = props;

  const isVideoInPlaylist = (videoId: number, playlistId: number) => {
    const playListVideoIds = playlists.find(
      (playlist) => playlist.id === playlistId
    )?.videoIds;

    return !!playListVideoIds?.find((vId) => vId === videoId);
  };

  // NOTE: Ideally this should be a db operation to persist the data.
  const addVideoToPlaylist = (playlistId: number, videoId: number) => {
    setPlaylists((prevPlaylists) => {
      const playlistIndex = prevPlaylists.findIndex(
        (playlist) => playlist.id === playlistId
      );
      if (playlistIndex !== -1) {
        const newPlaylists = [...prevPlaylists];
        if (!newPlaylists[playlistIndex].videoIds.includes(videoId)) {
          newPlaylists[playlistIndex].videoIds.push(videoId);
        }
        return newPlaylists;
      }
      return prevPlaylists;
    });
  };

  const removeVideoFromPlaylist = (playlistId: number, videoId: number) => {
    setPlaylists((prevPlaylists) => {
      const playlistIndex = prevPlaylists.findIndex(
        (playlist) => playlist.id === playlistId
      );
      if (playlistIndex !== -1) {
        const newPlaylists = [...prevPlaylists];
        newPlaylists[playlistIndex].videoIds = newPlaylists[
          playlistIndex
        ].videoIds.filter((id) => id !== videoId);
        return newPlaylists;
      }
      return prevPlaylists;
    });
  };

  return (
    <Row>
      <Col xs="12" md="3" className="mb-3">
        <Image
          fluid
          rounded
          src={`${video.thumbnail}?size=small`}
          alt={video.name}
          className="w-100"
        />
      </Col>
      <Col xs="12" md="9" className="mb-3">
        <h2 className="h4">
          {video.name}
          {isLoading ? (
            <Spinner animation="border" size="sm" className="ms-2" />
          ) : (
            <DropdownButton
              id="dropdown-basic-button"
              title="Save"
              variant="light"
              className="d-inline ms-2"
              size="sm"
              onSelect={(key) => {
                const isInPlaylist = isVideoInPlaylist(video.id, Number(key));
                if (isInPlaylist) {
                  removeVideoFromPlaylist(Number(key), video.id);
                  toast.success("Video removed from playlist!");
                } else {
                  addVideoToPlaylist(Number(key), video.id);
                  toast.success("Video added to playlist!");
                }
              }}
            >
              {playlists.map((playlist) => (
                <Dropdown.Item key={playlist.id} eventKey={playlist.id}>
                  {playlist.name}{" "}
                  {isVideoInPlaylist(video.id, playlist.id) && "✔️"}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          )}
        </h2>

        <p>{video.description}</p>
      </Col>
    </Row>
  );
}
