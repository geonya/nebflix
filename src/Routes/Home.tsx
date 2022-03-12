import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
} from "../api";
import { IGetMovieResult, sectionState } from "../atoms";
import Banner from "../Components/Banner";
import InfoBox from "../Components/InfoBox";
import Sliders from "../Components/Sliders";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

function Home() {
	const { query } = useRecoilValue(sectionState);
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useQuery<IGetMovieResult>(
			["nowPlayingData", "movie"],
			getNowPlayingMovies
		);
	const { data: popularData, isLoading: popularLoading } =
		useQuery<IGetMovieResult>(["popularData", "movie"], getPopularMovies);
	const { data: topRatedData, isLoading: topRatedLoading } =
		useQuery<IGetMovieResult>(["topRatedData", "movie"], getTopRatedMovies);
	const { data: upcomingData, isLoading: upcomingLoading } =
		useQuery<IGetMovieResult>(["upcomingData", "movie"], getUpcomingMovies);

	return (
		<Wrapper>
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Banner movies={nowPlayingData?.results} part="movie" />
			)}
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="지금 상영 중"
					movies={nowPlayingData?.results}
					query="nowPlayingData"
					part="movie"
				/>
			)}
			{popularLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="인기 영화"
					movies={popularData?.results}
					query="popularData"
					part="movie"
				/>
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="명작 영화"
					movies={topRatedData?.results}
					query="topRatedData"
					part="movie"
				/>
			)}
			{upcomingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="개봉 예정"
					movies={upcomingData?.results}
					query="upcomingData"
					part="movie"
				/>
			)}
			{query ? <InfoBox /> : null}
		</Wrapper>
	);
}

export default Home;
