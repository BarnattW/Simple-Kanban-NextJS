import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import {
	createMultiStyleConfigHelpers,
	defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(parts.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({
	field: {},
});

// Default input label variant
const variantFormInput = definePartsStyle(() => {
	return {
		field: {
			border: "1px solid",
			borderColor: "#e3d6c5",
			bg: "inherit",
			maxW: "450px",
			_hover: {
				borderColor: "#594545",
			},
			_focusVisible: {
				borderColor: "#594545",
			},
		},
	};
});

const variants = {
	formInput: variantFormInput,
};

const size = {
	md: defineStyle({
		fontSize: "sm",
		px: "4",
		h: "10",
		borderRadius: "none",
	}),
};

const sizes = {
	md: definePartsStyle({
		field: size.md,
		addon: size.md,
	}),
};

const Input = defineMultiStyleConfig({
	baseStyle,
	variants,
	sizes,
	defaultProps: {
		size: "md",
		variant: "formInput",
	},
});

export default Input;
