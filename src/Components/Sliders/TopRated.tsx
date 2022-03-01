import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { getTopRatedMovies, IGetMovieResult } from "../../api";
import { makeImagePath } from "../../utils";
import MovieBox from "./MovieBox";

const Slider = styled.div`
	top: -100px;
	position: relative;
	height: 200px;
	margin-bottom: 50px;
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
		font-size: 12px;
	}
	svg {
		fill: white;
		width: 20px;
		height: 20px;
	}
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

const TopRated = () => {
	const [firstLoad, setFirstLoad] = useState(true); // first slider visible set
	const { data, isLoading } = useQuery<IGetMovieResult>(
		["movies", "topRated"],
		getTopRatedMovies
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
	const navigate = useNavigate();
	const onBoxClicked = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};
	const theme = useTheme();

	return (
		<>
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
									onClick={() => onBoxClicked(movie.id)}
								>
									<Info variants={infoVariants}>
										<motion.h4>{movie.title}</motion.h4>
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
			<MovieBox data={data} />
		</>
	);
};

export default TopRated;
