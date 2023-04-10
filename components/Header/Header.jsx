import Image from "next/image";
import Link from "next/link";
//import { UserContext } from "./UserContext";
import { Text, Button } from "@chakra-ui/react";
import { useContext } from "react";
import classes from "./Header.module.css";

function Header() {
	//const { user } = useContext(UserContext);
	const user = { "._id": null };
	console.log(user._id);

	return (
		<div
			className={[
				classes.borderCoffee,
				classes.flexRow,
				classes.sticky,
				classes.header,
				classes.paddingTen,
			].join(" ")}
		>
			<div className={classes.flex}>
				<Image src="/svg/logo.svg" alt={"logo"} width={35} height={35} />
				<Link href="/login">
					<Text fontSize="2xl" color="var(--list-bg-coffee)">
						Simple Kanban
					</Text>
				</Link>
			</div>
			<div>
				{user._id ? (
					<></>
				) : (
					<>
						<Link href="/login">
							<Button variant="headerAccountButton">Login</Button>
						</Link>
						<span className={classes.paddingTen}></span>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
