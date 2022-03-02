import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQueryClient } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMovieResult } from "../../api";
import { makeImagePath } from "../../utils";

const BigMovie = styled(motion.div)`
	background-color: ${(props) => props.theme.black.darker};
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: auto auto;
`;

const BigCover = styled(motion.div)`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 400px;
`;
const BigTitle = styled(motion.h3)`
	position: relative;
	top: -130px;
	padding: 10px;
	padding-left: 50px;
	font-size: 36px;
	color: ${(props) => props.theme.white.lighter};
`;
const PlayBtn = styled(motion.button)`
	all: unset;
	margin-left: 50px;
	top: -120px;
	width: 80px;
	height: 30px;
	position: relative;
	text-align: center;
	font-weight: 600;
	background-color: ${(props) => props.theme.white.lighter};
	color: ${(props) => props.theme.black.darker};
	border-radius: 5px;
`;
const BigOverview = styled(motion.p)`
	top: -80px;
	padding: 20px;
	color: ${(props) => props.theme.white.lighter};
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const MovieBox = ({ queryKey }: { [queryKey: string]: [string, string] }) => {
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData<IGetMovieResult>(queryKey);
	const navigate = useNavigate();
	const bigMovieMatch = useMatch("/movies/:movieId");
	const clickedMovie = data?.results.find(
		(movie) => String(movie.id) === bigMovieMatch?.params.movieId
	);
	const onOverlayClick = () => {
		navigate("../", { replace: true });
	};
	const { scrollY } = useViewportScroll();
	return (
		<AnimatePresence>
			{bigMovieMatch ? (
				<>
					<Overlay
						onClick={onOverlayClick}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>

					<BigMovie
						layoutId={bigMovieMatch.params.movieId}
						style={{ top: scrollY.get() + 100 }}
					>
						{clickedMovie && (
							<>
								<BigCover
									style={{
										backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(
														${makeImagePath(clickedMovie.backdrop_path, "w500")}
													)`,
									}}
								></BigCover>
								<BigTitle>{clickedMovie.title}</BigTitle>
								<PlayBtn>Play</PlayBtn>
								<BigOverview>
									{clickedMovie.overview}
								</BigOverview>
							</>
						)}
					</BigMovie>
				</>
			) : null}
		</AnimatePresence>
	);
};

export default MovieBox;
