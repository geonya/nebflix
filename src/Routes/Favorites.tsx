import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { favState, ISection, sectionState } from "../atoms";
import InfoBox from "../Components/InfoBox";
import { makeImagePath } from "../utils";
import { motion, Variants } from "framer-motion";

const Wrapper = styled.div`
	margin-top: 150px;
	width: 100%;
	height: 100%;
`;

const FavsTable = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-auto-rows: auto;
	gap: 5px;
	margin-bottom: 50px;
`;
const TableTitle = styled.h1`
	font-size: 25px;
	font-weight: 800;
	margin-left: 25px;
	margin-bottom: 20px;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
	cursor: pointer;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	&:nth-child(5n-4) {
		transform-origin: center left;
	}
	&:nth-child(5n) {
		transform-origin: center right;
	}
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

const infoVariants: Variants = {
	hover: {
		opacity: 0.9,
		transition: { type: "tween", delay: 0.3 },
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

function Fav() {
	const [{ id }, setSection] = useRecoilState(sectionState);
	const favMovies = useRecoilValue(favState);
	const onBoxClicked = ({ part, id, query }: ISection) => {
		setSection({ part, id, query });
	};
	return (
		<Wrapper>
			<TableTitle>즐겨찾기</TableTitle>
			{favMovies !== [] ? (
				<FavsTable>
					{favMovies?.map((movie) => (
						<Box
							key={movie.id}
							variants={boxVariants}
							layoutId={"favs" + movie.id}
							initial="normal"
							whileHover="hover"
							transition={{ type: "tween" }}
							bgphoto={makeImagePath(
								movie.backdrop_path ?? movie.poster_path,
								"w500"
							)}
							onClick={() =>
								onBoxClicked({
									part: "favs",
									id: movie.id,
									query: "favs",
								})
							}
						>
							<Info variants={infoVariants}>
								<motion.h4>
									{movie.name || movie.title}
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
				</FavsTable>
			) : (
				"Loading..."
			)}
			{id ? <InfoBox /> : null}
		</Wrapper>
	);
}

export default Fav;
