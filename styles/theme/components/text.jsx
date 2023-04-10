import { defineStyleConfig } from "@chakra-ui/react";

const Text = defineStyleConfig({
	baseStyle: {},

	sizes: {
		sm: {},
		md: {},
		xl: {},
	},
	variants: {
		//Navbar
		navItem: {
			color: "#FFF8EA",
			fontSize: "lg",
			_hover: { color: "#815B5B", bg: "#FFF8EA" },
			padding: "5% 0 5% 8%",
		},

		//ViewBoards
		boardDisplayTitle: {
			color: "#815B5B",
			fontWeight: "bold",
			fontSize: "20px",
			marginTop: "10px",
			position: "absolute",
			textAlign: "center",
		},
	},

	defaultProps: {},
});

export default Text;
