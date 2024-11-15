//react
import React, { useState, useEffect } from "react";

//react-router-dom
import { Link, useParams } from "react-router-dom";

//react-player
import ReactPlayer from "react-player";

//material-ui
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle, ThumbUp } from "@mui/icons-material";

//utils
import { fetchFromAPI } from "../utils/fetchFromAPI";

//components
import { Videos, Loader } from "./";

const VideoDetail = () => {
  //state variables
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  //react-router variables
  const { id } = useParams();

  //useEffect
  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
      setVideoDetail(data?.items[0]);
      const videosData = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`);
      setVideos(videosData?.items);
    };
    fetchResults();
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  //variables
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString("en-US")} visitas
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  <ThumbUp sx={{ fontSize: "14px", color: "#fff", ml: "5px" }} />{" "}
                  {parseInt(likeCount).toLocaleString("en-US")}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
