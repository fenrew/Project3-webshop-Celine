import React from "react";

const SpecificEventInfo = props => {
  let toTime = "";
  let newToTime = "";
  let totalToTime = "";
  if (props.toTime) {
    newToTime = props.toTime.substring(0, 10);
    toTime =
      ((parseInt(props.toTime.substring(11, 13)) + 2) % 24).toString() +
      props.toTime.substring(13, 16);
    totalToTime = (
      <div>
        Til: {newToTime}, klokken: {toTime}
      </div>
    );
  }
  let fromTime = "";
  let newFromTime = "";
  let totalFromTime = "";
  if (props.fromTime) {
    newFromTime = props.fromTime.substring(0, 10);
    fromTime =
      ((parseInt(props.fromTime.substring(11, 13)) + 2) % 24).toString() +
      props.fromTime.substring(13, 16);
    totalFromTime = (
      <div>
        Fra: {newFromTime}, klokken: {fromTime}
      </div>
    );
  }
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
        {totalFromTime}
      </div>
      <div className="specific-event-to-time">
        {totalToTime}
      </div>
      <div className="specific-event-info">{props.info}</div>
    </div>
    </div>
  );
};

export default SpecificEventInfo;
