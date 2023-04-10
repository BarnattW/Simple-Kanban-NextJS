import ListCard from "./Cards/ListCard";
import { Droppable } from "react-beautiful-dnd";

function BoardList(props) {
	return (
		<Droppable
			droppableId={String(props.id)}
			key={props.id}
			index={props.index}
		>
			{(provided) => {
				return (
					<div
						className="list"
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<ListCard
							index={props.index}
							cards={props.cards}
							listTitle={props.listTitle}
							listContent={props.listContent}
							updateCards={props.updateCards}
							updateLists={props.updateLists}
							deleteLists={props.deleteLists}
						/>
						{provided.placeholder}
					</div>
				);
			}}
		</Droppable>
	);
}

export default BoardList;
