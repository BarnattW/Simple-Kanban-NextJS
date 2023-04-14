import BoardCanvas from "./BoardCanvas";
import BoardHeader from "./BoardHeader";
import SideNavBar from "../SideNavBar/SideNavBar";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import classes from "./Board.module.css";
import { useSession } from "next-auth/react";

function Board(props) {
	const [mongoID, setMongoID] = useState("");
	const { data: session, status } = useSession();

	//stores an array that renders the lists and cards
	const [listContent, setListContent] = useState([]);
	const [boardTitle, setBoardTitle] = useState([]);

	//adds new list to array and receives content from CreateNewUI
	function addListContent(newContent) {
		setListContent((prevListContent) => {
			const listFormat = {
				...newContent,
				cards: [],
			};
			return [...prevListContent, listFormat];
		});
	}

	//updates board title
	function updateBoardTitle(updatedBoardTitle) {
		setBoardTitle(updatedBoardTitle);
	}

	//updates lists array with card content from ListCard
	function updateCards(updatedContent, index) {
		const newList = [...listContent];
		newList[index].cards = updatedContent;
		setListContent(newList);
	}

	//update lists title and content from ListCard
	function updateLists(updatedListHeading, index) {
		const { title, content } = updatedListHeading;
		const newList = [...listContent];
		newList[index] = { ...newList[index], title, content };
		setListContent(newList);
	}

	//delete list
	function deleteLists(index) {
		const newList = [...listContent];
		newList.splice(index, 1);
		setListContent(newList);
	}

	//initially retrieves board data, then updates it
	useEffect(() => {
		async function getBoard() {
			const url = window.location.href;
			const boardID = url.split("/");

			const response = await fetch("/api/user/getBoard", {
				method: "POST",
				body: JSON.stringify({
					id: session.user.id,
					boardID: boardID[boardID.length - 1],
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const userData = await response.json();
			if (response.status != 422) {
				setListContent(userData.userBoards[0].board);
				setBoardTitle(userData.userBoards[0].title);
				setMongoID(userData.userBoards[0]._id);
			} else {
			}
		}

		async function updateBoard() {
			const editedBoard = {
				title: boardTitle,
				board: listContent,
			};

			const response = await fetch("/api/user/updateBoard", {
				method: "POST",
				body: JSON.stringify({
					id: session.user.id,
					boardID: mongoID,
					editedBoard: editedBoard,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		if (mongoID === "") getBoard();
		else updateBoard();

		return;
	}, [listContent, boardTitle, mongoID, session]);

	//drag and drop behavior when dragging cards
	function dragEnd(result) {
		const { destination, source } = result;

		//guard clauses
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		//initialize variables
		let sourceCards;
		let sourceIndex;
		let destinationCards;
		let destinationIndex;
		listContent.forEach((list, i) => {
			if (String(list.id) === destination.droppableId) {
				[destinationCards, destinationIndex] = [list, i];
			}
			if (String(list.id) === source.droppableId) {
				[sourceCards, sourceIndex] = [list, i];
			}
		});

		//update source and destination
		const [reorderedCards] = sourceCards.cards.splice(source.index, 1);
		updateCards(sourceCards.cards, sourceIndex);
		destinationCards.cards.splice(destination.index, 0, reorderedCards);
		updateCards(destinationCards.cards, destinationIndex);
	}

	return (
		<div className={[classes.flexColumn, classes.heightMax].join(" ")}>
			<div
				className={[classes.flexGrow, classes.flexRow, classes.overflowY].join(
					" "
				)}
			>
				<SideNavBar logout={props.logout} />
				<div
					className={[classes.canvas, classes.flex, classes.flexColumn].join(
						" "
					)}
				>
					<BoardHeader
						boardTitle={boardTitle}
						updateBoardTitle={updateBoardTitle}
					/>
					<DragDropContext onDragEnd={dragEnd}>
						<BoardCanvas
							addListContent={addListContent}
							deleteLists={deleteLists}
							listContent={listContent}
							updateCards={updateCards}
							updateLists={updateLists}
						/>
					</DragDropContext>
				</div>
			</div>
		</div>
	);
}

export default Board;
