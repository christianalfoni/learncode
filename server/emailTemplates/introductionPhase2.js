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
