import {
	Popover,
	PopoverTrigger,
	IconButton,
	Button,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	FormControl,
	FormLabel,
	Input,
	useBoolean,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

function PopoverForm(props) {
	const [togglePopover, setTogglePopover] = useBoolean();

	const [boardTitle, setBoardTitle] = useState("");

	//pass boardTitle to boardDisplay to create a new board
	function createNewBoard(event) {
		event.preventDefault();

		props.createNewBoard(boardTitle);
		setBoardTitle("");
	}

	//update boardTitle
	function updateInput(event) {
		setBoardTitle(event.target.value);
	}

	return (
		<Popover
			isOpen={togglePopover}
			onOpen={setTogglePopover.on}
			onClose={setTogglePopover.off}
			placement="right"
		>
			<PopoverTrigger>
				<IconButton
					icon={<AddIcon />}
					position="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					bg="#815B5B"
					color="#FFF8EA"
					_hover={{ backgroundColor: "#FFF8EA", color: "#815B5B" }}
				></IconButton>
			</PopoverTrigger>
			<PopoverContent bg="var(--card-bg-coffee)">
				<PopoverArrow />
				<PopoverHeader
					color="var(--main-bg-coffee)"
					fontWeight="bold"
					textAlign="center"
				>
					Create New Board
				</PopoverHeader>
				<PopoverCloseButton />
				<PopoverBody>
					<form onSubmit={createNewBoard}>
						<FormControl>
							<FormLabel color="var(--main-bg-coffee)">Board Title</FormLabel>
							<Input value={boardTitle} onChange={updateInput} />
						</FormControl>
						<Button
							type="submit"
							variant="createBoardButton"
							onClick={setTogglePopover.off}
						>
							Create
						</Button>
					</form>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

export default PopoverForm;
