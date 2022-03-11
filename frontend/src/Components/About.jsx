import NavMenu from "./NavMenu";
import Footer from "./Footer";

export default function About(props) {
    return (<>
        <div style={{height:"100vh", display:"flex", justifyContent:"space-between", alignItems:"center", flexDirection:"column"}}>
            <NavMenu/>
            <h1 style={{margin:"auto" }}>To do...</h1>

            <Footer style={{
                position: "absolute",
                bottom: 0,
            }}/>
        </div>
    </>)
}