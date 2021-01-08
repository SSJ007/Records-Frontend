import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function DisplayTable(props) {
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
    const classes = useStyles();
    return (
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
                    {props.students.map((student) => (
                        <StyledTableRow key={student.name}>
                            <StyledTableCell>{student.name}</StyledTableCell>
                            <StyledTableCell>{student.roll_no}</StyledTableCell>
                            <StyledTableCell>{student.maths}</StyledTableCell>
                            <StyledTableCell>
                                {student.chemistry}
                            </StyledTableCell>
                            <StyledTableCell>{student.physics}</StyledTableCell>
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
    );
}

export default DisplayTable;
