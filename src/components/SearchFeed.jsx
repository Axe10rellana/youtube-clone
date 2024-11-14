//react
import React, { useState, useEffect } from "react";

//react-router-dom
import { useParams } from "react-router-dom";

//material-ui
import { Typography, Box } from "@mui/material";

//utils
import { fetchFromAPI } from "../utils/fetchFromAPI";

//components
import { Videos } from "./";

const SearchFeed = () => {
  //state variables
  const [videos, setVideos] = useState(null);

  //react-router variables
  const { searchTerm } = useParams();

  //useEffect
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data?.items)
    );
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography
        variant="h4"
        fontWeight={900}
        color="white"
        mb={3}
        ml={{ sm: "100px" }}
      >
        Resultados de la búsqueda de{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
