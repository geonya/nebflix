import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getVideos } from "../api";
import { IGetVideoResult, IMovie, videoState } from "../atoms";

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

interface IVideo {
	movie: IMovie;
	part: string;
}

const Video = ({ movie, part }: IVideo) => {
	const setIsVideo = useSetRecoilState(videoState);
	const [videoKey, setVideoKey] = useState("");
	const { data: videos, isLoading: videoLoading } = useQuery<IGetVideoResult>(
		[],
		() => {
			setIsVideo(true);
			return getVideos(movie.id, part);
		}
	);

	useEffect(() => {
		if (videos?.results?.length !== 0) {
			const key =
				videos?.results[
					Math.ceil(Math.random() * (videos?.results.length - 1))
				].key || "";
			setVideoKey(key);
			setIsVideo(true);
		} else {
			setIsVideo(false);
		}
	}, [videos?.results]);
	return (
		<Wrapper>
			<iframe
				src={`https://www.youtube.com/embed/${videoKey}?controls=0`}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			></iframe>
		</Wrapper>
	);
};

export default Video;
