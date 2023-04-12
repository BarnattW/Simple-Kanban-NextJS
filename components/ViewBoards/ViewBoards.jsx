import BoardDisplay from "./BoardDisplay";
import SideNavBar from "../SideNavBar/SideNavBar";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import classes from "./ViewBoards.module.css";
import { useSession, getSession } from "next-auth/react";

function ViewBoards(props) {
	const { user } = useContext(UserContext);

	const [userBoards, setUserBoards] = useState([]);
	//createBoard is used to trigger useEffect when a new board is made
	const [createBoard, setCreateBoard] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const { data: session, status } = useSession();
	const userID = session.user.username;

	//retrieves user's board onload
	useEffect(() => {
		async function getUserBoards() {
			const response = await fetch(`/api/user/${userID}`, {
				method: "POST",
				body: JSON.stringify({ username: session.user.username }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const userData = await response.json();

			if (response.status != 201) {
				return;
			}
			setUserBoards(userData.userBoards);
		}
		if (user.username) {
			setUserBoards(user.userBoards);
			return;
		}
		getUserBoards();

		return;
	}, [createBoard, userID, session, user]);

	//creates a new board by sending a request to server
	async function createNewBoard(boardtitle) {
		const newBoard = {
			username: userID,
			title: boardtitle,
		};

		await fetch("/api/user/createBoard", {
			method: "POST",
			body: JSON.stringify(newBoard),
			headers: {
				"Content-Type": "application/json",
			},
		});

		setCreateBoard((prevBool) => {
			return !prevBool;
		});
	}

	//deletes a board by sending a request to server
	async function deleteBoard(mongoID) {
		const deleteBoard = {
			username: userID,
			boardID: mongoID,
		};

		await fetch("/api/user/deleteBoard", {
			method: "POST",
			body: JSON.stringify(deleteBoard),
			headers: {
				"Content-Type": "application/json",
			},
		});

		setCreateBoard((prevBool) => {
			return !prevBool;
		});
	}

	return (
		<div className={[classes.flexColumn, classes.heightMax].join(" ")}>
			<div className={[classes.flex, classes.overflowY].join(" ")}>
				<SideNavBar logout={props.logout} />
				<BoardDisplay
					createNewBoard={createNewBoard}
					deleteBoard={deleteBoard}
					userBoards={userBoards}
				/>
			</div>
		</div>
	);
}

export default ViewBoards;
