import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { favState, IGetMovieResult, sectionState } from "../atoms";
import { makeImagePath } from "../utils";
import FavBtn from "./FavBtn";
import { PlayBtn } from "./PlayBtn";

const CoverBox = styled(motion.div)`
	z-index: 900;
	background-color: ${(props) => props.theme.black.darker};
	position: absolute;
	max-width: 800px;
	height: 800px;
	left: 0;
	right: 0;
	margin: auto auto;
`;

const CoverHeader = styled.div`
	padding: 40px;
	width: 100%;
	height: 500px;
	background-size: cover;
	background-position: center center;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%;
`;

const MovieTitle = styled(motion.div)`
	font-size: xx-large;
	color: ${(props) => props.theme.white.lighter};
	margin-bottom: 35px;
`;

const CoverInfo = styled(motion.div)`
	flex-flow: 1;
	margin-top: 50px;
	color: ${(props) => props.theme.white.lighter};
	display: grid;
	grid-template-columns: 3fr 1fr;

	div:first-child {
		height: 100%;
		padding: 0 50px;
	}
	div:last-child {
		ul {
			li {
				span:first-child {
					font-size: small;
				}
				span:last-child {
					font-size: medium;
				}
				margin-bottom: 10px;
			}
		}
	}
`;

const Overlay = styled(motion.div)`
	z-index: 700;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const InfoBox = () => {
	const [{ id, query, part }, setSection] = useRecoilState(sectionState);
	const { scrollY } = useViewportScroll();
	const favMovies = useRecoilValue(favState);
	const queryClient = useQueryClient();
	const movies =
		part === "favs"
			? favMovies
			: queryClient.getQueryData<IGetMovieResult>([query, part])?.results;
	const selectedMovie = movies?.find(
		(movie) => String(movie.id) === String(id)
	);
	const onOverlayClick = () => {
		setSection({ id: 0, part: "", query: "" });
	};
	return (
		<AnimatePresence>
			{query ? (
				<>
					<Overlay
						onClick={onOverlayClick}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>

					<CoverBox
						layoutId={query + id}
						style={{ top: scrollY.get() + 100 }}
					>
						{selectedMovie && (
							<>
								<CoverHeader
									style={{
										backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(
														${makeImagePath(
															selectedMovie?.backdrop_path ||
																selectedMovie?.poster_path,
															"w500"
														)}
													)`,
									}}
								>
									<div>
										<MovieTitle>
											{selectedMovie.title ??
												selectedMovie.name}
										</MovieTitle>
										<PlayBtn />
									</div>
									<FavBtn
										id={selectedMovie.id}
										part={part || ""}
										movie={selectedMovie}
									/>
								</CoverHeader>
								<CoverInfo>
									<div>{selectedMovie.overview}</div>
									<div>
										<ul>
											<li>
												<span>상영일 : </span>
												<span>
													{selectedMovie.release_date ||
														selectedMovie.first_air_date}
												</span>
											</li>
											<li>
												<span>평점 : </span>
												<span>
													{selectedMovie.vote_average}{" "}
													점
												</span>
											</li>
										</ul>
									</div>
								</CoverInfo>
							</>
						)}
					</CoverBox>
				</>
			) : null}
		</AnimatePresence>
	);
};

export default InfoBox;
