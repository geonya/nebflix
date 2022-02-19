import {
	motion,
	Variants,
	AnimatePresence,
	motionValue,
	useViewportScroll,
} from "framer-motion";
import { url } from "inspector";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { getMovies, IGetMovieResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	overflow-x: hidden;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Banner = styled.div<{ bgphoto: string }>`
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

const Slider = styled.div`
	top: -100px;
	position: relative;
	height: 200px;
`;

const Row = styled(motion.div)`
	position: absolute;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 5px;
`;

const NextBtn = styled(motion.div)`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0px;
	right: 0px;
	width: 70px;
	height: 100%;
	padding-right: 15px;
	padding-left: 10px;
	background-color: rgba(0, 0, 0, 0.5);
	svg {
		height: 55px;
	}
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	height: 200px;

	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
	cursor: pointer;
`;

const Info = styled(motion.div)`
	position: absolute;
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	place-items: center;
	place-content: center;
	width: 100%;
	bottom: 0;
	opacity: 0;
	padding: 10px;
	height: 20%;
	background-color: ${(props) => props.theme.black.darker};
	h4 {
		grid-column-start: 2;
		font-size: 18px;
	}
	svg {
		fill: white;
		width: 20px;
		height: 20px;
	}
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

const rowVariants: Variants = {
	hidden: {
		x: window.outerWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 5,
	},
};

const boxVariants: Variants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.5,
		y: -50,
		transition: { type: "tween", delay: 0.3 },
	},
};

const infoVariants: Variants = {
	hover: {
		opacity: 0.9,
		transition: { type: "tween", delay: 0.3 },
	},
};

const offSet = 6;

function Home() {
	const [firstLoad, setFirstLoad] = useState(true); // first slider visible set
	const { data, isLoading } = useQuery<IGetMovieResult>(
		["movies", "nowPlaying"],
		getMovies
	);
	const [index, setIndex] = useState(0);
	const nextSlide = () => {
		if (data) {
			setFirstLoad(false);
			const totalMovies = data?.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offSet) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const bigMovieMatch = useMatch("/movies/:movieId");
	const navigate = useNavigate();
	const onBoxClicked = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};
	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.results.find(
			(movie) => String(movie.id) === bigMovieMatch?.params.movieId
		);
	const onOverlayClick = () => {
		navigate("../", { replace: true });
	};

	const { scrollY } = useViewportScroll();

	const theme = useTheme();
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						bgphoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence>
							<Row
								variants={rowVariants}
								initial={firstLoad ? { x: 0 } : "hidden"}
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={index}
							>
								{data?.results
									.slice(1)
									.slice(index * offSet, (index + 1) * offSet)
									.map((movie) => (
										<Box
											key={movie.id}
											variants={boxVariants}
											layoutId={movie.id + ""}
											initial="normal"
											whileHover="hover"
											transition={{ type: "tween" }}
											bgphoto={makeImagePath(
												movie.backdrop_path,
												"w500"
											)}
											onClick={() =>
												onBoxClicked(movie.id)
											}
										>
											<Info variants={infoVariants}>
												<motion.h4>
													{movie.title}
												</motion.h4>
												<motion.svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 246.6l-112 112C272.4 364.9 264.2 368 256 368s-16.38-3.125-22.62-9.375l-112-112c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L256 290.8l89.38-89.38c12.5-12.5 32.75-12.5 45.25 0S403.1 234.1 390.6 246.6z" />
												</motion.svg>
											</Info>
										</Box>
									))}
							</Row>
							<NextBtn onClick={nextSlide}>
								<motion.svg
									initial={{
										fill: theme.white.darker,
									}}
									whileHover={{
										fill: theme.white.lighter,
									}}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512"
								>
									<motion.path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
								</motion.svg>
							</NextBtn>
						</AnimatePresence>
					</Slider>
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
											<BigTitle>
												{clickedMovie.title}
											</BigTitle>
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
				</>
			)}
		</Wrapper>
	);
}

export default Home;
