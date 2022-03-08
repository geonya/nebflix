import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TvShow from "./Routes/TvShow";

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Header />
			<Routes>
				<Route path="/" element={<Home />}>
					<Route path="movies/:id"></Route>
				</Route>
				<Route path="/tvshows" element={<TvShow />}>
					<Route path=":id"></Route>
				</Route>
				<Route path="/search" element={<Search />}>
					<Route path="movies/:id"></Route>
					<Route path="tvshows/:id"></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
