import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
	currentSlider,
	getNowPlayingTvShows,
	getTopRatedTvShows,
} from "../api";
import InfoBox from "../Components/InfoBox";
import Banner from "../Components/TvShows/Banner";
import NowPlaying from "../Components/TvShows/Sliders/NowPlaying";
import TopRated from "../Components/TvShows/Sliders/TopRated";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

function TvShow() {
	const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery(
		["tvshows", "nowPlaying"],
		getNowPlayingTvShows
	);
	const { data: topRatedData, isLoading: topRatedLoading } = useQuery(
		["tvshows", "topRated"],
		getTopRatedTvShows
	);
	const tvshowQueryKey = useRecoilValue(currentSlider);

	return (
		<Wrapper>
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<Banner tvshows={nowPlayingData} />
			)}
			{nowPlayingLoading ? (
				<span>Loading...</span>
			) : (
				<NowPlaying tvshows={nowPlayingData} />
			)}
			{topRatedLoading ? (
				<span>Loading...</span>
			) : (
				<TopRated tvshows={topRatedData} />
			)}
			{tvshowQueryKey[0] ? <InfoBox queryKey={tvshowQueryKey} /> : null}
		</Wrapper>
	);
}

export default TvShow;
