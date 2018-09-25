import React from "react";

const CreateForm = props => {
  return (
    <div className="create-event-form-container">
      Fra:{" "} <br/>
      <input
        type="datetime-local"
        onChange={evt => props.handleChange("fromTime", evt.target.value)}
      /> <br/>
      Til:{" "} <br/>
      <input
        type="datetime-local"
        onChange={evt => props.handleChange("toTime", evt.target.value)}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Navn på Event"
        onChange={evt => props.handleChange("header", evt.target.value)}
        value={props.header}
      />
      <br />
      <input
        type="text"
        placeholder="Skriv en settning om den"
        onChange={evt => props.handleChange("oneliner", evt.target.value)}
        value={props.oneliner}
      />
      <br />
      <textarea
        rows="6"
        cols="100"
        placeholder="Skriv event informasjon her..."
        onChange={evt => props.handleChange("info", evt.target.value)}
        value={props.info}
      />
      <br />
      <div>Legg til event bilder:</div>
      <input type="file" placeholder="Legg til bilde" />
      <br />
      <br />
      <button onClick={() => props.createEvent()}>Legg til Event</button>
    </div>
  );
};

export default CreateForm;
