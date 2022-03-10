import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getNowPlayingMovies, getTopRatedMovies } from "../api";
import { IGetMovieResult, sectionState } from "../atoms";
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
	const { data: topRatedData, isLoading: topRatedLoading } =
		useQuery<IGetMovieResult>(["topRatedMovies"], getTopRatedMovies);
	//page enter scroll top
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
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
				<Sliders
					title="최신 영화"
					data={nowPlayingData}
					sectionName="nowPlayingMovies"
				/>
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="명작 영화"
					data={topRatedData}
					sectionName="topRatedMovies"
				/>
			)}
			{sectionName ? (
				<InfoBox sectionId={sectionId} sectionName={sectionName} />
			) : null}
		</Wrapper>
	);
}

export default Home;
