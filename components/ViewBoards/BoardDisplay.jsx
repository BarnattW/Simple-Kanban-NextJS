import DisplayCard from "./DisplayCard/DisplayCard";
import PopoverForm from "./DisplayCard/PopoverForm/PopoverForm";
import { Text, Heading, Card, CardBody, Image } from "@chakra-ui/react";

function BoardDisplay(props) {
	return (
		<div className="flex-column flex-grow padding-thirty userBoardsContainer">
			<div className="padding-thirty userBoardsDisplay">
				<Heading variant="displayHeading" size="md">
					Your Boards
				</Heading>
				<div className="grid">
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
								borderRadius={5}
							></Image>
							<PopoverForm createNewBoard={props.createNewBoard} />
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default BoardDisplay;
