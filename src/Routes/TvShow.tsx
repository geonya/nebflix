import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	getAiringTvShows,
	getNowPlayingTvShows,
	getPopularTvShows,
	getTopRatedTvShows,
} from "../api";
import InfoBox from "../Components/InfoBox";
import Sliders from "../Components/Sliders";
import Banner from "../Components/Banner";
import { sectionState } from "../atoms";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

function TvShow() {
	const { sectionId, sectionName } = useRecoilValue(sectionState);
	const { data: airingData, isLoading: airingLoading } = useQuery(
		["airingTvShows"],
		getAiringTvShows
	);
	const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery(
		["nowPlayingTvShows"],
		getNowPlayingTvShows
	);
	const { data: popularData, isLoading: popularLoading } = useQuery(
		["popularTvShows"],
		getPopularTvShows
	);
	const { data: topRatedData, isLoading: topRatedLoading } = useQuery(
		["topRatedTvShows"],
		getTopRatedTvShows
	);
	return (
		<Wrapper>
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Banner movie={nowPlayingData?.results[0]} />
			)}
			{airingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="지금 방영 중"
					movies={airingData?.results}
					sectionName="airingTvShows"
				/>
			)}

			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="최신 드라마"
					movies={nowPlayingData?.results}
					sectionName="nowPlayingTvShows"
				/>
			)}
			{popularLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="지금 뜨는 콘텐츠"
					movies={popularData?.results}
					sectionName="popularTvShows"
				/>
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="인기 드라마"
					movies={topRatedData?.results}
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
