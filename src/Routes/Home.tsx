import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	getMovieVideos,
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
} from "../api";
import { IGetMovieResult, IGetVideoResult, sectionState } from "../atoms";
import Banner from "../Components/Banner";
import InfoBox from "../Components/InfoBox";
import Sliders from "../Components/Sliders";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

function Home() {
	const { sectionId, sectionName } = useRecoilValue(sectionState);
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useQuery<IGetMovieResult>(["nowPlayingMovies"], getNowPlayingMovies);
	const { data: popularData, isLoading: popularLoading } =
		useQuery<IGetMovieResult>(["popularMovies"], getPopularMovies);
	const { data: topRatedData, isLoading: topRatedLoading } =
		useQuery<IGetMovieResult>(["topRatedMovies"], getTopRatedMovies);
	const { data: upcomingData, isLoading: upcomingLoading } =
		useQuery<IGetMovieResult>(["upcomingMovies"], getUpcomingMovies);
	const { data: videos, isLoading: videoLoading } = useQuery<IGetVideoResult>(
		["video"],
		() => getMovieVideos(nowPlayingData?.results[0]?.id)
	);
	const videoKey = videos?.results?.filter(
		(result) => result.type === "Trailer"
	)[0].key;
	return (
		<Wrapper>
			{videoLoading || nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Banner
					movie={nowPlayingData?.results[0]}
					videoKey={videoKey}
				/>
			)}
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="지금 상영 중"
					movies={nowPlayingData?.results}
					sectionName="nowPlayingMovies"
				/>
			)}
			{popularLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="인기 영화"
					movies={popularData?.results}
					sectionName="popularMovies"
				/>
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="명작 영화"
					movies={topRatedData?.results}
					sectionName="topRatedMovies"
				/>
			)}
			{upcomingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="개봉 예정"
					movies={upcomingData?.results}
					sectionName="upcomingMovies"
				/>
			)}
			{sectionName ? (
				<InfoBox sectionId={sectionId} sectionName={sectionName} />
			) : null}
		</Wrapper>
	);
}

export default Home;
