import React from "react";

const CurrentEvents = props => {
  let toTime = "";
  let newToTime = "";
  let totalToTime = "";
  if (props.toTime) {
    newToTime = props.toTime.substring(0, 10);
    toTime =
      ((parseInt(props.toTime.substring(11, 13)) + 2) % 24).toString() +
      props.toTime.substring(13, 16);
    totalToTime = (
      <div className="event-time">
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
      <div className="event-time">
        Fra: {newFromTime}, klokken: {fromTime}
      </div>
    );
  }
  // console.log(parseInt(props.toTime.substring(5,7)))
  // if (parseInt(props.toTime.substring(8,10)))
  let adminRemove = "";
  if (props.admin)
    adminRemove = (
      <div
        className="remove-event"
        onClick={() => props.removeEvent(props.index)}
      >
        X
      </div>
    );

  return (
    <div>
      {adminRemove}
      <div
        className="each-event-container"
        onClick={() => props.clickHandler(props.index)}
      >
        <h1 className="event-header">{props.header}</h1>
        <div className="event-oneliner">{props.oneliner}</div>
        {totalFromTime}
        {totalToTime}
      </div>
    </div>
  );
};

export default CurrentEvents;
