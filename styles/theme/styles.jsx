import { extendTheme } from "@chakra-ui/react";

const globalStyles = extendTheme({
	global: {
		//styling body background color
		body: {
			backgroundColor: "var(--main-bg-coffee)",
		},
	},
});

export default globalStyles;
