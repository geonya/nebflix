import { motion } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { favState, IMovie, sectionState } from "../atoms";

const FavBtn = styled(motion.button)<{ islike?: string }>`
	all: unset;
	font-size: 18px;
	cursor: pointer;
	width: 120px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		color: ${(props) =>
			props.islike === "true"
				? props.theme.red
				: props.theme.white.darker};
		width: 30px;
		height: 30px;
		margin-right: 5px;
	}
`;

interface IFav {
	id: number;
	part: string;
	movie: IMovie;
}

const Fav = ({ id, part, movie }: IFav) => {
	const [favMovies, setIsLike] = useRecoilState(favState);
	const setSection = useSetRecoilState(sectionState);
	const favMovie = favMovies?.find(
		(movie) => String(movie.id) === String(id)
	);
	const onFavClick = () => {
		if (part === "favs") {
			setSection({ id: 0, part: "", query: "" });
		}
		setIsLike((oldFavMovies) => {
			if (!movie) return oldFavMovies; // undefined return 방지
			const favMoviesCopy = [...oldFavMovies];
			if (
				favMoviesCopy.findIndex(
					(result) => String(movie.id) === String(result.id)
				) === -1
			) {
				return [
					...favMoviesCopy,
					{
						...movie,
						isLike: true,
					},
				];
			} else {
				const targetIndex = oldFavMovies.findIndex(
					(result) => String(movie.id) === String(result.id)
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
	return (
		<FavBtn islike={`${favMovie?.isLike}`} onClick={onFavClick}>
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
			<span>찜하기</span>
		</FavBtn>
	);
};

export default Fav;
