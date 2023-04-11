import DisplayCard from "./DisplayCard/DisplayCard";
import PopoverForm from "./DisplayCard/PopoverForm/PopoverForm";
import { Text, Heading, Card, CardBody } from "@chakra-ui/react";
import Image from "next/image";
import classes from "./BoardDisplay.module.css";

function BoardDisplay(props) {
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
					{props.userBoards.map((board, index) => {
						return (
							<div key={index}>
								<DisplayCard board={board} deleteBoard={props.deleteBoard} />
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
							/>
							<PopoverForm createNewBoard={props.createNewBoard} />
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default BoardDisplay;
