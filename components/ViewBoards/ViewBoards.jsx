import BoardDisplay from "./BoardDisplay";
import SideNavBar from "../SideNavBar/SideNavBar";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import classes from "./ViewBoards.module.css";

function ViewBoards(props) {
	const { user } = useContext(UserContext);

	const userID = user._id;

	const [userBoards, setUserBoards] = useState([]);
	//createBoard is used to trigger useEffect when a new board is made
	const [createBoard, setCreateBoard] = useState(false);

	//retrieves user's board onload
	// useEffect(() => {
	// 	async function getUserBoards() {
	// 		socket.emit("retreiveBoards", userID);
	// 		socket.on("sendBoards", (result) => {
	// 			const user = result;
	// 			setUserBoards(user.userBoards);
	// 		});
	// 	}
	// 	getUserBoards();

	// 	return;
	// }, [createBoard, socket, userID]);

	//creates a new board by sending a request to server
	function createNewBoard(boardtitle) {
		const newBoard = {
			_id: userID,
			title: boardtitle,
		};
		socket.emit("createBoard", newBoard);

		setCreateBoard((prevBool) => {
			return !prevBool;
		});
	}

	//deletes a board by sending a request to server
	function deleteBoard(mongoID) {
		socket.emit("deleteBoard", userID, mongoID);

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
