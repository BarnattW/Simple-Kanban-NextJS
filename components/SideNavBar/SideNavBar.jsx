import { IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";
import classes from "./SideNavBar.module.css";
import { signOut } from "next-auth/react";

function SideBar(props) {
	const [navActive, setNavActive] = useState(false);
	const navWidth = navActive ? 125 : 40;

	function toggleNav() {
		setNavActive((prevBool) => {
			return !prevBool;
		});
	}

	function toggleOverlay() {
		if (navActive == true) setNavActive(false);
	}

	//logout user and resets user context
	async function logoutHandler() {
		await signOut();
	}

	return (
		<>
			<div
				className={navActive ? `${classes.overlay}` : ""}
				onClick={toggleOverlay}
			></div>
			<div
				className={[classes.navMenu, classes.sticky].join(" ")}
				style={{ width: navWidth }}
			>
				<div>
					<div className={classes.borderCoffee}>
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
		</>
	);
}

export default SideBar;
