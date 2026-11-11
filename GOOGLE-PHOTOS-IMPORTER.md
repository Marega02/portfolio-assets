# Places — importazione da Google Foto (admin)

Applicazione privata per **Places** nel sito Webflow. Permette di scegliere le foto tramite **Google Photos Picker API**, senza scaricarle a mano. Le immagini selezionate sono ridimensionate da Google a massimo 1600 × 1600, trasferite dal server a GitHub e visualizzate nel sito usando il file pubblico assets/photos/places-manifest.json.

## Stato attuale

- Codice frontend Google OAuth / Picker: preparato.
- API autenticata e trasferimento foto verso GitHub: preparati, da testare con credenziali vere.
- Gallerie Webflow: caricano già il manifesto pubblico, attualmente vuoto.
- **NON ancora attivo**: manca la connessione all'account Google, la creazione dell'app Webflow Cloud e le variabili di ambiente. Non inserire segreti in Webflow Custom Code o in un repo GitHub.

## 1. Google Cloud Console

Apri https://console.cloud.google.com/ e usa un progetto Google Cloud, anche nuovo.

1. Abilita **Google Photos Picker API**.
2. In **Google Auth Platform**, configura la schermata consenso OAuth (tipo External, Testing) e aggiungi come *test user* l'account Google Foto che userai.
3. Crea **OAuth Client ID → Web application**.
4. Aggiungi come origine JavaScript autorizzata **https://utopia-maybe.webflow.io**.
5. Copia soltanto il Client ID, tipicamente una stringa che termina in .apps.googleusercontent.com.
6. Lo scope richiesto dal codice è https://www.googleapis.com/auth/photospicker.mediaitems.readonly (più openid email per riconoscere l'amministratore). Google potrebbe richiedere verifica dell'app per uso pubblico; la modalità Testing può essere usata con utenti di test.

Documentazione: https://developers.google.com/photos/picker/guides/get-started-picker

## 2. GitHub: token di pubblicazione

Nelle impostazioni GitHub crea un **fine-grained personal access token** ristretto a **Marega02/portfolio-assets**, con permesso **Contents: Read and write**, nessun altro repository. Questo token permette al server di scrivere nuove immagini su main. Il branch dell'app non deve ricevere foto.

Non incollare il token nella chat e non metterlo nel codice frontend.

## 3. Webflow Cloud

Crea un'app Webflow Cloud **attaccata al sito Webflow** con:

- GitHub: https://github.com/Marega02/portfolio-assets
- Branch: places-google-photos-importer
- Nome: places-photo-importer
- Mount path: /places-import

Dopo il deploy apri **Webflow Cloud → Apps → places-photo-importer → Environment variables**. Imposta:

- GOOGLE_CLIENT_ID = Client ID Google, senza virgolette.
- ADMIN_EMAIL = email esatta dell'account Google autorizzato (segreta o riservata).
- GITHUB_TOKEN = token fine-grained GitHub, **Secret**.

Re-deploy dopo aver configurato le variabili. L'importatore sarà raggiungibile a:

**https://utopia-maybe.webflow.io/places-import**

Non è collegato visibilmente al menu pubblico del sito; è un indirizzo amministrativo. La sicurezza non dipende dal nascondere l'URL: ogni richiesta API verifica l'accesso Google e l'email esatta.

## 4. Come usare l'importatore

1. Accedi con Google nel pannello.
2. Apri Google Foto e seleziona da 1 a 12 immagini per volta.
3. Scegli Rodica, Krn, Kucelj, Kobilja Glava, Monte Talm, London, Malaysia, Singapore, Bali o Amsterdam.
4. Premi **Importa foto nel sito**.
5. Una volta pubblicato il commit da GitHub Pages, ricarica Places: le foto saranno visibili nella galleria scelta, anche ai visitatori senza account Google.

Per aggiungere nuove fotografie basta ripetere la selezione; il sistema riconosce gli ID delle foto già importate e non le duplica nella stessa galleria.

## Precauzioni e limiti

- Importa **solo fotografie**, non video; max 12 foto per sessione e ~8 MB per file importato dopo il ridimensionamento.
- Google Foto non offre una sincronizzazione automatica di tutti gli album personali: devi scegliere esplicitamente le foto ogni volta.
- Le foto importate diventano **pubbliche** su GitHub Pages / sito: seleziona soltanto contenuti che desideri rendere pubblici.
- La versione pubblica del sito non riceve access token OAuth e non può importare foto.
- I link baseUrl di Google Foto sono temporanei; vengono letti solo durante l'importazione.
- Il repository GitHub Pages pubblico non è ideale per un archivio fotografico enorme. Per molte centinaia di fotografie, valutare storage più adatto (Webflow Assets o object storage).
- Prima di una pubblicazione effettiva, prova un'unica fotografia. Le API di Google, GitHub e Webflow Cloud possono richiedere aggiustamenti alla configurazione e non sono state testate qui con l'account reale.
