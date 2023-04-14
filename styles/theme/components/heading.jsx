import { defineStyleConfig } from "@chakra-ui/react";

const Heading = defineStyleConfig({
	baseStyle: {},

	sizes: {
		sm: {},
		md: {},
	},
	variants: {
		//viewBoards
		displayHeading: {
			color: "#594545",
			paddingBottom: "20px",
		},
		//ListCard
		listCardHeading: {
			flexGrow: "1",
			lineHeight: "1.5",
			marginTop: "2",
			overflow: "auto",
		},
		//404 page
		errorHeading: { color: "#FFF8EA", paddingBottom: "5px" },
	},

	defaultProps: {
		size: "lg",
	},
});

export default Heading;
