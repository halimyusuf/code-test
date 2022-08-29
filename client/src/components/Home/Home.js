import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Contacts from "../Contacts";

const Home = () => {
  return (
    <Container>
      <h1>Good luck on this test!</h1>
      <p>Ask any question, use any resource you want.</p>
      <Box>
        <Contacts />
      </Box>
    </Container>
  );
};

export default Home;
