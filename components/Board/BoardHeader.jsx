import { Heading, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function BoardHeader(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [boardTitle, setBoardTitle] = useState();

	//initialize boardTitle variable
	useEffect(() => {
		setBoardTitle(props.boardTitle);
	}, [props.boardTitle]);

	function toggleEditing() {
		setIsEditing((prevBool) => {
			return !prevBool;
		});
	}

	//edits the board title within the component
	function updateTitle(event) {
		setBoardTitle(event.target.value);
	}

	//sends an updated board title to board component
	function updateBoardTitle() {
		props.updateBoardTitle(boardTitle);
		toggleEditing();
	}

	return (
		<div>
			{isEditing ? (
				<div style={{ paddingTop: "1%" }}>
					<Input
						onBlur={updateBoardTitle}
						onChange={updateTitle}
						variant="titleInput"
						value={boardTitle}
					/>
				</div>
			) : (
				<Heading variant="boardHeading" onClick={toggleEditing}>
					{boardTitle}
				</Heading>
			)}
		</div>
	);
}

export default BoardHeader;
