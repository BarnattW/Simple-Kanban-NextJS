import { IconButton, Textarea, Fade } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

function CreateNewUI(props) {
	const [textContent, setTextContent] = useState({
		title: props.currentTitle,
		content: props.currentContent,
		id: Date.now(),
	});

	//renders client's inputs
	function updateContent(event) {
		const { name, value } = event.target;
		setTextContent((prevValue) => {
			return {
				...prevValue,
				[name]: value,
				id: Date.now(),
			};
		});
	}

	//resets input fields
	function resetContent() {
		setTextContent(() => {
			return { title: "", content: "", id: Date.now() };
		});
	}

	//toggle for input UI and add buttons
	function toggleEvent() {
		if (props.editing) {
			props.toggle();
			return;
		}

		props.toggle();
		resetContent();
	}

	//Adds to either card array or directly to list array
	function addContent() {
		//guard clause
		if (!textContent.title) return;

		//editing list
		if (props.editing && props.type === "list") {
			props.updateContent(textContent);
			return;
		}

		//editing card
		if (props.editing && props.type === "card") {
			props.updateContent(textContent);
			return;
		}

		props.addContent(textContent);
		props.toggle();
		resetContent();
	}

	return (
		<Fade in={!props.toggleValue}>
			<div
				style={{
					backgroundColor: "var(--card-bg-coffee)",
					borderRadius: "20px",
					display: `${!props.toggleValue ? "inline-block" : "none"}`,
					minWidth: "250px",
					maxWidth: "300px",
				}}
			>
				<Textarea
					borderBottomRadius={0}
					name="title"
					placeholder="Title"
					resize="none"
					rows="1"
					value={textContent.title}
					onChange={updateContent}
				/>
				<Textarea
					borderRadius={0}
					name="content"
					overflow-wrap="break-word"
					placeholder="Enter any additional notes or details"
					resize="none"
					rows="2"
					whiteSpace="pre-line"
					value={textContent.content}
					onChange={updateContent}
				/>
				<IconButton
					backgroundColor="var(--card-bg-coffee)"
					borderBottomRadius={10}
					icon={<AddIcon />}
					onClick={addContent}
				></IconButton>
				<IconButton
					backgroundColor="var(--card-bg-coffee)"
					icon={<CloseIcon />}
					onClick={toggleEvent}
				></IconButton>
			</div>
		</Fade>
	);
}

export default CreateNewUI;
