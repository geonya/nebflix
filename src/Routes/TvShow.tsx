import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getNowPlayingTvShows, getTopRatedTvShows } from "../api";
import InfoBox from "../Components/InfoBox";
import Sliders from "../Components/Sliders";
import Banner from "../Components/Banner";
import { sectionState } from "../atoms";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

function TvShow() {
	const [sectionName, _] = useRecoilValue(sectionState);
	const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery(
		["nowPlayingTvShows"],
		getNowPlayingTvShows
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
			{sectionName ? <InfoBox sectionName={sectionName + ""} /> : null}
		</Wrapper>
	);
}

export default TvShow;
