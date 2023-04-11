import { Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import classes from "./NotFound.module.css";

function NotFound() {
	return (
		<div className={classes.center}>
			<div>
				<Heading variant="errorHeading">404- Page Not Found</Heading>
				<Heading variant="errorHeading">This page does not exist.</Heading>
				<Link href={"/"}>
					<Button variant="solid">Return to Homepage</Button>
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
