import Layout from "@/components/Layout/layout";
import Head from "next/head";
import classes from "../styles/Home.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "/styles/theme/theme.jsx";
import { UserContext } from "@/context/UserContext";
import { useState, useMemo } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
	const [user, setUser] = useState(UserContext);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<ChakraProvider theme={theme}>
			<UserContext.Provider value={value}>
				<div className={[classes.app, classes.flexColumn].join(" ")}>
					<Layout>
						<Head>
							<title>Simple Kanban</title>
							<meta name="description" content="Simple Kanban" />
							<meta
								name="viewport"
								content="initial-scale=1.0, width=device-width"
							/>
						</Head>
						<Component {...pageProps} />
					</Layout>
				</div>
			</UserContext.Provider>
		</ChakraProvider>
	);
}
