import React, { Component } from "react";

class aboutMe extends Component {
  render() {
    return (
      <div>
        <div className="navigation-fix" />
        <img src={"https://res.cloudinary.com/doecwsnly/image/upload/v1537789233/4w.jpg"} alt="" className="image-aboutme"/>
        <div className="about-text-container">
        <span>Jeg er 21 år og en gladjente fra Oslo.</span> Jeg er opptatt av en naturlig,
        god livsstil og ernæring, det er min medisin. Jeg har 1,5 år igjen som
        ernæringsstudent på Tunsberg Medisinske Skole, og er det en ting jeg har
        lært så er det at man aldri blir utlært. Jeg holder aktivt på med blogg
        & Instagram, i tillegg har jeg en hjertesak som omhandler min generasjon
        og har i den forbindelse startet opp prosjektet @uperfektepiker. Du kan
        lese mer om prosjektet HER. Dette bruker jeg mye tid på sammen med 15
        fantastisk gode jenter♥ Jeg er nok over gjennomsnittet interessert i
        bilder både bak og foran kamera som jeg deler her på bloggen og
        Instagram. Håper jeg kan inspirere deg gjennom å dele min kunnskap,
        oppskrifter og mine tanker♥
        </div>
      </div>
    );
  }
}

export default aboutMe;
