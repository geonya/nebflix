import { useEffect, useState } from "react";
import styled from "styled-components";
import { getVideos } from "../api";
import { IVideo } from "../atoms";

const Wrapper = styled.div<{ isBanner: boolean }>`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	height: 100%;
	transform: translate(-50%, -50%);
	overflow: hidden;
	iframe {
		position: relative;
		top: ${(props) => (props.isBanner ? "-65px" : "-120px")};
		width: 100%;
		height: ${(props) => (props.isBanner ? "115%" : "150%")};
	}
`;

interface IGetVideo {
	id: number;
	part: string;
	isBanner: boolean;
}

const Video = ({ id, part, isBanner }: IGetVideo) => {
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
	return (
		<>
			{videoKey ? (
				<Wrapper isBanner={isBanner}>
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
