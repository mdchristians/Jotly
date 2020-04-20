import React from 'react';
import { Box } from "@chakra-ui/core"
import Authenticated from './Authenticated';
import Unauthenticated from './Unauthenticated';
import { useAuth } from '../hooks/useAuth';

// Suspensify me capt.
// const Authenticated = React.lazy(() => import("./Authenticated"));
// const Unauthenticated = React.lazy(() => import("./Unauthenticated"));

const JotlyRouter = () => {
  const { user } = useAuth();

	return (
		<Box bg="background" h="100vh">
  		{ user ? <Authenticated /> : <Unauthenticated /> }
		</Box>
	)
}

export default JotlyRouter;