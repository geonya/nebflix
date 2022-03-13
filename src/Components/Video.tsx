import { useEffect, useState } from "react";
import styled from "styled-components";
import { getVideos } from "../api";
import { IVideo } from "../atoms";

const Wrapper = styled.div`
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

interface IGetVideo {
	id: number;
	part: string;
}

const Video = ({ id, part }: IGetVideo) => {
	const [videoKey, setVideoKey] = useState("");
	useEffect(() => {
		(async () => {
			const { results } = await getVideos(id, part);
			const trailer = results.filter(
				(result: IVideo) => result.type === "Trailer"
			);
			const randomVideo =
				trailer[Math.ceil(Math.random() * (trailer.length - 1))];
			const videoKey = randomVideo?.key;
			setVideoKey(videoKey);
		})();
	}, [id, part]);
	console.log(videoKey);
	return (
		<>
			{videoKey ? (
				<Wrapper>
					<iframe
						src={`https://www.youtube.com/embed/${videoKey}?controls=0`}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
				</Wrapper>
			) : null}
		</>
	);
};

export default Video;
