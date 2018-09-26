import React from 'react';

const CurrentEvents = props => {
    let newToTime = props.toTime.substring(0, 10)
    let newFromTime = props.fromTime.substring(0, 10)
    // console.log(parseInt(props.toTime.substring(5,7)))
    // if (parseInt(props.toTime.substring(8,10)))
    let toTime = ((parseInt(props.toTime.substring(11,13)) + 2)%24).toString() + props.toTime.substring(13, 16);
    let fromTime = ((parseInt(props.fromTime.substring(11,13)) + 2)%24).toString() + props.fromTime.substring(13, 16);

    return (
        <div className="each-event-container" onClick={() => props.clickHandler(props.index)}>
            <h1 className="event-header">{props.header}</h1>
            <div className="event-oneliner">{props.oneliner}</div>
            <div className="event-time">Fra: {newFromTime}, klokken: {toTime}</div>
            <div className="event-time">Til: {newToTime}, klokken: {fromTime}</div>
        </div>
    );
};

export default CurrentEvents;