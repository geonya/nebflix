import styled from "styled-components";
import { IMovie } from "../atoms";
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
interface IBanner {
	movie?: IMovie;
}
const Banner = ({ movie }: IBanner) => {
	return (
		<Main bgphoto={makeImagePath(movie?.backdrop_path || "")}>
			<Title>{movie?.title || movie?.name}</Title>
			<Overview>{movie?.overview}</Overview>
		</Main>
	);
};

export default Banner;
