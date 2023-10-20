//component
import Layout from "../layout/Layout";
import Search from "../../components/search/SearchComponent"
import { useState } from "react";

export default function SearchContainer() {
    const [searchvalue, setSearchValue] = useState(null)
    return (
        <>
            <Layout setSearchValue={setSearchValue}>
                <Search searchvalue={searchvalue} />
            </Layout>
        </>
    );
}