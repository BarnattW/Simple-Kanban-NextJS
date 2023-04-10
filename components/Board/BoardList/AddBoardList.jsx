import CreateNewUI from "./Cards/CreateNewUI";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

function AddBoardList(props) {
	const [toggleBool, setToggleBool] = useState(true);

	function toggleInputField() {
		setToggleBool((prevBool) => !prevBool);
	}

	return (
		<>
			<CreateNewUI
				addContent={props.onAdd}
				toggle={toggleInputField}
				toggleValue={toggleBool}
			/>
			<Button
				w="200px"
				onClick={toggleInputField}
				display={toggleBool ? "inline-block" : "none"}
			>
				+ Add Another List
			</Button>
		</>
	);
}

export default AddBoardList;
