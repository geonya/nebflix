import styled from "styled-components";
import { IGetMovieResult } from "../../api";
import { makeImagePath } from "../../utils";

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
interface IBanner {
	movies?: IGetMovieResult;
}
const Banner = (data: IBanner) => {
	const { movies }: IBanner = data;
	return (
		<Main bgphoto={makeImagePath(movies?.results[0].backdrop_path || "")}>
			<Title>{movies?.results[0].title}</Title>
			<Overview>{movies?.results[0].overview}</Overview>
		</Main>
	);
};

export default Banner;
