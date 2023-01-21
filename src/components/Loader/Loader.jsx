import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div>
      <CircularProgress sx={{ color: "teal" }} size={60} />
    </div>
  );
};

export default Loader;
