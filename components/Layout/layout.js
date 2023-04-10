import Header from "../Header/Header";

function Layout(props) {
	return (
		<>
			<Header />
			<main>{props.children}</main>
		</>
	);
}

export default Layout;
