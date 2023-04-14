import BoardDisplay from "./BoardDisplay";
import SideNavBar from "../SideNavBar/SideNavBar";
import classes from "./ViewBoards.module.css";

function ViewBoards(props) {
	return (
		<div className={[classes.flexColumn, classes.heightMax].join(" ")}>
			<div className={[classes.flex, classes.overflowY].join(" ")}>
				<SideNavBar />
				<BoardDisplay userBoards={props.userBoards} />
			</div>
		</div>
	);
}

export default ViewBoards;
