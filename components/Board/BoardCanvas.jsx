import AddBoardList from "./BoardList/AddBoardList";
import BoardList from "./BoardList/BoardList";

//renders lists
function BoardCanvas(props) {
	return (
		<div className="boardList flex flex-row overflow-y">
			{props.listContent.map((listItem, index) => {
				return (
					<BoardList
						key={index}
						index={index}
						id={listItem.id}
						cards={listItem.cards}
						listTitle={listItem.title}
						listContent={listItem.content}
						deleteLists={props.deleteLists}
						updateCards={props.updateCards}
						updateLists={props.updateLists}
					/>
				);
			})}
			<div className="addList">
				<AddBoardList onAdd={props.addListContent} />
			</div>
		</div>
	);
}

export default BoardCanvas;
