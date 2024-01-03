const Home = () => {
	const user = localStorage.getItem("user");
	return (
		<div className="container">
			<main>
				<div>
					<h1>Welcome {user}</h1>
				</div>
			</main>
		</div>
	);
};

export default Home;
