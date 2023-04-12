import Layout from "@/components/Layout/layout";

import classes from "../styles/Home.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "/styles/theme/theme.jsx";
import "../styles/globals.css";

import { UserContext } from "@/context/UserContext";
import { useState, useMemo } from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";


export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const [user, setUser] = useState(UserContext);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<ChakraProvider theme={theme}>
			<SessionProvider session={session}>
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
								<link rel="shortcut icon" href="/svg/logo.svg"></link>
							</Head>
							<Component {...pageProps} />
						</Layout>
					</div>
				</UserContext.Provider>
			</SessionProvider>
		</ChakraProvider>
	);
}
