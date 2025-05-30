# WellPantry - Assistant Culinaire Intelligent

WellPantry est une application web moderne qui vous aide à gérer votre garde-manger, planifier vos repas et découvrir de nouvelles recettes. Elle intègre des fonctionnalités avancées comme la reconnaissance d'aliments, la gestion de potager d'intérieur, une carte communautaire et l'organisation de dîners partagés.

## 🚀 Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Google Maps API
- TensorFlow.js
- OpenCV.js
- et plus encore...

## 🌟 Fonctionnalités

### Garde-manger intelligent
- **Scan de codes-barres** - Ajoutez rapidement des produits en scannant leur code-barres
- **Reconnaissance d'images** - Identifiez les aliments par photo
- **Alertes d'expiration** - Recevez des notifications pour les produits qui vont bientôt expirer
- **Statistiques de consommation** - Visualisez vos habitudes alimentaires

### Planification des repas
- **Calendrier des repas** - Planifiez vos repas pour la semaine
- **Génération de menus** - Obtenez des suggestions basées sur vos préférences
- **Liste de courses automatique** - Générez une liste à partir de vos menus planifiés

### Recettes
- **Bibliothèque de recettes** - Explorez une vaste collection de recettes
- **Recherche avancée** - Filtrez par ingrédients, temps de préparation, régime alimentaire
- **Génération par IA** - Créez des recettes personnalisées avec l'IA
- **Évaluation et commentaires** - Partagez votre expérience avec la communauté

### Potager d'intérieur
- **Suivi des plantes** - Gérez vos plantes aromatiques et potagères
- **Rappels d'arrosage** - Ne manquez jamais un arrosage
- **Conseils de jardinage** - Recevez des conseils adaptés à chaque plante

### Carte communautaire
- **Points d'intérêt** - Découvrez les ressources alimentaires locales
- **Contribution** - Ajoutez vos propres découvertes
- **Évaluations** - Partagez votre expérience des lieux visités

### Gastronomie moléculaire
- **Analyse des associations** - Découvrez les meilleures combinaisons d'ingrédients
- **Techniques culinaires** - Apprenez des techniques avancées
- **Profils aromatiques** - Comprenez la chimie derrière les saveurs

### Dîners & Événements sociaux
- **Planification d'événements** - Organisez des repas partagés
- **Gestion des invitations** - Invitez des amis et suivez leurs réponses
- **Coordination des contributions** - Organisez qui apporte quoi
- **Évaluations post-événement** - Partagez vos impressions après l'événement

## 📋 Prérequis

- Node.js 18+
- npm 8+
- Un compte Supabase
- Une clé API Google Maps
- Un compte OpenAI (optionnel, pour les fonctionnalités d'IA)

## 🔑 Configuration des clés API

### Supabase

1. Créez un compte sur [Supabase](https://supabase.com)
2. Créez un nouveau projet
3. Dans les paramètres du projet, récupérez :
   - L'URL du projet
   - La clé anon/public
4. Copiez ces valeurs dans le fichier `.env` :
   ```
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_clé_anon
   ```

### Google Maps

1. Créez un compte sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet
3. Activez l'API Maps JavaScript
4. Créez une clé API avec les restrictions appropriées
5. Ajoutez la clé dans le fichier `.env` :
   ```
   VITE_GOOGLE_MAPS_API_KEY=votre_clé_google_maps
   ```

## 📦 Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-username/wellpantry.git
   cd wellpantry
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet avec vos clés API (voir section Configuration)

4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## 🗄️ Base de données

Le projet utilise Supabase comme base de données. Les migrations SQL sont disponibles dans le dossier `supabase/migrations/`. Pour initialiser la base de données :

1. Installez l'interface en ligne de commande Supabase
2. Connectez-vous à votre projet
3. Exécutez les migrations :
   ```bash
   supabase db reset
   ```

## 🧪 Tests

Pour exécuter les tests :

```bash
# Tests unitaires
npm run test

# Tests end-to-end
npm run test:e2e

# Couverture des tests
npm run test:coverage
```

## 🚀 Déploiement

L'application peut être déployée sur n'importe quelle plateforme supportant Node.js. Voici les étapes pour un déploiement sur Netlify :

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Connectez votre dépôt GitHub
3. Configurez les variables d'environnement
4. Déployez l'application

## 🧩 Architecture

L'application suit une architecture modulaire avec séparation des préoccupations :

- **Components** : Composants UI réutilisables
- **Pages** : Composants de page qui utilisent les composants UI
- **Hooks** : Logique réutilisable et gestion d'état
- **Lib** : Services et utilitaires
- **Context** : État global de l'application

## 🛠️ Bonnes pratiques

Le projet suit les bonnes pratiques suivantes :

- **Accessibilité** : Composants accessibles et support des lecteurs d'écran
- **Performance** : Optimisation des rendus et des requêtes
- **Sécurité** : Validation des entrées et Row Level Security avec Supabase
- **Maintenabilité** : Code modulaire et bien documenté
- **Tests** : Tests unitaires et d'intégration

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.