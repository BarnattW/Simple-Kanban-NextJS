import { Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="center">
			<Heading variant="errorHeading">404- Page Not Found</Heading>
			<Heading variant="errorHeading">This page does not exist.</Heading>
			<Link to={"/"}>
				<Button variant="solid">Return to Homepage</Button>
			</Link>
		</div>
	);
}

export default NotFound;
