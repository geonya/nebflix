import styled from "styled-components";

import { IMovie } from "../atoms";
import { makeImagePath } from "../utils";
import FavBtn from "./FavBtn";
import { PlayBtn } from "./PlayBtn";
import Video from "./Video";

const Main = styled.div<{ bgphoto: string }>`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding: 60px;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	overflow: hidden;
	background-color: ${(props) => (props.bgphoto ? "trasparent" : "black")};
`;

const Title = styled.h1`
	z-index: 200;
	font-size: 58px;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	z-index: 200;
	font-size: 20px;
	width: 40%;
`;

const Footer = styled.div`
	z-index: 200;
	margin-top: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface IBanner {
	movies?: IMovie[];
	part: string;
}

const Banner = ({ movies, part }: IBanner) => {
	const movie = movies ? movies[0] : null;
	return (
		<>
			{movie ? (
				<Main bgphoto={makeImagePath(movie?.backdrop_path || "")}>
					<Video id={movie.id} part={part} />
					<Title>{movie.title || movie.name}</Title>
					<Overview>{movie.overview}</Overview>
					<Footer>
						<PlayBtn />
						<FavBtn
							id={movie.id}
							part={part}
							movie={movie || undefined}
						/>
					</Footer>
				</Main>
			) : null}
		</>
	);
};

export default Banner;
