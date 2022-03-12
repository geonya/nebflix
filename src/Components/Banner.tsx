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
	overflow: hidden;
`;
const Video = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100vw;
	height: 100vh;
	transform: translate(-50%, -50%);
	overflow: hidden;
	iframe {
		position: relative;
		top: -50px;
		width: 100%;
		height: 115%;
	}
`;

const Title = styled.h1`
	z-index: 200;
	font-size: 58px;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	z-index: 200;
	font-size: 30px;
	width: 50%;
`;

interface IBanner {
	movie?: IMovie;
	videoKey?: string;
}

const Banner = ({ movie, videoKey }: IBanner) => {
	return (
		<Main bgphoto={makeImagePath(movie?.backdrop_path || "")}>
			{videoKey ? (
				<Video>
					<iframe
						src={`https://www.youtube.com/embed/${videoKey}?controls=0?autoplay=1`}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
				</Video>
			) : null}
			<Title>{movie?.title || movie?.name}</Title>
			<Overview>{movie?.overview}</Overview>
		</Main>
	);
};

export default Banner;
