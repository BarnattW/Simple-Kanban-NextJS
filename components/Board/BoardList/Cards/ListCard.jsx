import AlertDialogues from "../../../AlertDialogues/AlertDialogues";
import CardContent from "./CardContent";
import CreateNewUI from "./CreateNewUI";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Heading,
	IconButton,
	Text,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

function ListCard(props) {
	const [toggleBool, setToggleBool] = useState(true);
	const [editing, setEditing] = useState(false);

	//toggles between rendering input UI and add card button
	function toggleInputField() {
		setToggleBool((prevBool) => !prevBool);
	}

	//adds new cards to array and updates list array in Board
	function addCardContent(newContent) {
		const updatedContents = [...props.cards, newContent];
		props.updateCards(updatedContents, props.index);
		return updatedContents;
	}

	//updates list title and content in Board
	function toggleEditing() {
		setEditing((prevBool) => {
			return !prevBool;
		});
	}
	function updateHeading(updatedListHeading) {
		props.updateLists(updatedListHeading, props.index);
		setEditing((prevBool) => {
			return !prevBool;
		});
	}

	function editCards(updatedCard, index) {
		const updatedCards = [...props.cards];
		updatedCards[index] = updatedCard;
		props.updateCards(updatedCards, props.index);
	}

	//delete Card
	function deleteCardContent(index) {
		const updatedContents = [...props.cards];
		updatedContents.splice(index, 1);
		props.updateCards(updatedContents, props.index);
	}

	//delete List
	function deleteListContent() {
		props.deleteLists(props.index);
	}

	//renders card contents
	return (
		<Card
			width="300px"
			backgroundColor="#e3d6c5"
			maxHeight="85vh"
		>
			<CardHeader padding={3} paddingBottom={0}>
				{editing ? (
					<CreateNewUI
						currentTitle={props.listTitle}
						currentContent={props.listContent}
						editing={editing}
						toggle={toggleEditing}
						type="list"
						updateContent={updateHeading}
					/>
				) : (
					<>
						<div className="flex">
							<Heading size="sm" variant="listCardHeading">
								{props.listTitle}
							</Heading>
							<AlertDialogues
								delete={deleteListContent}
								deleteType="List"
								type="listIconButton"
							/>
							<IconButton
								icon={<EditIcon />}
								variant="listIconButton"
								onClick={toggleEditing}
							></IconButton>
						</div>
						<Text>{props.listContent}</Text>
					</>
				)}
			</CardHeader>

			<CardBody padding="10px" paddingBottom={0} overflowY="auto">
				{props.cards.map((cardContent, index) => {
					return (
						<CardContent
							id={cardContent.id}
							key={index}
							index={index}
							title={cardContent.title}
							content={cardContent.content}
							deleteCardContent={deleteCardContent}
							editCards={editCards}
						/>
					);
				})}
			</CardBody>

			<CardFooter padding={3} paddingTop={5}>
				<IconButton
					display={toggleBool ? "block" : "none"}
					icon={<AddIcon />}
					variant="iconButton"
					onClick={toggleInputField}
				></IconButton>

				<CreateNewUI
					addContent={addCardContent}
					toggleValue={toggleBool}
					toggle={toggleInputField}
				/>
			</CardFooter>
		</Card>
	);
}

export default ListCard;
