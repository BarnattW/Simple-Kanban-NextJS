import { Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import classes from "./NotFound.module.css";

function NotFound() {
	return (
		<div className={classes.center}>
			<div>
				<Heading color="#FFF8EA" paddingBottom="5px">
					404- Page Not Found
				</Heading>
				<Heading color="#FFF8EA" paddingBottom="5px">
					This page does not exist.
				</Heading>
				<Link href={"/"}>
					<Button
						bg="#FFF8EA"
						color="#815B5B"
						_hover={{ backgroundColor: "#594545", color: "#FFF8EA" }}
					>
						Return to Homepage
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
