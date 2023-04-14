import Board from "@/components/Board/Board";

import { getSession } from "next-auth/react";

export default function ViewBoard() {
	return <Board />;
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
	};
}
