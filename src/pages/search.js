import { Helmet } from "react-helmet";
import Search from "../container/search/Search"

import Logo from "../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";

export default function SearchPage() {

    return (
        <>
            <Helmet>
                <title>Search</title>
                <meta property="og:title" content="IsDB - Search" />
                <meta property="og:image" content={Logo} />
            </Helmet>
            <Search />
        </>
    );
}