import React from "react";
import TopNav from "../../Components/NavMenu/TopNav";
import GeneralSearch from "../../Components/NavMenu/GeneralSearch";
import SideLanguageMenu from "../../Components/NavMenu/SideLanguageMenu";
import SideProfileMenu from "../../Components/NavMenu/SideProfileMenu";
function Home(props) {
    return (
        <>
            {/* Navigation Menu */}
            <>
                <TopNav />
                <GeneralSearch />
                <SideProfileMenu />
                <SideLanguageMenu />
            </>
            {/* Main Section */}
            <>

            </>
        </>
    );
}

export default Home;