# Carnet du Kaï – Loup Solitaire (livre 1)

Application web installable (PWA) pour suivre une partie du livre-jeu :
caractéristiques, disciplines Kaï, sac, combats avec la table des coups portés,
parcours par paragraphes, profils multiples.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application (code, styles, règles du jeu) |
| `manifest.json` | Nom, couleurs et icônes pour l'installation |
| `sw.js` | Service worker : fonctionnement hors connexion |
| `icons/` | Icônes de l'application |
| `fonts/` | Polices embarquées (aucune connexion externe nécessaire) |

Gardez ces fichiers ensemble, dans la même structure.

## Mise en ligne avec GitHub Pages

1. Copiez tout le contenu de ce dossier à la racine de votre dépôt.
2. Sur GitHub : **Settings, Pages**, puis choisissez la branche (`main`) et le dossier `/ (root)`.
3. Attendez une minute : l'adresse s'affiche, de la forme `https://votre-nom.github.io/votre-depot/`.
4. Ouvrez l'adresse sur votre téléphone, puis installez l'application :
   - **Android (Chrome)** : bouton « Installer sur cet appareil » dans l'onglet Profils, ou menu du navigateur.
   - **iPhone (Safari)** : bouton Partager, puis « Sur l'écran d'accueil ».
5. Ouvrez l'application une première fois avec du réseau : elle se met alors en cache et fonctionne ensuite sans connexion.

Le service worker exige une adresse en **HTTPS** (c'est le cas de GitHub Pages, Netlify, etc.).
Pour tester sur votre ordinateur : `python3 -m http.server 8000` dans ce dossier, puis `http://localhost:8000`.

## Mettre à jour l'application

1. Remplacez `index.html` par la nouvelle version.
2. **Changez le numéro de version** en haut de `sw.js` (`const VERSION = 'v4-1'` devient `'v4-2'`).
3. Poussez sur GitHub. Les appareils récupèrent la nouvelle version à l'ouverture suivante (parfois à la deuxième).

## Vos données

- Les parties sont enregistrées **sur l'appareil**, dans le navigateur, à chaque modification.
- L'adresse compte : une autre adresse (ou un autre navigateur) repart de zéro.
- Pour passer d'un appareil à l'autre, ou garder une copie de secours : onglet **Profils**,
  « Copier la sauvegarde de ce profil », puis « Importer une sauvegarde » sur l'autre appareil.
- Désinstaller l'application ou vider les données du site efface les parties : pensez à exporter avant.
