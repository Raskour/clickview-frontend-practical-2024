"use client";

import React, { useEffect, useState } from "react";
import { Video } from "@/interfaces/video";
import { Alert, Spinner } from "react-bootstrap";
import VideoItem from "@/components/video-item";

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");

        if (res.ok) {
          const data = (await res.json()) as Video[];
          setVideos(data);
          setIsLoading(false);
        } else {
          throw new Error();
        }
      } catch (err) {
        setError("Failed to fetch videos! Please try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }
  return (
    <>
      <h1>Videos route</h1>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </>
  );
}
