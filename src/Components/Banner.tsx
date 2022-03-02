import { QueryClient, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { getNowPlayingMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utils";

const Main = styled.div<{ bgphoto: string }>`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
`;

const Title = styled.h1`
	font-size: 58px;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	font-size: 30px;
	width: 50%;
`;

const Banner = () => {
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData<IGetMovieResult>([
		"movies",
		"nowPlaying",
	]);
	return (
		<Main bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
			<Title>{data?.results[0].title}</Title>
			<Overview>{data?.results[0].overview}</Overview>
		</Main>
	);
};

export default Banner;
