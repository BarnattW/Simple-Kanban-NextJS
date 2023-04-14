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
						value={boardTitle}
						border="1px solid"
						borderColor="#e3d6c5"
						bg="inherit"
						color="#FFF8EA"
						fontSize="30px"
						fontWeight="bold"
						marginLeft="15px"
						maxW="300px"
						_hover={{
							borderColor: "#594545",
						}}
						_focusVisible={{
							borderColor: "#594545",
						}}
					/>
				</div>
			) : (
				<Heading
					color="#FFF8EA"
					marginLeft="30px"
					paddingTop="1%"
					_hover={{ cursor: "pointer" }}
					onClick={toggleEditing}
				>
					{boardTitle}
				</Heading>
			)}
		</div>
	);
}

export default BoardHeader;
