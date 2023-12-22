import React from "react";
import {Image} from "react-bootstrap";

import {useAuth} from "../../services/contexts/AuthProvider";
import startseiteBild from '../../assets/images/startseite.png';
import startseiteBild2 from '../../assets/images/startseite2.png';

export function Startseite() {
  const {authToken} = useAuth()
  const loggedIn = authToken !== null

  return (<>
    {loggedIn && <>
        <h1>Startseite</h1>
        <ul>
            <li>Falls gerade gekocht wird: Aktuelles Rezept und Status (3/7 Arbeitsschritte, T-minus ...min)</li>
            <li>Übersicht zur Einkaufsliste</li>
            <li>Vorrats-Alarm</li>
            <li>Essensplan Vorschau</li>
        </ul>
    </>}

    {!loggedIn && <div className={"startseite-container"}>
        <p><Image src={startseiteBild} width={200} className={'float-left'}/> Herzlich willkommen bei Vestaland, Ihrer
            innovativen Koch-App, die Sie Schritt für Schritt zu kulinarischen
            Meisterwerken führt! Unsere App ist Ihr idealer Begleiter in der Küche, egal ob Sie ein Anfänger oder ein
            erfahrener Koch sind. Mit Vestaland haben Sie nicht nur Zugriff auf eine Vielzahl inspirierender Rezepte,
            sondern auch auf intelligente Funktionen, die das Kochen vereinfachen und bereichern.</p>
        <p><Image src={startseiteBild2} width={200} roundedCircle={true} className={'float-right'}/> Falls Sie gerade
            dabei sind, eines unserer köstlichen Rezepte zuzubereiten, bietet Ihnen Vestaland eine
            Echtzeit-Anzeige des aktuellen Rezeptstatus. So können Sie stets nachverfolgen, an welchem Arbeitsschritt
            Sie sich befinden (z.B. Schritt 3 von 7) und wie lange es noch bis zum fertigen Gericht dauert. Zusätzlich
            erleichtert Ihnen unsere App die Vorbereitung: Mit der integrierten Einkaufslisten-Funktion können Sie
            sicherstellen, dass Sie alle benötigten Zutaten zur Hand haben. Außerdem warnt Sie unser Vorrats-Alarm
            rechtzeitig, wenn essentielle Vorräte zur Neige gehen.</p>
        <p>Planen Sie Ihre Mahlzeiten vorausschauend mit unserer Essensplan-Vorschau. Entdecken Sie neue Rezepte, die
            zu Ihrem Geschmack und Ihren Ernährungsgewohnheiten passen, und organisieren Sie Ihre Mahlzeiten effizient
            für die kommende Woche. Vestaland ist mehr als nur eine Koch-App – es ist Ihr persönlicher Küchenassistent,
            der Ihnen hilft, jeden Tag etwas Besonderes zu zaubern. Starten Sie jetzt und erleben Sie, wie einfach und
            freudvoll Kochen sein kann!</p>
    </div>}
  </>);
}

