import Accordion from "./Accordion/Accordion";
import { Draggable } from "react-beautiful-dnd";

function CardContent(props) {
	//unique IDs to prevent edge case where uniqueIDs are the same for items with the same name
	const partial = String(props.id).slice(-3);
	const uniqueID = partial + props.title + props.index;

	return (
		<Draggable key={uniqueID} draggableId={uniqueID} index={props.index}>
			{(provided) => {
				return (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<Accordion
							cardTitle={props.title}
							cardContent={props.content}
							deleteCardContent={props.deleteCardContent}
							editCards={props.editCards}
							index={props.index}
						/>
					</div>
				);
			}}
		</Draggable>
	);
}

export default CardContent;
