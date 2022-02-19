import { createGlobalStyle } from "styled-components";
import SurceSansPro from "./SourceSansPro-Regular.woff";

export default createGlobalStyle`
    @font-face {
            font-family:'Source Sans Pro', sans-serif;
            src: local('Source Sans Pro'),
            url(${SurceSansPro}) format('woff');
            font-weight: 400;
            font-style: normal;
        }
`;
