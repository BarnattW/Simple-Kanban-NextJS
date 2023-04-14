import { IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";
import classes from "./SideNavBar.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

function SideBar(props) {
	const [navActive, setNavActive] = useState(false);
	const router = useRouter();

	function toggleNav() {
		setNavActive((prevBool) => {
			return !prevBool;
		});
	}

	//logout user and resets user context
	async function logoutHandler() {
		await signOut();
		router.push("/login");
	}

	return (
		<div className={classes.flex}>
			<div
				className={
					navActive
						? `${[classes.navMenu, classes.active, classes.sticky].join(" ")} `
						: `${[classes.navMenu, classes.sticky].join(" ")}`
				}
			>
				<div>
					<div className={[classes.borderCoffee, classes.flex].join(" ")}>
						<IconButton
							icon={<HamburgerIcon boxSize={6} />}
							variant="navIconButton"
							onClick={toggleNav}
						/>
					</div>

					<ul className={navActive ? "" : `${classes.hidden}`}>
						<li>
							<Link href="/boards">
								<Text variant="navItem">Boards</Text>
							</Link>
						</li>
						<li>
							<Text variant="navItem">About</Text>
						</li>
						<li>
							<Text variant="navItem">Settings</Text>
						</li>
						<li>
							<Text variant="navItem" onClick={logoutHandler}>
								Logout
							</Text>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
