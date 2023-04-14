import AlertDialogues from "../../AlertDialogues/AlertDialogues";
import { Card, CardBody, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import classes from "./DisplayCard.module.css";

function DisplayCard(props) {
	//pass id to boardDisplay to delete a board
	function deleteBoard() {
		props.deleteBoard(props.board._id);
	}

	return (
		<Card backgroundColor="var(--card-bg-coffee)" maxW="300px" maxH="200px">
			<Link href={`/boards/${props.board._id}`}>
				<CardBody display="flex" justifyContent="center" padding="0">
					<Text
						color="#815B5B"
						fontWeight="bold"
						fontSize="20px"
						marginTop="10px"
						position="absolute"
						textAlign="center"
					>
						{props.board.title}
					</Text>
					<Image
						src="svg/layered-waves-haikei.svg"
						alt="background"
						height={300}
						width={300}
						className={classes.cardImage}
					></Image>
				</CardBody>
			</Link>
			<AlertDialogues
				delete={deleteBoard}
				deleteType="Board"
				type="boardDisplayIconButton"
			/>
		</Card>
	);
}

export default DisplayCard;
