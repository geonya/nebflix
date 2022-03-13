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
	const part = "movie";
	const { query } = useRecoilValue(sectionState);
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useQuery<IGetMovieResult>(
			["nowPlayingData", part],
			getNowPlayingMovies
		);
	const { data: popularData, isLoading: popularLoading } =
		useQuery<IGetMovieResult>(["popularData", part], getPopularMovies);
	const { data: topRatedData, isLoading: topRatedLoading } =
		useQuery<IGetMovieResult>(["topRatedData", part], getTopRatedMovies);
	const { data: upcomingData, isLoading: upcomingLoading } =
		useQuery<IGetMovieResult>(["upcomingData", part], getUpcomingMovies);
	return (
		<Wrapper>
			{popularLoading ? (
				<span>Loading...</span>
			) : (
				<Banner movies={popularData?.results} part={part} />
			)}
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="지금 상영 중"
					movies={nowPlayingData?.results}
					query="nowPlayingData"
					part={part}
				/>
			)}
			{popularLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="인기 영화"
					movies={popularData?.results}
					query="popularData"
					part={part}
				/>
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="명작 영화"
					movies={topRatedData?.results}
					query="topRatedData"
					part={part}
				/>
			)}
			{upcomingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="개봉 예정"
					movies={upcomingData?.results}
					query="upcomingData"
					part={part}
				/>
			)}
			{query ? <InfoBox /> : null}
		</Wrapper>
	);
}

export default Home;
