import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { favState, IGetMovieResult, sectionState } from "../atoms";
import { makeImagePath } from "../utils";

const BigMovie = styled(motion.div)`
	z-index: 900;
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
	padding: 10px;
	padding-left: 50px;
	font-size: 36px;
	color: ${(props) => props.theme.white.lighter};
	margin-bottom: 10px;
`;
const PlayBtn = styled(motion.button)`
	all: unset;
	margin-left: 50px;

	width: 80px;
	height: 30px;

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
	z-index: 700;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const FavBtn = styled(motion.button)<{ islike?: string }>`
	all: unset;
	width: 30px;
	height: 30px;
	color: ${(props) =>
		props.islike === "true" ? props.theme.red : props.theme.white.darker};
	position: relative;
	right: 30px;
	top: 30px;
	cursor: pointer;
`;

const FavInfo = styled(motion.div)`
	width: 80px;
	height: 30px;
	background-color: rgba(0, 0, 0, 0.8);
	position: absolute;
	border-radius: 10px;
	top: 32px;
	right: 9px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CoverHeader = styled.div`
	position: relative;
	top: -130px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const CoverTitle = styled.div``;

interface IInfoBox {
	sectionId: number;
	sectionName: string;
}

const InfoBox = ({ sectionId, sectionName }: IInfoBox) => {
	const [favMovies, setIsLike] = useRecoilState(favState);
	const setSection = useSetRecoilState(sectionState);
	const queryClient = useQueryClient();
	const movies =
		sectionName === "favs"
			? favMovies
			: queryClient.getQueryData<IGetMovieResult>(sectionName)?.results;
	const clickedTab = movies?.find(
		(movie) => String(movie.id) === String(sectionId)
	);
	const onOverlayClick = () => {
		setSection({ sectionId: 0, sectionName: "" });
	};
	const favMovie = favMovies?.find(
		(movie) => String(movie.id) === String(sectionId)
	);
	const onFavClick = () => {
		if (sectionName === "favs") {
			setSection({ sectionId: 0, sectionName: "" });
		}
		setIsLike((oldFavMovies) => {
			if (!clickedTab) return oldFavMovies; // undefined return 방지
			const favMoviesCopy = [...oldFavMovies];
			if (
				favMoviesCopy.findIndex(
					(movie) => String(movie.id) === String(clickedTab.id)
				) === -1
			) {
				return [
					...favMoviesCopy,
					{
						...clickedTab,
						isLike: true,
					},
				];
			} else {
				const targetIndex = oldFavMovies.findIndex(
					(movie) => String(movie.id) === String(clickedTab.id)
				);
				const oldFavMovie = favMoviesCopy[targetIndex];
				favMoviesCopy.splice(targetIndex, 1);
				const newFavMoive = {
					...oldFavMovie,
					isLike: !oldFavMovie.isLike,
				};
				favMoviesCopy.splice(targetIndex, 0, newFavMoive);
				return favMoviesCopy.filter((movie) => movie.isLike);
			}
		});
	};
	const { scrollY } = useViewportScroll();
	const [favHovering, setFavHovering] = useState(false);
	const onFavHoverStart = () => {
		setFavHovering(true);
	};
	const onFavHoverEnd = () => {
		setFavHovering(false);
	};
	return (
		<AnimatePresence>
			{sectionId ? (
				<>
					<Overlay
						onClick={onOverlayClick}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>

					<BigMovie
						layoutId={sectionName + sectionId}
						style={{ top: scrollY.get() + 100 }}
					>
						{clickedTab && (
							<>
								<BigCover
									style={{
										backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(
														${makeImagePath(clickedTab?.backdrop_path, "w500")}
													)`,
									}}
								></BigCover>
								<CoverHeader>
									<CoverTitle>
										<BigTitle>
											{clickedTab.title ??
												clickedTab.name}
										</BigTitle>
										<PlayBtn>Play</PlayBtn>
									</CoverTitle>
									<FavBtn
										onHoverStart={onFavHoverStart}
										onHoverEnd={onFavHoverEnd}
										islike={`${favMovie?.isLike}`}
										onClick={onFavClick}
									>
										<svg
											className="w-6 h-6"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clipRule="evenodd"
											></path>
										</svg>
									</FavBtn>
									{favHovering ? (
										<FavInfo>
											<span>찜하기</span>
										</FavInfo>
									) : null}
								</CoverHeader>
								<BigOverview>{clickedTab.overview}</BigOverview>
							</>
						)}
					</BigMovie>
				</>
			) : null}
		</AnimatePresence>
	);
};

export default InfoBox;
