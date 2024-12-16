// ==UserScript==
// @name         ProNet 12 Specific Cookie Cleaner
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Voegt een handmatige refresh knop toe om specifieke cookies voor ProNet 12 Protime te wissen
// @match        https://pronet12.myprotime.be/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Functie om specifieke cookies voor ProNet 12 te wissen
    function clearPronetCookies() {
        // Array met specifieke cookie-namen die je wilt verwijderen
        const cookiesToRemove = [
            '.ASPXAUTH',  // Typische ASP.NET authentication cookie
            'ASP.NET_SessionId',  // Sessie-cookie
            'ProTimeAuthCookie'  // Mogelijke ProTime-specifieke authenticatie cookie
        ];

        // Loop door de cookies en verwijder de specifieke
        cookiesToRemove.forEach(cookieName => {
            // Verwijder cookie voor het huidige domein
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
            // Extra poging om cookies te verwijderen zonder domein
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        });

        console.log("Specifieke ProNet 12 cookies zijn verwijderd");
    }

    // Controleer of de pagina een foutpagina is
    const isErrorPage = window.location.href === "https://pronet12.myprotime.be/pronetee.premnat12/Forms/Login.aspx?aspxerrorpath=/pronetEE.premnat12/forms/login.aspx";

    // Maak de "Reload" knop alleen zichtbaar als er een fout is
    if (isErrorPage) {
        const reloadButton = document.createElement('button');
        reloadButton.textContent = 'Reload';  // Zet de tekst op de knop
        reloadButton.style.position = 'fixed';
        reloadButton.style.top = '10px';
        reloadButton.style.right = '10px';
        reloadButton.style.zIndex = '9999';
        reloadButton.style.padding = '10px 20px';  // Voegt padding toe aan de knop
        reloadButton.style.fontSize = '14px';  // Verhoogt de leesbaarheid van de tekst
        reloadButton.style.backgroundColor = '#0072c6';  // Blauwe kleur van ProNet logo
        reloadButton.style.color = 'white';  // Groene tekstkleur
        reloadButton.style.border = 'none';
        reloadButton.style.borderRadius = '5px';  // Maak de hoeken afgerond
        reloadButton.style.cursor = 'pointer';
        reloadButton.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
        reloadButton.style.fontWeight = 'bold';  // Verhoogt de leesbaarheid van de tekst

        // Voeg functionaliteit toe aan de knop
        reloadButton.addEventListener('click', function() {
            // Log de huidige cookies voordat ze worden verwijderd (voor debuggen)
            console.log("Huidige cookies:", document.cookie);

            // Roep de cookie-wisfunctie aan
            clearPronetCookies();

            // Optioneel: herladen van de pagina na het wissen van cookies
            window.location.reload();
        });

        // Voeg de knop toe aan de pagina
        document.body.appendChild(reloadButton);
    }
})();
