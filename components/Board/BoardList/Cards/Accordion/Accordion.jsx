import { IconButton } from "@chakra-ui/react";
import { TriangleDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CreateNewUI from "../CreateNewUI";

function Accordion(props) {
	const [isActive, setIsActive] = useState(true);
	const [editing, setEditing] = useState(false);

	function showContent() {
		setIsActive((prevActive) => {
			return !prevActive;
		});
	}

	//passes index to CardContent to delete a card
	function deleteContent() {
		props.deleteCardContent(props.index);
	}

	//updates list title and content in Board
	function toggleEditing() {
		setEditing((prevBool) => {
			return !prevBool;
		});
	}
	function editCards(updatedCard) {
		props.editCards(updatedCard, props.index);
		setEditing((prevBool) => {
			return !prevBool;
		});
	}

	return (
		<div>
			{editing ? (
				<CreateNewUI
					currentTitle={props.cardTitle}
					currentContent={props.cardContent}
					editing={editing}
					toggle={toggleEditing}
					type="card"
					updateContent={editCards}
				/>
			) : (
				<div className="cardContent">
					<div className="flex">
						<label className="cardTitle" style={{ overflow: "auto" }}>
							{props.cardTitle}
						</label>
						<IconButton
							icon={<EditIcon boxSize={4} />}
							variant="cardIconButton"
							onClick={toggleEditing}
						></IconButton>
						<IconButton
							icon={<DeleteIcon boxSize={4} />}
							variant="cardIconButton"
							onClick={deleteContent}
						></IconButton>
						<IconButton
							icon={<TriangleDownIcon boxSize={4} />}
							variant="cardIconButton"
							onClick={showContent}
						></IconButton>
					</div>
					<div className={isActive ? "hidden" : ""}>
						<p style={{ marginLeft: "5px" }}>{props.cardContent}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Accordion;
