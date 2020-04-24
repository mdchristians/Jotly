import React from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import JotlyRouter from './router';
import theme from './theme';
import { AuthProvider } from './hooks/useAuth';
import { NotebookProvider } from './hooks/useNotebook';

const Jotly = () => (
	<AuthProvider>
		<NotebookProvider>
		<ThemeProvider theme={theme}>
			<CSSReset />
			<JotlyRouter />
		</ThemeProvider>
		</NotebookProvider>
	</AuthProvider>
)

export default Jotly;