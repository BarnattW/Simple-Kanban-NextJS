import styles from "@/styles/Home.module.css";
import Login from "../components/Login/Login.jsx";
import BoardDisplay from "@/components/ViewBoards/BoardDisplay.jsx";

import { getSession } from "next-auth/react";

export default function Home() {
	return (
		<>
			<Login type="login" />
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
		redirect: {
			destination: "/boards",
		},
	};
}
