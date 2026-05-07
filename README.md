# Ritmo

Ritmo e una mobile app offline-first per Android installabile come PWA da GitHub Pages. Unisce calendario, to-do list, promemoria intelligenti, pianificazione del tempo, riepilogo giornaliero, statistiche e focus mode in una singola esperienza pensata per l'uso quotidiano.

## Cosa include

- Creazione rapida di eventi e attivita con titolo, descrizione, data, ora, luogo, note, allegati nominali, categoria, priorita e ricorrenza.
- Vista giorno, settimana, mese e agenda cronologica.
- Attivita con stato, priorita, scadenza, checklist e sotto-attivita.
- Promemoria multipli e suggerimenti automatici basati su scadenza, priorita e orario.
- Pianificazione automatica che propone slot liberi per task non schedulati.
- Ricerca istantanea, filtri rapidi e categorie personalizzabili.
- Dark mode, onboarding, riepilogo giornaliero, statistiche produttivita e focus mode.
- Dati salvati solo sul dispositivo con `localStorage` e funzionamento offline tramite service worker.

## Avvio locale

Apri `index.html` nel browser, oppure servi la cartella con un server statico. Per provare installazione e service worker e consigliato un server locale:

```powershell
npx http-server .
```

## Pubblicazione su GitHub

1. Carica il repository su GitHub.
2. Vai in `Settings > Pages`.
3. Imposta la source su `GitHub Actions`.
4. Esegui il workflow `Publish Ritmo`.
5. Apri la pagina pubblicata da Chrome su Android e scegli `Installa app`.

## Roadmap Android nativa

La base attuale e una PWA completa e scaricabile/installabile da GitHub Pages. Per pubblicare un APK firmato si puo aggiungere Capacitor o Trusted Web Activity in un secondo step, mantenendo la stessa UI e lo stesso storage locale.
