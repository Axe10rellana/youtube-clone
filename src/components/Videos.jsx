//react
import React from "react";

//material-ui
import { Stack, Box } from "@mui/material";

//components
import { VideoCard, ChannelCard, Loader } from "./";

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
    >
      {videos
        .filter((item) => item?.snippet?.thumbnails?.high?.url)
        .map((item, idx) => (
          <Box key={idx}>
            {item?.id?.videoId && <VideoCard video={item} />}
            {item?.id?.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        ))}
    </Stack>
  );
};

export default Videos;
