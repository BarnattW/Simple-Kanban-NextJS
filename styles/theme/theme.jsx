import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import Button from "./components/button";
import Heading from "./components/heading";
import Input from "./components/input";
import Text from "./components/text";

const theme = extendTheme({
	styles,
	components: {
		Button,
		Heading,
		Input,
		Text,
	},
});

export default theme;
