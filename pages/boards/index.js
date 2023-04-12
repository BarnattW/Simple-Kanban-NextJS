import ViewBoards from "@/components/ViewBoards/ViewBoards";
import { getSession } from "next-auth/react";
import { getData } from "../api/user/[username]";

export default function ViewUserBoards() {
	return <ViewBoards />;
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

	// const response = await getData(
	// 	context.req,
	// 	context.res,
	// 	session.user.username
	// );

	// const userData = await response.json();
	// if (response.status != 201) {
	// 	return;
	// }

	return {
		props: { session },
	};
}