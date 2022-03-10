import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getNowPlayingTvShows, getTopRatedTvShows } from "../api";
import InfoBox from "../Components/InfoBox";
import Sliders from "../Components/Sliders";
import Banner from "../Components/Banner";
import { sectionState } from "../atoms";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

function TvShow() {
	const { sectionId, sectionName } = useRecoilValue(sectionState);
	const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery(
		["nowPlayingTvShows"],
		getNowPlayingTvShows
	);
	const { data: topRatedData, isLoading: topRatedLoading } = useQuery(
		["topRatedTvShows"],
		getTopRatedTvShows
	);
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
					title="최신 시리즈"
					data={nowPlayingData}
					sectionName="nowPlayingTvShows"
				/>
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="명작 시리즈"
					data={topRatedData}
					sectionName="topRatedTvShows"
				/>
			)}
			{sectionName ? (
				<InfoBox sectionId={sectionId} sectionName={sectionName} />
			) : null}
		</Wrapper>
	);
}

export default TvShow;
