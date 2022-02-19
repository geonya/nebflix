import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div``;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h1`
	font-size: 58px;
	margin-bottom: 20px;
`;

function Home() {
	const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						bgPhoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
					</Banner>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
