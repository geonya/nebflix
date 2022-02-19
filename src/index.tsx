import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyle from "./Styles/globalstyles";
import GlobalFont from "./Styles/fonts/font";

const client = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<QueryClientProvider client={client}>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<GlobalFont />
					<App />
				</ThemeProvider>
			</QueryClientProvider>
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById("root")
);
