import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
	IconButton,
	useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRef } from "react";

function AlertDialogues(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	return (
		<>
			<IconButton
				icon={<DeleteIcon />}
				variant={props.type}
				onClick={onOpen}
			></IconButton>

			<AlertDialog
				isCentered
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent bg="#FFF8EA">
						<AlertDialogHeader fontSize="lg" fontWeight="bold" color="#815B5B">
							{`Delete ${props.deleteType}`}
						</AlertDialogHeader>

						<AlertDialogBody color="#815B5B">
							Are you sure? This action cannot be undone (yet).
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								variant="createBoardButton"
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button variant="deleteButton" onClick={props.delete}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default AlertDialogues;
