export default function() {
  return `
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      .wrapper {
        max-width: 600px;
        margin: 0 auto;
      }

      .grayBg a {
        color: rgba(0, 0, 0, 0.5);
      }

      a {
        color: #fff;
      }
    </style>
  </head>
  <body style="background-color: #F7F7F7; font-family: Helvetica, sans-serif; margin: 0; padding: 0; color: rgba(0, 0, 0, 0.8);">
    <div class="wrapper" style="padding: 20px;">
      <div style="font-size: 18px;">
        <h1>Pre-introduksjon av Kodeboksen</h1>
      </div>
      </div>
      <div style="padding: 20px; background-color: #ECECEC; border-top: 1px solid #cacaca; border-bottom: 1px solid #cacaca;">
        <div class="wrapper">
          <div class="grayBg">
            <p style="color: rgba(0, 0, 0, 0.5); line-height: 24px;">
              Hei!
              <br/>
              <br/>
              Vi har nå utviklet Kodeboksen til det stadiet hvor vi ønsker å få en liten gruppe til å teste ut tjenesten,
              for å gi oss tilbakemelding på hvordan tjenesten oppleves.
              Vi håper at du har anledning til og interesse av å være med på dette!
              Vær kritisk, gi oss din tilbakemelding på om det er noe som ikke fungerer som foventet,
              om det er ting som er vanskelig å forstå, knapper som ikke gir mening, osv...
              <br/><br/>
              Poenget med denne testingen er å forbedre tjenesten, slik at vi klarer å gi en god opplevelse til nye brukere.
              Vi ønsker at de skal bli gira på å bruke Kodeboksen, og at de umiddelbart forstår hvordan man skal bruke tjenesten.
              <br/><br/>
              Vi har laget et pre-introduskjonskurs på Kodeboksen.no.
              For å prøve tjenesten og se vårt første kurs,
              kan du gå inn på <a style="color: rgba(0, 0, 0, 0.4);" href="http://www.kodeboksen.no">kodeboksen.no</a>,
              skrive inn din e-post i feltet på siden, og trykke "Vis meg tjenesten".
              Du vil da bli sendt inn i tjenesten, og du er i gang!
              <br/><br/>
              Dersom du har noen spørsmål eller ønsker å sende oss tilbakemeldinger,
              kontakt oss gjerne på <a style="color: rgba(0, 0, 0, 0.4);" href="mailto:post@kodeboksen.no">post@kodeboksen.no</a>.
              <br/><br/>
              Takk for at du bidrar!
            </p>
          </div>
          <br/>
        </div>
      </div>
      <div class="wrapper" style="padding: 20px; margin-top: 20px;">

      </div>
      <div style="background-color: #ff4081; padding: 20px; color: #fff; font-size: 28px; margin-top: 20px; margin-bottom: 20px;">
        <div class="wrapper">
          <span style="font-size: 16px; color: rgba(255, 255, 255, 0.6)">Med vennlig hilsen,</span> <br/>
          Kodeboksen.no
        </div>
      </div>
      <div class="wrapper" style="font-size: 12px; color: rgba(0, 0, 0, 0.4); padding: 0 20px; margin-bottom: 20px; margin-bottom: 20px;">
        Din e-post sendes ikke videre og vil kun motta e-poster knyttet til Kodeboksen.
        <br/>
        Dersom du ikke ønsker å motte flere e-poster fra oss,
        kontakt oss på <a style="color: rgba(0, 0, 0, 0.4);" href="mailto:post@kodeboksen.no">post@kodeboksen.no</a>
      </div>
  </body>
  </html>
`;
}
