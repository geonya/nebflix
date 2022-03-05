import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	currentSlider,
	getNowPlayingMovies,
	getTopRatedMovies,
	IGetMovieResult,
} from "../api";
import Banner from "../Components/Movies/Banner";
import InfoBox from "../Components/InfoBox";
import NowPlaying from "../Components/Movies/Sliders/NowPlaying";
import TopRated from "../Components/Movies/Sliders/TopRated";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

function Home() {
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useQuery<IGetMovieResult>(
			["movies", "nowPlaying"],
			getNowPlayingMovies
		);
	const { data: topRatedData, isLoading: topRatedLoading } =
		useQuery<IGetMovieResult>(["movies", "topRated"], getTopRatedMovies);
	const movieQueryKey = useRecoilValue(currentSlider);
	return (
		<Wrapper>
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Banner movies={nowPlayingData} />
			)}
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<NowPlaying movies={nowPlayingData} />
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<TopRated movies={topRatedData} />
			)}
			{movieQueryKey[0] ? <InfoBox queryKey={movieQueryKey} /> : null}
		</Wrapper>
	);
}

export default Home;
