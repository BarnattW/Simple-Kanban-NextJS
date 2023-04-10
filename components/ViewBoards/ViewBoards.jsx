import BoardDisplay from "./BoardDisplay";
import SideNavBar from "../SideNavBar/SideNavBar";
import { SocketContext } from "../SocketContext";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";

function ViewBoards(props) {
	const { user } = useContext(UserContext);
	const socket = useContext(SocketContext);
	const userID = user._id;

	const [userBoards, setUserBoards] = useState([]);
	//createBoard is used to trigger useEffect when a new board is made
	const [createBoard, setCreateBoard] = useState(false);

	//retrieves user's board onload
	useEffect(() => {
		async function getUserBoards() {
			socket.emit("retreiveBoards", userID);
			socket.on("sendBoards", (result) => {
				const user = result;
				setUserBoards(user.userBoards);
			});
		}
		getUserBoards();

		return;
	}, [createBoard, socket, userID]);

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
		<div className="flex overflow-y">
			<SideNavBar logout={props.logout} />
			<BoardDisplay
				createNewBoard={createNewBoard}
				deleteBoard={deleteBoard}
				userBoards={userBoards}
			/>
		</div>
	);
}

export default ViewBoards;
