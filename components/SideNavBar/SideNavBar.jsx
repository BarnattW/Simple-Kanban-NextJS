import { IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

function SideBar(props) {
	const [navActive, setNavActive] = useState(false);

	function toggleNav() {
		setNavActive((prevBool) => {
			return !prevBool;
		});
	}

	return (
		<div className={navActive ? "nav-menu active sticky" : "nav-menu sticky"}>
			<div>
				<div className="border-coffee flex">
					<IconButton
						icon={<HamburgerIcon boxSize={6} />}
						variant="navIconButton"
						onClick={toggleNav}
					/>
				</div>

				<ul className={navActive ? "" : "hidden"}>
					<li>
						<Link to="/boards">
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
	);
}

export default SideBar;
