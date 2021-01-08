import React from "react";
function Header(props) {
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
                AlmaBetter Coding Challenge - {props.title}
            </h3>
        </>
    );
}

export default Header;
