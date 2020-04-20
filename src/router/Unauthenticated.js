import React from 'react';
import { Router, Redirect } from "@reach/router";
import { Flex, Grid, Box } from "@chakra-ui/core"
import { motion } from "framer-motion"
import Login from '../pages/Login'
import Register from '../pages/Register'

const Unauthenticated = () => (
  <Box as="main" bg="background">
    <motion.div
	  	initial={{ opacity: 0 }}
	  	animate={{ opacity: 1, transition: { duration: 0.4 } }}
	  	exit={{ opacity: 0, transition: { duration: 0.2 } }}
	  >
	  	<Grid templateColumns={"auto"} h="100vh">
	  		<Flex justify="center" align="center" mt="-50px">
          <Router>
            <Login path="/" />
            <Register path="/register" />
            <Redirect from="*" to="/" noThrow />
          </Router>
        </Flex>
      </Grid>
    </motion.div>
  </Box>
)

export default Unauthenticated;