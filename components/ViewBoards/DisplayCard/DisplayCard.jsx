import AlertDialogues from "../../AlertDialogues/AlertDialogues";
import { Card, CardBody, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

function DisplayCard(props) {
	//pass id to boardDisplay to delete a board
	function deleteBoard() {
		props.deleteBoard(props.board._id);
	}

	return (
		<Card backgroundColor="var(--card-bg-coffee)" maxW="300px" maxH="200px">
			<Link href={`/board/${props.board._id}`}>
				<CardBody display="flex" justifyContent="center" padding="0">
					<Text variant="boardDisplayTitle">{props.board.title}</Text>
					<Image src="svg/layered-waves-haikei.svg" borderRadius={5}></Image>
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
