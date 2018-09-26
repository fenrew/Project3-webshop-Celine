import React from "react";

const SpecificEventInfo = props => {
  let newToTime = props.toTime.substring(0, 10);
  let newFromTime = props.fromTime.substring(0, 10);
  // console.log(parseInt(props.toTime.substring(5,7)))
  // if (parseInt(props.toTime.substring(8,10)))
  let toTime =
    ((parseInt(props.toTime.substring(11, 13)) + 2) % 24).toString() +
    props.toTime.substring(13, 16);
  let fromTime =
    ((parseInt(props.fromTime.substring(11, 13)) + 2) % 24).toString() +
    props.fromTime.substring(13, 16);
  return (
    <div className="the-whole-specific-event-container">
    <div className="specific-event-container">
      <div className="navigation-fix" />
      <button
        className="specific-event-button"
        onClick={() => props.clickGoBack()}
      >
        Back
      </button>
      <h1 className="specific-event-header">{props.header}</h1>
      <div className="specific-event-oneliner">{props.oneliner}</div>
      <div className="specific-event-from-time">
        Fra: {newFromTime}, klokken: {fromTime}
      </div>
      <div className="specific-event-to-time">
        Til: {newToTime}, klokken: {toTime}
      </div>
      <div className="specific-event-info">{props.info}</div>
    </div>
    </div>
  );
};

export default SpecificEventInfo;
