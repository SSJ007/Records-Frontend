import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";
import "./Home.css";

function Home() {
    return (
        <>
            <h1
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                    fontWeight: "400",
                    marginTop: 30,
                }}
            >
                AlmaBetter Coding Challenge - Student Records
            </h1>
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
