import Image from "next/image";
import Link from "next/link";
import { Text, Button } from "@chakra-ui/react";
import classes from "./Header.module.css";
import { useSession, signOut } from "next-auth/react";

function Header() {
	const { data: session, status } = useSession();

	async function logoutHandler() {
		await signOut();
	}

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
				{session ? (
					<>
						<Button variant="headerAccountButton" onClick={logoutHandler}>
							Logout
						</Button>
						<span className={classes.paddingTen}></span>
					</>
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
