import AddBoardList from "./BoardList/AddBoardList";
import BoardList from "./BoardList/BoardList";
import classes from "./BoardCanvas.module.css";

//renders lists
function BoardCanvas(props) {
	return (
		<div
			className={[
				classes.boardList,
				classes.flex,
				classes.flexRow,
				classes.overflowY,
			].join(" ")}
		>
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
			<div className={classes.addList}>
				<AddBoardList onAdd={props.addListContent} />
			</div>
		</div>
	);
}

export default BoardCanvas;
