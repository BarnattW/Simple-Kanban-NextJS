import DisplayCard from "./DisplayCard/DisplayCard";
import PopoverForm from "./DisplayCard/PopoverForm/PopoverForm";
import { Text, Heading, Card, CardBody } from "@chakra-ui/react";
import Image from "next/image";
import classes from "./BoardDisplay.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function BoardDisplay(props) {
	const [userBoards, setUserBoards] = useState(props.userBoards);
	//createBoard is used to trigger useEffect when a new board is made

	const { data: session, status } = useSession();
	const userID = session.user.id;

	//retrieves user's board onload
	async function getUserBoards() {
		const response = await fetch(`/api/user/${userID}`, {
			method: "POST",
			body: JSON.stringify({ id: userID }),
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

	//creates a new board by sending a request to server
	async function createNewBoard(boardtitle) {
		const newBoard = {
			id: userID,
			title: boardtitle,
		};

		await fetch("/api/user/createBoard", {
			method: "POST",
			body: JSON.stringify(newBoard),
			headers: {
				"Content-Type": "application/json",
			},
		});
		getUserBoards();
	}

	//deletes a board by sending a request to server
	async function deleteBoard(mongoID) {
		const deleteBoard = {
			id: userID,
			boardID: mongoID,
		};

		await fetch("/api/user/deleteBoard", {
			method: "POST",
			body: JSON.stringify(deleteBoard),
			headers: {
				"Content-Type": "application/json",
			},
		});
		getUserBoards();
	}

	return (
		<div
			className={[
				classes.flexColumn,
				classes.flexGrow,
				classes.paddingThirty,
				classes.userBoardsContainer,
			].join(" ")}
		>
			<div
				className={[classes.paddingThirty, classes.userBoardsDisplay].join(" ")}
			>
				<Heading variant="displayHeading" size="md">
					Your Boards
				</Heading>
				<div className={classes.grid}>
					{userBoards.map((board, index) => {
						return (
							<div key={index}>
								<DisplayCard board={board} deleteBoard={deleteBoard} />
							</div>
						);
					})}
					<Card maxW="300px" maxH="300px">
						<CardBody display="flex" justifyContent="center" padding="0">
							<Text variant="boardDisplayTitle" marginTop="30px">
								Create New
							</Text>
							<Image
								src="svg/layered-waves-haikei.svg"
								alt="background"
								height={300}
								width={300}
								className={classes.cardImage}
								priority={true}
							/>
							<PopoverForm createNewBoard={createNewBoard} />
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default BoardDisplay;
