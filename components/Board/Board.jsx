import BoardCanvas from "./BoardCanvas";
import BoardHeader from "./BoardHeader";
import SideNavBar from "../SideNavBar/SideNavBar";
import { UserContext } from "../../context/UserContext";
import { DragDropContext } from "react-beautiful-dnd";
import { useContext, useEffect, useState } from "react";
import classes from "./Board.module.css";

function Board(props) {
	const { user } = useContext(UserContext);
	const userID = user._id;
	const [mongoID, setMongoID] = useState("");

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
	// useEffect(() => {
	// 	function getBoard() {
	// 		const url = window.location.href;
	// 		const boardID = url.split("/");

	// 		socket.emit("getBoard", userID, boardID[boardID.length - 1]);
	// 		socket.on("sendBoard", (result) => {
	// 			const user = result;
	// 			if (user) {
	// 				setListContent(user.userBoards[0].board);
	// 				setBoardTitle(user.userBoards[0].title);
	// 				setMongoID(user.userBoards[0]._id);
	// 			}
	// 		});
	// 	}

	// 	async function updateBoard() {
	// 		const editedBoard = {
	// 			title: boardTitle,
	// 			board: listContent,
	// 		};
	// 		socket.emit("updateBoard", userID, mongoID, editedBoard);
	// 	}

	// 	if (mongoID === "") getBoard();
	// 	else updateBoard();

	// 	return;
	// }, [listContent, boardTitle, mongoID, userID]);

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
