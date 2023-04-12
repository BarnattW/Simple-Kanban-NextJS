import { UserContext } from "../../context/UserContext";
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
import { useContext, useRef, useState } from "react";
import classes from "./Login.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

function Login(props) {
	//used to toggle elements in login and register
	const isLogin = props.type === "login" ? true : false;

	//toggles between hidden and text password
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	//auth params
	const router = useRouter();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	//toggles form errors
	const [isError, setIsError] = useState(false);
	const [isErrorMatch, setIsErrorMatch] = useState(false);
	const [authSuccess, setAuthSuccess] = useState();
	const [registerSuccess, setRegisterSuccess] = useState();

	const { setUser } = useContext(UserContext);
	const { data: session, status } = useSession();

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

		if (auth.status != 401) {
			setAuthSuccess(true);
			//if auth is successful, fetch user data
			const response = await fetch(`/api/user/${session.user.username}`, {
				method: "POST",
				body: JSON.stringify({ username: session.user.username }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const userData = await response.json();
			console.log(userData);
			setUser(userData);
			setIsError(false);
			router.push("/boards");
		} else {
			setIsError(true);
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
				setRegisterSuccess(data.success);
				console.log(data);
			} else {
				console.log(data);
				throw new Error(data.message || "Something went wrong");
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
							<Input type="email" ref={usernameRef} />
						</FormControl>

						<FormControl isRequired isInvalid={isError} marginBottom="24px">
							<FormLabel requiredIndicator>
								{isLogin ? "Password" : "Password (min. 8 characters)"}
							</FormLabel>
							<InputGroup maxW="450px">
								<Input type={show ? "text" : "password"} ref={passwordRef} />
								<InputRightElement>
									<IconButton
										icon={<ViewIcon />}
										variant="cardIconButton"
										onClick={handleClick}
									></IconButton>
								</InputRightElement>
							</InputGroup>
							{authSuccess === false && isLogin ? (
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
								<Input type="password" ref={confirmPasswordRef} />

								<FormErrorMessage marginTop={0}>
									Password do not match. Please try again.
								</FormErrorMessage>
							</FormControl>
						)}
						<Button variant="userAuthButton" type="submit">
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
