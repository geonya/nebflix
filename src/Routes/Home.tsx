import styled from "styled-components";
import Banner from "../Components/Banner";
import NowPlaying from "../Components/Sliders/NowPlaying";
import TopRated from "../Components/Sliders/TopRated";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

function Home() {
	return (
		<Wrapper>
			<Banner />
			<NowPlaying />
			<TopRated />
		</Wrapper>
	);
}

export default Home;
