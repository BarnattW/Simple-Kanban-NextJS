import { IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useContext, useState } from "react";
import classes from "./SideNavBar.module.css";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";

function SideBar(props) {
	const [navActive, setNavActive] = useState(false);
	const router = useRouter();
	const { setUser } = useContext(UserContext);

	function toggleNav() {
		setNavActive((prevBool) => {
			return !prevBool;
		});
	}

	const { data: session, status } = useSession();
	//logout user and resets user context
	async function logoutHandler() {
		await signOut();
		setUser({});
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
