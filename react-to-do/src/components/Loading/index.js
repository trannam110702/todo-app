import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading({ loading }) {
  if (!loading) return <></>;
  return (
    <Box sx={{ display: `flex`, justifyContent: "center", padding: "3rem 1rem" }}>
      <CircularProgress />
    </Box>
  );
}
