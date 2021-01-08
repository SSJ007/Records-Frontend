import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";
import Header from "./Header";
import "./Home.css";

function Home() {
    return (
        <>
            <Header title={"Home"} />
            <div className="Home">
                <AwesomeButton
                    href="record_marks"
                    type="primary"
                    style={{ textDecoration: "none" }}
                >
                    Record Marks
                </AwesomeButton>
                <AwesomeButton
                    href="leaderboard"
                    type="secondary"
                    style={{ textDecoration: "none" }}
                >
                    Leaderboard
                </AwesomeButton>
            </div>
        </>
    );
}

export default Home;
