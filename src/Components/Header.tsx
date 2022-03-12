import {
	motion,
	useAnimation,
	useViewportScroll,
	Variants,
} from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Nav = styled(motion.div)`
	z-index: 500;
	position: fixed;
	top: 0;
	width: 100%;
	height: 80px;
	font-size: 14px;
	padding: 20px 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${(props) => props.theme.white.lighter};
`;
const Col = styled(motion.div)`
	display: flex;
	align-items: center;
`;
const Logo = styled(motion.svg)`
	margin-right: 50px;
	width: 95px;
	height: 25px;
	fill: ${(props) => props.theme.red};
`;
const ITems = styled(motion.ul)`
	display: flex;
	align-items: center;
`;
const Item = styled(motion.li)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-right: 20px;
	position: relative;
	color: ${(props) => props.theme.white.darker};
	&:hover {
		color: ${(props) => props.theme.white.lighter};
	}
	transition: color 0.3s ease-in-out;
`;

const Circle = styled(motion.div)`
	position: absolute;
	bottom: -10px;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background-color: ${(props) => props.theme.red};
`;

const Search = styled(motion.form)`
	position: relative;
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.white.lighter};
	svg {
		height: 25px;
	}
`;
const Input = styled(motion.input)`
	transform-origin: right center;
	z-index: -1;
	position: absolute;
	right: 0;
	margin: auto, 0;
	padding: 5px 10px;
	padding-left: 40px;
	font-size: 16px;
	color: ${(props) => props.theme.white.lighter};
	background-color: rgba(0, 0, 0, 0.8);
	border: 0.1px solid ${(props) => props.theme.white.lighter};
`;

const ProfileBtn = styled(motion.div)`
	cursor: pointer;
	margin-left: 50px;
	width: 50px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.white.lighter};
	a {
		height: 35px;
		img {
			border-radius: 5px;
			width: 35px;
			height: 35px;
		}
	}
	span {
		margin-left: 15px;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 5px 5px 0 5px;
		border-color: #fff transparent transparent transparent;
	}
`;

const ProfileMenu = styled(motion.div)`
	position: absolute;
	top: 40px;
	right: 42px;
	section {
		position: relative;
		top: 30px;
		width: 150px;
		height: 220px;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-around;
		padding: 10px 15px;
		a {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			img {
				border-radius: 5px;
				width: 35px;
				height: 35px;
			}
			span {
				font-size: 15px;
				font-weight: 600;
				margin-left: 15px;
			}
		}
	}
