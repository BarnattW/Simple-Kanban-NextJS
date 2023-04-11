import { IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";
import classes from "./SideNavBar.module.css";

function SideBar(props) {
	const [navActive, setNavActive] = useState(false);

	function toggleNav() {
		setNavActive((prevBool) => {
			return !prevBool;
		});
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
							<Text variant="navItem" onClick={props.logout}>
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
