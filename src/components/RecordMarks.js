import React from "react";
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";
import Header from "./Header";

class RecordMarks extends React.Component {
    state = {
        name: "",
        roll_no: "",
        maths: 0,
        physics: 0,
        chemistry: 0,
    };

    createNewRecord = (student) => {
        fetch(
            "https://sj-almabetter-challenge-api.herokuapp.com/api/students",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
            }
        );
        // console.log(student);
    };

    // FORM VALIDATION
    validate = () => {
        if (
            this.state.physics < 0 ||
            this.state.physics > 100 ||
            this.state.maths < 0 ||
            this.state.maths > 100 ||
            this.state.chemistry < 0 ||
            this.state.chemistry > 100
        ) {
            Swal.fire("", "Marks cannot be less than 0 or more than 100!");
            return false;
        }
        if (this.state.name === "") {
            Swal.fire("", "Name cannot be empty!");
            return false;
        }
        if (/\d/.test(this.state.name)) {
            Swal.fire("", "Name cannot have numerical values!");
            return false;
        }
        if (this.state.roll_no === "") {
            Swal.fire("", "Roll Number cannot be empty!");
            return false;
        }

        return true;
    };
    // ----> FORM VALIDATION <----

    handleNameUpdate = (evt) => {
        this.setState({ name: evt.target.value });
    };
    handleRollUpdate = (evt) => {
        this.setState({ roll_no: evt.target.value });
    };
    handlePhysicsUpdate = (evt) => {
        this.setState({ physics: parseInt(evt.target.value) });
    };
    handleMathsUpdate = (evt) => {
        this.setState({ maths: parseInt(evt.target.value) });
    };
    handleChemistryUpdate = (evt) => {
        this.setState({ chemistry: parseInt(evt.target.value) });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Student record successfully added",
                showConfirmButton: false,
                timer: 2000,
            });
            this.createNewRecord({ ...this.state });
            this.setState({
                name: "",
                roll_no: "",
                maths: 0,
                physics: 0,
                chemistry: 0,
            });
        }
    };
    render() {
        return (
            <>
                <Header title={"Record Marks"} />

                <form
                    onSubmit={this.handleSubmit}
                    style={{
                        width: "60%",
                        marginLeft: "330px",
                        marginTop: "30px",
                    }}
                >
                    <div className="form-group">
                        <label></label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleNameUpdate}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label></label>
                        <input
                            type="text"
                            placeholder="Roll Number"
                            value={this.state.roll_no}
                            onChange={this.handleRollUpdate}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label></label>
                        <input
                            type="text"
                            placeholder="Maths Marks"
                            value={this.state.maths ? this.state.maths : ""}
                            onChange={this.handleMathsUpdate}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label></label>
                        <input
                            type="text"
                            placeholder="Physics Marks"
                            value={this.state.physics ? this.state.physics : ""}
                            onChange={this.handlePhysicsUpdate}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label></label>
                        <input
                            type="text"
                            placeholder="Chemistry Marks"
                            value={
                                this.state.chemistry ? this.state.chemistry : ""
                            }
                            onChange={this.handleChemistryUpdate}
                            className="form-control"
                        />
                    </div>
                    <label>
                        Total{" "}
                        {(this.state.maths ? this.state.maths : 0) +
                            (this.state.physics ? this.state.physics : 0) +
                            (this.state.chemistry ? this.state.chemistry : 0)}
                        &emsp; Percentage{" "}
                        {(
                            ((this.state.maths ? this.state.maths : 0) +
                                (this.state.physics ? this.state.physics : 0) +
                                (this.state.chemistry
                                    ? this.state.chemistry
                                    : 0)) /
                            3
                        ).toFixed(2)}
                        %
                    </label>
                    <div className="form-group d-flex justify-content-between">
                        <button
                            type="submit"
                            className="btn btn-md btn-primary"
                            style={{ marginTop: 30, marginLeft: 420 }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <main>
                    <Button
                        href="leaderboard"
                        variant="contained"
                        color="primary"
                        style={{
                            padding: "20px 100px",
                            margin: "30px 550px 0px 100px",
                        }}
                    >
                        Leaderboard
                    </Button>
                    <Button
                        href="/"
                        variant="contained"
                        color="secondary"
                        style={{
                            padding: "20px 100px",
                            margin: "30px 100px 0px 100px",
                        }}
                    >
                        Home
                    </Button>
                </main>
            </>
        );
    }
}

export default RecordMarks;