`;

const navVariants: Variants = {
	top: {
		background:
			"linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0))",
		backgroundColor: "rgba(0,0,0,0)",
	},
	scroll: {
		background: "linear-gradient(0)",
		backgroundColor: "rgba(0,0,0,1)",
	},
};

const profileArrowVariants: Variants = {
	initial: { rotateZ: 0 },
	animate: (profileHovering: boolean) => ({
		rotateZ: profileHovering ? 180 : 0,
	}),
	exit: { rotateZ: 0 },
};

interface IForm {
	keyword: string;
}

function Header() {
	const [profileHovering, setProfileHovering] = useState(false);
	const homeMatch = useMatch("/");
	const tvMatch = useMatch("/tvshows");
	const favMatch = useMatch("/favs");
	const navAnimation = useAnimation();
	const inputAnimation = useAnimation();
	const { scrollY } = useViewportScroll();
	const { register, handleSubmit, setFocus } = useForm<IForm>();
	const [searchOpen, setSearchOpen] = useState(false);
	const navigate = useNavigate();
	const onValid = ({ keyword }: IForm) => {
		navigate(`/search?keyword=${keyword}`);
	};
	const toggleSearch = () => {
		setFocus("keyword");
		searchOpen
			? inputAnimation.start({
					scaleX: 0,
			  })
			: inputAnimation.start({
					scaleX: 1,
			  });
		setSearchOpen((prev) => !prev);
	};
	const onProfileHoverStart = () => {
		setProfileHovering(true);
	};
	const onProfileHoverEnd = () => {
		setProfileHovering(false);
	};

	useEffect(() => {
		scrollY.onChange(() =>
			scrollY.get() > 80
				? navAnimation.start("scroll")
				: navAnimation.start("top")
		);
	}, [scrollY, navAnimation]);
	//page enter scroll top
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<Nav variants={navVariants} initial="top" animate={navAnimation}>
			<Col>
				<Link to="/">
					<Logo
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1024 276.742"
					>
						<motion.g transform="translate(0.000000,313.000000) scale(0.100000,-0.100000)">
							<motion.path d="M100 1580 l0 -1451 33 6 c17 3 106 18 197 33 l165 28 5 1039 c3 572 8 1033 12 1025 14 -30 385 -1396 493 -1820 21 -80 41 -149 45 -153 6 -6 356 33 428 49 l22 4 0 1345 0 1345 -195 0 -195 0 -1 -797 c0 -684 -3 -792 -14 -758 -8 22 -104 366 -215 765 -111 399 -206 740 -211 758 l-11 32 -279 0 -279 0 0 -1450z" />
							<motion.path d="M1820 1702 l0 -1328 159 17 c204 22 669 65 879 80 l162 12 0 194 0 193 -34 0 c-43 0 -593 -38 -668 -46 l-58 -6 0 390 0 389 88 7 c48 3 155 8 237 11 83 3 178 8 213 11 l62 6 0 180 0 180 -137 -6 c-76 -3 -211 -9 -300 -12 l-163 -6 0 349 0 350 182 6 c99 4 270 7 380 7 l198 0 0 175 0 175 -600 0 -600 0 0 -1328z" />
							<motion.path d="M3290 1764 l0 -1267 63 6 c34 3 188 11 342 17 433 17 516 29 654 96 149 73 250 212 286 392 14 68 16 125 13 310 -5 202 -8 234 -27 291 -45 128 -114 208 -235 268 l-59 30 54 30 c63 35 138 112 168 171 34 67 51 150 58 278 15 298 -64 478 -251 569 -130 64 -163 67 -638 72 l-428 4 0 -1267z m760 904 c45 -19 86 -67 100 -116 13 -49 13 -307 -1 -357 -16 -57 -73 -110 -139 -128 -30 -9 -106 -17 -167 -19 l-113 -3 0 324 0 324 143 -5 c94 -4 154 -10 177 -20z m41 -1005 c47 -24 58 -36 84 -88 l30 -60 0 -210 c0 -236 -7 -277 -58 -328 -48 -47 -93 -58 -264 -64 l-153 -5 0 391 0 391 153 0 c148 0 156 -1 208 -27z" />
							<motion.path d="M4910 1790 l0 -1240 225 0 225 0 0 533 0 533 280 -4 280 -4 0 174 0 175 -167 6 c-91 4 -217 7 -280 7 l-113 0 0 360 0 360 360 0 360 0 0 170 0 170 -585 0 -585 0 0 -1240z" />
							<motion.path d="M6290 1776 l0 -1253 143 -7 c205 -10 583 -34 797 -51 102 -8 195 -15 207 -15 l23 0 0 194 0 194 -32 5 c-18 3 -168 13 -333 22 -165 9 -315 19 -332 21 l-33 5 0 1069 0 1070 -220 0 -220 0 0 -1254z" />
							<motion.path d="M7640 1730 c0 -715 4 -1300 8 -1300 4 0 95 -9 202 -20 107 -11 204 -20 217 -20 l23 0 0 1320 0 1320 -225 0 -225 0 0 -1300z" />
							<motion.path d="M8343 3013 c3 -10 63 -178 135 -373 177 -485 312 -868 312 -888 0 -10 -32 -105 -71 -212 -69 -192 -314 -882 -380 -1072 -18 -53 -31 -99 -28 -102 5 -5 402 -56 406 -52 1 1 82 243 179 537 152 463 194 580 194 545 0 -4 41 -141 91 -304 49 -163 126 -423 170 -577 44 -154 84 -286 88 -294 5 -10 79 -26 236 -52 126 -21 230 -37 231 -36 2 2 -116 407 -191 650 -31 100 -110 349 -177 554 l-121 372 221 635 c122 349 224 646 228 660 l6 26 -205 0 -204 0 -106 -313 c-59 -172 -134 -394 -168 -492 l-62 -179 -165 492 -164 492 -230 0 c-215 0 -230 -1 -225 -17z" />
						</motion.g>
					</Logo>
				</Link>
				<ITems>
					<Item>
						<Link to="/">
							홈 {homeMatch && <Circle layoutId="circle" />}
						</Link>
					</Item>
					<Item>
						<Link to="/tvshows">
							시리즈 {tvMatch && <Circle layoutId="circle" />}
						</Link>
					</Item>
					<Item>
						<Link to="/favs">
							내가 찜한 콘텐츠
							{favMatch && <Circle layoutId="circle" />}
						</Link>
					</Item>
				</ITems>
			</Col>
			<Col>
				<Search onSubmit={handleSubmit(onValid)} onClick={toggleSearch}>
					<motion.svg
						style={{ cursor: "pointer" }}
						animate={{
							x: searchOpen ? -185 : 0,
						}}
						transition={{ type: "tween" }}
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clipRule="evenodd"
						></path>
					</motion.svg>
					<Input
						{...register("keyword", {
							required: true,
							minLength: 2,
							onBlur: () => searchOpen && toggleSearch(),
						})}
						animate={inputAnimation}
						initial={{ scaleX: 0 }}
						transition={{ type: "tween" }}
						placeholder="Search for Movie or TVShows"
						autoComplete="off"
					/>
				</Search>
				<ProfileBtn
					custom={profileHovering}
					onHoverStart={onProfileHoverStart}
					onHoverEnd={onProfileHoverEnd}
				>
					<a
						href="https://github.com/geonya"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="https://avatars.githubusercontent.com/u/39020648?v=4"
							alt="profile-avatar"
						/>
					</a>
					<motion.span
						transition={{ type: "tween" }}
						custom={profileHovering}
						variants={profileArrowVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						role="presentation"
					></motion.span>
				</ProfileBtn>
				{profileHovering ? (
					<ProfileMenu
						onHoverStart={onProfileHoverStart}
						onHoverEnd={onProfileHoverEnd}
					>
						<section>
							<div>
								<a
									href="https://github.com/geonya"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src="https://avatars.githubusercontent.com/u/39020648?v=4"
										alt="profile-avatar"
									/>

									<span>Geony</span>
								</a>
							</div>
							<div>
								<a
									href="https://github.com/geonya"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src="https://occ-0-4796-993.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABRPKfs177BiQ9YtqkOYpH3JplmNJ4TsojR5D_rNvQtAPCPBxGAeLaWDMJpaPTA-D-5uXJ6pkCbeMjTr7h5HAO_4.png?r=02c"
										alt="profile-avatar"
									/>

									<span>Bora</span>
								</a>
							</div>
							<div>
								<a
									href="https://nomadcoders.co"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src="https://avatars.githubusercontent.com/u/3612017?v=4"
										alt="profile-avatar"
									/>
									<span>Nico</span>
								</a>
							</div>
							<div>
								<a
									href="https://nomadcoders.co"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/lynn-1608029862.jpg"
										alt="profile-avatar"
									/>
									<span>Lynn</span>
								</a>
							</div>
						</section>
					</ProfileMenu>
				) : null}
			</Col>
		</Nav>
	);
}

export default Header;
