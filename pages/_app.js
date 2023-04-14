import Layout from "@/components/Layout/layout";

import classes from "../styles/Home.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "/styles/theme/theme.jsx";
import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
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
		</SessionProvider>
	);
}
