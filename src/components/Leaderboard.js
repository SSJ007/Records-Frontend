import React from "react";
import "react-awesome-button/dist/themes/theme-blue.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { Button } from "@material-ui/core";

import Header from "./Header";
import DisplayTable from "./DisplayTable";

function Leaderboard() {
    const [students, setStudents] = React.useState([]);
    const [dropDown, setDropDown] = React.useState("name");
    const [sortBy, setSortBy] = React.useState("total_desc");
    const [value, setValue] = React.useState("");
    let timer = null;

    // FETCH STUDENT LIST
    React.useEffect(
        () =>
            fetch(
                `https://sj-almabetter-challenge-api.herokuapp.com/api/students?sort=${sortBy}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setStudents(data);
                }),
        [sortBy]
    );
    // -----> FETCH STUDENT LIST <-----

    // 0.5s TIMER FOR DYNAMIC CLIENT SIDE SEARCH
    const Timer = (event) => {
        // console.log(event.target.value);
        setValue(event.target.value);
        clearTimeout(timer);
        timer = setTimeout(() => {
            onChange(event.target.value);
        }, 500);
    };
    // -----> 0.5s TIMER FOR DYNAMIC CLIENT SIDE SEARCH <-----

    // SEARCH
    const onChange = async (value) => {
        // setValue(event.target.value);
        if (value === "") {
            const url =
                " https://sj-almabetter-challenge-api.herokuapp.com/api/students";
            await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setStudents(data);
                });
        } else if (value !== "") {
            const url =
                dropDown === "name"
                    ? `https://sj-almabetter-challenge-api.herokuapp.com/api/students?name=${value}`
                    : `https://sj-almabetter-challenge-api.herokuapp.com/api/students?roll=${value}`;
            await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setStudents(data);
                });
        }
    };
    // -----> SEARCH <-----

    // DROPDOWN SEARCH CHANGE
    const onDropdownChange = async (event) => {
        setDropDown(event.target.value);
    };
    // -----> DROPDOWN SEARCH CHANGE <-----

    // DROPDOWN SORT SELECTION
    const onSortChange = async (event) => {
        setSortBy(event.target.value);
    };
    // -----> DROPDOWN SORT SELECTION <-----

    return (
        <>
            <Header title={"Leaderboard"} />

            <main>
                <Button
                    href="record_marks"
                    variant="contained"
                    color="primary"
                    style={{
                        padding: "20px 100px",
                        margin: "10px 550px 0px 100px",
                    }}
                >
                    Record Marks
                </Button>
                <Button
                    href="/"
                    variant="contained"
                    color="secondary"
                    style={{
                        padding: "20px 100px",
                        margin: "10px 100px 0px 100px",
                    }}
                >
                    Home
                </Button>
            </main>

            {/* SEARCH BAR */}
            <input
                style={{
                    border: "1px solid #dc004e",
                    margin: "30px 610px 0px 0px",
                    width: "600px",
                    height: "55px",
                    borderRadius: "5px",
                    paddingLeft: "15px",
                }}
                placeholder="Search"
                value={value}
                onChange={Timer}
            />
            {/* -----> SEARCH BAR <---- */}

            {/* DROPDOWN SEARCH */}
            <FormControl
                className="app__dropdown"
                style={{ margin: "20px 900px 0px 20px", width: "300px" }}
            >
                <Select
                    varient="outlined"
                    onChange={onDropdownChange}
                    value={dropDown}
                    style={{
                        minWidth: 150,
                        minHeight: 50,
                        borderBottom: "1px solid blue",
                    }}
                >
                    <MenuItem value="name">Search Across Names</MenuItem>
                    <MenuItem value="roll">Search Across Roll no.</MenuItem>
                </Select>
            </FormControl>
            {/* ---> DROPDOWN SEARCH <---- */}

            {/* SORT SELECTION */}
            <FormControl className="app__dropdown">
                <Select
                    varient="outlined"
                    onChange={onSortChange}
                    value={sortBy}
                    style={{
                        margin: "-100px 150px 0px 1065px",
                        width: "300px",
                    }}
                >
                    <MenuItem value="name_asc">Name: Low to High</MenuItem>
                    <MenuItem value="maths_asc">Maths: Low to High</MenuItem>
                    <MenuItem value="physics_asc">
                        Chemistry: Low to High
                    </MenuItem>
                    <MenuItem value="chemistry_asc">
                        Physics: Low to High
                    </MenuItem>
                    <MenuItem value="total_asc">Total: Low to High</MenuItem>
                    <MenuItem value="name_desc">Name: High to Low</MenuItem>
                    <MenuItem value="maths_desc">Maths: High to Low</MenuItem>
                    <MenuItem value="physics_desc">
                        Chemistry: High to Low
                    </MenuItem>
                    <MenuItem value="chemistry_desc">
                        Physics: High to Low
                    </MenuItem>
                    <MenuItem value="total_desc">Total: High to Low</MenuItem>
                </Select>
            </FormControl>
            {/* ----> SORT SELECTION <----- */}

            {/* LEADERBOARD */}
            <DisplayTable students={students} />
            {/* ----> LEADERBOARD <----- */}
        </>
    );
}

export default Leaderboard;
