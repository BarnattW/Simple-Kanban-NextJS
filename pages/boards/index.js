import ViewBoards from "@/components/ViewBoards/ViewBoards";
import { getSession } from "next-auth/react";
import { getUserBoards } from "../api/user/[fetchboards]";

export default function ViewUserBoards(props) {
	return <ViewBoards userBoards={props.userBoards} />;
}

export async function getServerSideProps({ req, res }) {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	const userID = session.user.id;
	const response = await getUserBoards(req, res, userID);
	const userData = await response;

	if (!response) {
		return {
			props: session,
		};
	} else {
		return {
			props: {
				session,
				userBoards: JSON.parse(JSON.stringify(userData.userBoards)),
			},
		};
	}
}
