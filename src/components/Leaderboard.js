import React from "react";
import "react-awesome-button/dist/themes/theme-blue.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

function Leaderboard() {
    // TABLE STYLING
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 275,
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        table: {
            minWidth: 100,
        },
    }));
    // ----> TABLE STYLING <-----

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

    const Timer = (event) => {
        // console.log(event.target.value);
        setValue(event.target.value);
        clearTimeout(timer);
        timer = setTimeout(() => {
            onChange(event.target.value);
        }, 500);
    };

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

    const classes = useStyles();
    return (
        <>
            <h3
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                    fontWeight: "400",
                    marginTop: 10,
                }}
            >
                AlmaBetter Coding Challenge - Student Records
            </h3>
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

            <TableContainer
                className="change"
                component={Paper}
                style={{
                    marginTop: "30px",
                    width: "80%",
                    marginLeft: "150px",
                }}
            >
                <Table
                    id="change1"
                    className={classes.table}
                    aria-label="customized table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Roll Number</StyledTableCell>
                            <StyledTableCell>Maths</StyledTableCell>
                            <StyledTableCell>Physics</StyledTableCell>
                            <StyledTableCell>Chemistry</StyledTableCell>
                            <StyledTableCell>Total</StyledTableCell>
                            <StyledTableCell>Percentage</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <StyledTableRow key={student.name}>
                                <StyledTableCell>
                                    {student.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {student.roll_no}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {student.maths}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {student.chemistry}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {student.physics}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {student.maths +
                                        student.physics +
                                        student.chemistry}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {(
                                        (student.maths +
                                            student.physics +
                                            student.chemistry) /
                                        3
                                    ).toFixed(2)}
                                    %
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Leaderboard;
