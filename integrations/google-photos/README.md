# Places — Google Photos Import (setup checkpoint)

## Goal
Import selected personal photographs into the existing Webflow *Places* galleries without local downloads. Keep the public site and gallery navigation unchanged until the importer is fully working.

## Destinations in the existing archive
- Mountains: Rodica, Krn, Kucelj, Kobilja Glava, Monte Talm (nested galleries)
- London
- Malaysia
- Singapore
- Bali
- Amsterdam

## Required account setup (owner action)
1. Visit https://console.cloud.google.com/ and create/select a Google Cloud project.
2. Enable **Google Photos Picker API** (not Google Drive Picker API).
3. Configure the Google Auth consent screen. During testing, add your own Google account as a test user if required.
4. Create an OAuth 2.0 Client ID for a **Web application**.
5. Add the site's actual origin, `https://utopia-maybe.webflow.io`, as an authorized JavaScript origin.
6. Share only the **OAuth client ID** for implementation. Never share a client secret, password, refresh token, or access token in chat.

## Import architecture
1. Private, owner-only admin interface; not a publicly enabled control on the Places carousel.
2. Google Identity Services OAuth token flow requesting only `https://www.googleapis.com/auth/photospicker.mediaitems.readonly`.
3. Google Photos Picker API: create session; open returned `pickerUri` in a separate tab/window; poll at Google-recommended interval; list selected media items (handle pagination).
4. Receive chosen photo bytes through authenticated server-side code while the Google media URLs are valid. The media URLs expire after approximately one hour.
5. Optimize photos, create thumbnail/medium/full variants, and upload stable assets to Webflow or a configured owner-controlled storage service. Credentials for destination storage must stay server-side.
6. Associate stable asset URLs with gallery keys (mountains/rodica, mountains/krn, mountains/kucelj, mountains/kobilja-glava, mountains/monte-talm, london, malaysia, singapore, bali, amsterdam).
7. Publish updated gallery content only after upload success, with a review step and duplicate detection.
8. Delete the Google Photos picking session after retrieval.

## Important security requirements
- This is an owner-only import workflow. Do **not** embed Webflow site tokens or any server-side secret in public JavaScript.
- OAuth consent is initiated explicitly by the owner. Do not request unrestricted library access.
- Avoid storing OAuth access tokens in localStorage, public CMS fields, GitHub, URL parameters, or site HTML.
- Use a protected backend for importing and storing media files; Webflow Cloud is an option, but it needs deployment and environment setup.
- No automatic sync of future Google Photos albums is implied. The owner selects photos for each import.

## Status (2026-11-11)
- Google API and backend approach verified against official docs.
- Waiting on Google OAuth application configuration and deployment authorization.
- Importer is **NOT installed/active** in the published site, and no personal photos have been retrieved.

## Official reference
- https://developers.google.com/photos/picker/guides/get-started-picker
- https://developers.google.com/photos/picker/guides/sessions
- https://developers.google.com/photos/picker/guides/media-items
- https://developers.google.com/photos/overview/configure-your-app
- https://developers.webflow.com/webflow-cloud/environments/
