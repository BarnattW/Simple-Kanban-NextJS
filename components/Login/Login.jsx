import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	FormControl,
	FormLabel,
	Input,
	Button,
	Heading,
	IconButton,
	InputGroup,
	InputRightElement,
	FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import classes from "./Login.module.css";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function Login(props) {
	//used to toggle elements in login and register
	const isLogin = props.type === "login" ? true : false;
	//toggles between hidden and text password
	const [showPassword, setShowPassword] = useState(false);
	const handleClick = () => setShowPassword(!showPassword);

	//auth params
	const router = useRouter();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	//toggles form errors
	const [isError, setIsError] = useState(false);
	const [isErrorMatch, setIsErrorMatch] = useState(false);
	const [authSuccess, setAuthSuccess] = useState(true);
	const [registerSuccess, setRegisterSuccess] = useState();

	function registerSuccessHandler() {
		if (registerSuccess == false) setRegisterSuccess(true);
	}

	function isErrorHandler() {
		if (isError == true) setIsError(false);
	}

	function isErrorMatchHandler() {
		if (isErrorMatch == true) setIsErrorMatch(false);
	}

	//logins user by sending a request to server
	async function login(event) {
		event.preventDefault();

		const user = usernameRef.current.value;
		const pass = passwordRef.current.value;

		const auth = await signIn("credentials", {
			redirect: false,
			username: user,
			password: pass,
		});
		if (auth.status == 401) {
			setAuthSuccess(false);
			setIsError(true);
		} else {
			router.push("/boards");
		}
	}

	//registers new user by sending a request to server
	async function signup(event) {
		event.preventDefault();

		const user = usernameRef.current.value;
		const pass = passwordRef.current.value;
		const confirmPass = confirmPasswordRef.current.value;
		//guard clauses
		if (pass.length <= 8) {
			setIsError(true);
		} else if (confirmPass !== pass) {
			setIsErrorMatch(true);
		} else {
			const userSignup = {
				username: user,
				password: pass,
			};

			const response = await fetch(`/api/auth/signup`, {
				method: "POST",
				body: JSON.stringify(userSignup),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			if (data.success) {
				login(event);
			} else {
				setRegisterSuccess(false);
			}

			return data;
		}
	}

	return (
		<div className={[classes.flexRow, classes.heightMax].join(" ")}>
			<Image
				src="svg/low-poly-grid-haikei.svg"
				alt={"login"}
				className={classes.svg}
				height={300}
				width={150}
				position="relative"
				priority={true}
			></Image>

			<Card
				backgroundColor="#FFF8EA"
				borderRadius={0}
				color="#815B5B"
				flex="1 1 50%"
				minW="300px"
				padding="0 20px 0 20px"
			>
				<CardHeader>
					<Heading>
						{isLogin ? "Login to Simple Kanban" : "Create An Account"}
					</Heading>
				</CardHeader>

				<CardBody>
					<form onSubmit={isLogin ? login : signup}>
						<FormControl isRequired marginBottom="24px">
							<FormLabel requiredIndicator>Email</FormLabel>
							<Input
								type="email"
								ref={usernameRef}
								onChange={isLogin ? isErrorHandler : registerSuccessHandler}
							/>
						</FormControl>

						<FormControl isRequired isInvalid={isError} marginBottom="24px">
							<FormLabel requiredIndicator>
								{isLogin ? "Password" : "Password (min. 8 characters)"}
							</FormLabel>
							<InputGroup maxW="450px">
								<Input
									type={showPassword ? "text" : "password"}
									ref={passwordRef}
									onChange={isErrorHandler}
								/>
								<InputRightElement>
									<IconButton
										icon={<ViewIcon />}
										variant="cardIconButton"
										onClick={handleClick}
									></IconButton>
								</InputRightElement>
							</InputGroup>
							{authSuccess == false && isLogin ? (
								<FormErrorMessage marginTop={0}>
									Invalid password or email. Please try again.
								</FormErrorMessage>
							) : (
								<></>
							)}
							{isLogin ? (
								<></>
							) : (
								<FormErrorMessage marginTop={0}>
									Password must be at least 8 characters long.
								</FormErrorMessage>
							)}
						</FormControl>

						{isLogin ? (
							<> </>
						) : (
							<FormControl
								isRequired
								isInvalid={isErrorMatch}
								marginBottom="24px"
							>
								<FormLabel requiredIndicator>Confirm Password</FormLabel>
								<Input
									type="password"
									ref={confirmPasswordRef}
									onChange={isErrorMatchHandler}
								/>

								<FormErrorMessage marginTop={0}>
									Password do not match. Please try again.
								</FormErrorMessage>
							</FormControl>
						)}
						<Button
							width="100px"
							borderRadius="30px"
							bg="#815B5B"
							color="#FFF8EA"
							_hover={{ backgroundColor: "#594545" }}
							type="submit"
						>
							{isLogin ? "Login" : "Create"}
						</Button>

						{registerSuccess === false ? (
							<div>Email already registered. Please try another email.</div>
						) : (
							<></>
						)}
					</form>
				</CardBody>

				<CardFooter>
					<p>
						{isLogin ? "Don't have an account? " : "Already have an account? "}
						<Link
							href={isLogin ? "/signup" : "/login"}
							className={classes.switchForm}
						>
							{isLogin ? "Create an account" : "Sign back in"}
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Login;
