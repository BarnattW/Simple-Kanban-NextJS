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
			_hover: { color: "#815B5B", bg: "#FFF8EA", cursor: "pointer" },
			padding: "5% 0 5% 8%",
		},
	},

	defaultProps: {},
});

export default Text;
