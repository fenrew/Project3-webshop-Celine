import React from 'react';

const CreateForm = () => {
    return (
        <div>
        <input type="text" placeholder="Navn på Event"/>
        <br/>
        <input type="text" placeholder="Skriv en settning om den"/>
        <br/>
        <textarea rows="6" cols="100" placeholder="Skriv event informasjon her..."></textarea>
        <br/>
        <input type="file" placeholder="Legg til bilde"/>
    </div>
    );
};

export default CreateForm;