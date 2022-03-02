import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	currentSlider,
	getNowPlayingMovies,
	getTopRatedMovies,
	IGetMovieResult,
} from "../api";
import Banner from "../Components/Banner";
import MovieBox from "../Components/Sliders/MovieBox";
import NowPlaying from "../Components/Sliders/NowPlaying";
import TopRated from "../Components/Sliders/TopRated";

const Wrapper = styled.div`
	overflow-x: hidden;
`;
const Section = styled.div``;

function Home() {
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useQuery<IGetMovieResult>(
			["movies", "nowPlaying"],
			getNowPlayingMovies
		);
	const { data: topRatedData, isLoading: topRatedLoading } =
		useQuery<IGetMovieResult>(["movies", "topRated"], getTopRatedMovies);
	const queryKey = useRecoilValue(currentSlider);
	return (
		<Wrapper>
			<Banner />
			<NowPlaying />
			<TopRated />
			<MovieBox queryKey={queryKey} />
		</Wrapper>
	);
}

export default Home;
