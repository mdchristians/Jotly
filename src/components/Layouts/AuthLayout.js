import React from 'react';
import { Grid, Box } from "@chakra-ui/core";
import { motion } from "framer-motion"
import Header from '../Header';

const AuthLayoutContent = motion.custom(Box);

const AuthLayout = ({ children }) => {
  return (
    <Grid
      templateColumns="1fr"
      templateRows="80px 1fr"
    >
      <Header />
      <Box
        m="0 auto"
        p={[2,4,8,16]}
        w="100%"
        maxW="1440px"
      >
        <AuthLayoutContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          { children }
        </AuthLayoutContent>
      </Box>
    </Grid>
  )
}

export default AuthLayout;