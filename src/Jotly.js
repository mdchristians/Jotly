import React from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import JotlyRouter from './router';
import theme from './theme';
import { AuthProvider } from './hooks/useAuth';

const Jotly = () => (
	<AuthProvider>
		<ThemeProvider theme={theme}>
			<CSSReset />
			<JotlyRouter />
		</ThemeProvider>
	</AuthProvider>
)

export default Jotly;