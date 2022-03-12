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
	const { query } = useRecoilValue(sectionState);
	const { data: airingData, isLoading: airingLoading } = useQuery(
		["airingData", "tv"],
		getAiringTvShows
	);
	const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery(
		["nowPlayingData", "tv"],
		getNowPlayingTvShows
	);
	const { data: popularData, isLoading: popularLoading } = useQuery(
		["popularData", "tv"],
		getPopularTvShows
	);
	const { data: topRatedData, isLoading: topRatedLoading } = useQuery(
		["topRatedData", "tv"],
		getTopRatedTvShows
	);
	return (
		<Wrapper>
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Banner movies={nowPlayingData?.results} part="tv" />
			)}
			{airingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="지금 방영 중"
					movies={airingData?.results}
					query="airingData"
					part="tv"
				/>
			)}

			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="최신 드라마"
					movies={nowPlayingData?.results}
					query="nowPlayingData"
					part="tv"
				/>
			)}
			{popularLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="지금 뜨는 콘텐츠"
					movies={popularData?.results}
					query="popularData"
					part="tv"
				/>
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<Sliders
					title="인기 드라마"
					movies={topRatedData?.results}
					query="topRatedData"
					part="tv"
				/>
			)}
			{query ? <InfoBox /> : null}
		</Wrapper>
	);
}

export default TvShow;
