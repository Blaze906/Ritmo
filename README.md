# Ritmo

Ritmo e una app Android offline-first per pianificazione personale. Unisce calendario, to-do list, promemoria intelligenti, pianificazione del tempo, riepilogo giornaliero, statistiche e focus mode in una singola esperienza pensata per l'uso quotidiano.

## Cosa include

- Creazione rapida di eventi e attivita con titolo, descrizione, data, ora, luogo, note, allegati nominali, categoria, priorita e ricorrenza.
- Vista giorno, settimana, mese e agenda cronologica.
- Attivita con stato, priorita, scadenza, checklist e sotto-attivita.
- Promemoria multipli e suggerimenti automatici basati su scadenza, priorita e orario.
- Pianificazione automatica che propone slot liberi per task non schedulati.
- Ricerca istantanea, filtri rapidi e categorie personalizzabili.
- Dark mode, onboarding, riepilogo giornaliero, statistiche produttivita e focus mode.
- Dati salvati solo sul dispositivo con `localStorage` e funzionamento offline tramite service worker.
- Packaging Android reale con Capacitor, generabile come APK da GitHub Actions.

## Avvio locale web

Apri `index.html` nel browser, oppure servi la cartella con un server statico. Per provare installazione e service worker e consigliato un server locale:

```powershell
npx http-server .
```

## APK Android da GitHub

1. Apri la tab `Actions` del repository.
2. Esegui il workflow `Build Android APK` su `main`.
3. Quando il workflow finisce, scarica l'artefatto `ritmo-debug-apk`.
4. Estrai lo zip e installa `app-debug.apk` sul telefono Android.
5. Se Android blocca l'installazione, abilita l'installazione da sorgenti sconosciute per il browser o file manager usato.

Il workflow genera un APK debug, perfetto per test e distribuzione manuale da GitHub. Per Play Store serve invece una build release firmata con keystore privato.

## Sviluppo Android locale

```powershell
npm install
npm run android:add
npm run android:sync
```

Per compilare localmente servono Android Studio, Android SDK e Java. Se non sono installati, usa il workflow GitHub Actions.

## GitHub Pages

Il workflow `Publish Ritmo` resta disponibile per provare rapidamente la versione web. L'app Android, pero, viene generata dal workflow `Build Android APK`.
