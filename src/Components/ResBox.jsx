import React from 'react';
import './ResBox.css'

const ResBox = (props) => {
    const {res} = props;

    console.log(res);

    return (
        <>
        {res.length > 0 && <div className="resDiv">
            {res.map((word) => {return (<>{word}{" "}</>)})}
            </div>}
        </>
    )
}

export default ResBox;