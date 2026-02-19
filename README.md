# ✈️ VoyageurIA — Webapp Interactive IA Voyage

> **Projet Supervisé IA · M1/M2 Digital & IA · Session 2 — WEBAPP & IA AGENTS**

🌐 **Application disponible en ligne : [https://voyageur-ia.vercel.app/](https://voyageur-ia.vercel.app/)**

---

## 📖 Description

**VoyageurIA** est une webapp moderne et interactive dédiée au voyage, propulsée par l'intelligence artificielle. Elle permet aux utilisateurs de :

- Découvrir des **destinations mondiales** via une galerie immersive
- Interagir avec **Aria**, un agent conversationnel IA spécialisé voyage (vols, hôtels, locations, itinéraires)
- Personnaliser leur voyage grâce à un **quiz de recommandation**
- Accéder à des offres premium via un **système d'abonnement freemium**

---

## 🛠️ Stack Technique

| Technologie | Usage |
|---|---|
| **React 18** | Framework UI principal |
| **Vite** | Bundler & dev server |
| **CSS inline (design system custom)** | Styling, animations, responsive |
| **Claude Sonnet 4 — Anthropic API** | Agent conversationnel IA (chatbot Aria) |
| **Unsplash CDN** | Photos des destinations (libres de droits) |
| **Google Fonts** | Playfair Display + DM Sans |
| **Vercel** | Déploiement et hébergement |

---

## ✨ Features Implémentées

### 🏠 Page d'accueil
- Hero section plein écran avec image de fond et animation d'apparition progressive
- Présentation de l'agence avec chiffres clés (10k+ voyageurs, 150+ destinations…)
- Section "Comment ça marche" en 3 étapes illustrées
- Aperçu des destinations populaires avec CTA

### 🌍 Galerie Destinations
- 6 destinations mondiales : Bali, Kyoto, Patagonie, Marrakech, Islande, Cappadoce
- Cards interactives avec hover effects et zoom image
- Filtres par catégorie (Plage, Aventure, Culture, Nature)
- Prix indicatifs et tags par destination

### 🤖 Agent Conversationnel Aria
- Widget chatbot flottant (bas droite), toujours accessible
- Propulsé par **Claude Sonnet 4** via l'API Anthropic
- Spécialisée : vols, hôtels, locations, itinéraires, meilleure période, budget
- **Modèle freemium** : 5 messages gratuits / jour, illimité en abonnement

### 🎯 Quiz de Recommandation Personnalisée
- 4 questions sur les préférences voyage (type, budget, durée, groupe)
- Barre de progression animée
- Algorithme de recommandation de destination
- Résultat avec visuel, description et prix estimé

### 💳 Page Abonnements (Freemium)
- 3 plans tarifaires : **Découverte** (gratuit) · **Explorer** (9,90€/mois) · **Nomad** (24,90€/mois)
- Activation simulée avec déblocage des messages illimités
- Section garanties : paiement sécurisé, annulation libre, support 24/7

---

## 📁 Structure du Projet

```
voyageur-ia/
├── src/
│   ├── App.jsx          ← Composant principal (toute la webapp)
│   ├── main.jsx         ← Point d'entrée React + import CSS
│   └── index.css        ← Reset global & styles de base
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Installation & Lancement Local

### Prérequis
- **Node.js 22+** ([nodejs.org](https://nodejs.org) — télécharger la version LTS 22.x)
- npm 9+ (inclus avec Node.js)

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/VOTRE_USERNAME/voyageur-ia.git
cd voyageur-ia

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

> ⚠️ **Note** : L'API Anthropic est appelée côté client pour cette démonstration. En production, sécurisez la clé API via un backend serverless.

---

## ☁️ Déploiement (Vercel)

```bash
git init
git add .
git commit -m "feat: VoyageurIA webapp"
git remote add origin https://github.com/VOTRE_USERNAME/voyageur-ia.git
git push -u origin main
# → Connecter le repo sur vercel.com → Framework : Vite → Deploy ✅
```

---

## 💬 Prompts Documentés

Cette section documente les prompts exacts utilisés pour générer le projet avec l'IA.

### Prompt 1 — Génération initiale de la webapp

> *Utilisé sur : Claude Sonnet 4.6 (claude.ai)*

```
Je dois créer une webapp pour un cours IA M1/M2. C'est une app de voyage moderne
avec un assistant IA. L'app doit avoir :
- Une page d'accueil avec hero section animée
- Une galerie de destinations (Bali, Kyoto, Patagonie, Marrakech, Islande, Cappadoce)
- Un chatbot IA flottant nommé Aria, connecté à l'API Anthropic Claude
- Un quiz de recommandation de destination en 4 questions
- Une page d'abonnement freemium (Gratuit / 9,90€ / 24,90€)
Design : dark luxury, accents dorés, typographie Playfair Display + DM Sans.
L'app doit être en React avec des styles inline, sans librairie externe.
```

### Prompt 2 — Correction responsive (full-width)

> *Utilisé sur : Claude Sonnet 4.6 (claude.ai)*

```
L'app affiche un grand espace blanc à droite sur laptop.
Rends l'app entièrement responsive et full-width :
supprime tous les maxWidth et margin auto sur les conteneurs principaux,
remplace par width: 100% avec padding: 4% de chaque côté.
Ajoute aussi un index.css avec html, body, #root en width: 100% sans margin.
```

### Prompt 3 — Personnalité et system prompt du chatbot Aria

> *Intégré directement dans le code, paramètre `system` de l'API Anthropic*

```
Tu es Aria, une assistante IA spécialisée dans le voyage de qualité.
Tu aides les utilisateurs à trouver les meilleures destinations, vols,
hôtels, locations Airbnb, activités et offres voyage.

Ton style : chaleureux, expert, enthousiaste, concis.
Tu donnes des recommandations concrètes avec des fourchettes de prix réalistes.

Tu peux parler de : vols (compagnies low-cost vs premium), hôtels
(boutique, chaînes, note Booking/TripAdvisor), locations (Airbnb, Vrbo),
activités locales, itinéraires, meilleure période pour voyager,
visa, assurances, conseils pratiques.

Si on te demande une destination précise, donne toujours :
meilleure période, budget estimé, top 3 hôtels ou quartiers,
activité incontournable. Réponds en français avec des emojis discrets.
```

### Prompt 4 — Quiz de recommandation

> *Utilisé sur : Claude Sonnet 4.6 (claude.ai)*

```
Crée un quiz interactif de 4 questions pour recommander une destination voyage :
1. Type d'expérience (Plage, Aventure, Culture, Gastronomie)
2. Budget par personne (< 800€, 800-1500€, 1500-3000€, > 3000€)
3. Durée idéale (Week-end, 1 semaine, 2 semaines, +1 mois)
4. Type de groupe (Solo, Couple, Famille, Amis)
Affiche une barre de progression animée. À la fin, recommande une destination
avec sa photo, description et prix. Ajoute un bouton pour relancer le quiz.
```

---

## 🤖 Crédits & Transparence IA

| Élément | Outil utilisé | Modèle |
|---|---|---|
| **Architecture & code React** | claude.ai | Claude Sonnet 4.6 |
| **Design system & CSS** | claude.ai | Claude Sonnet 4.6 |
| **Corrections responsive** | claude.ai | Claude Sonnet 4.6 |
| **Agent chatbot Aria (runtime)** | API Anthropic | Claude Sonnet 4 |
| **Photos destinations** | Unsplash.com | — (libres de droits) |
| **Typographie** | Google Fonts | — (Playfair Display, DM Sans) |
| **Déploiement** | Vercel | — |

> **Transparence** : L'intégralité du code de cette webapp a été généré par IA (Claude Sonnet 4.6) via des prompts itératifs. Aucune ligne de code n'a été écrite manuellement. Les prompts ont été affinés en 4 itérations principales pour obtenir le résultat final.

---

## 🧠 Réflexion sur le Processus

### Ce qui a bien fonctionné

Le **vibe coding** avec Claude s'est révélé très efficace pour générer rapidement une interface complète et cohérente. En partant d'un prompt structuré décrivant les features souhaitées, la première version de la webapp était déjà fonctionnelle et visuellement aboutie. L'approche itérative — un prompt par problème rencontré — a permis d'affiner le résultat sans repartir de zéro.

L'intégration de **l'API Anthropic directement dans le composant React** a été particulièrement simple : le system prompt permet de donner une personnalité précise à l'agent Aria, et la gestion du contexte de conversation via le tableau `messages` suffit pour une expérience conversationnelle fluide.

### Difficultés rencontrées

La principale difficulté technique a été la **compatibilité de Node.js** : Vite 7 requiert Node.js 22+, alors que la version installée était 20.5.0. La solution a été de mettre à jour Node.js manuellement via nodejs.org.

Le **responsive design** a nécessité une itération supplémentaire : les `maxWidth` initiaux créaient un espace blanc sur les écrans de laptop. Un deuxième prompt ciblé a permis de corriger l'ensemble des conteneurs en une seule passe.

### Apprentissages clés

- Un prompt **précis et structuré** donne de meilleurs résultats qu'un prompt vague — décrire le design, la stack et les features en détail évite plusieurs allers-retours
- L'IA génère du code fonctionnel mais il faut **tester et itérer** : chaque bug ou limitation devient un nouveau prompt à formuler
- La **transparence sur l'usage de l'IA** est essentielle dans un contexte académique : documenter les prompts permet de comprendre et de reproduire le processus
- Le modèle **freemium** (limite de messages gratuits) est simple à implémenter avec un simple compteur d'état React, sans backend nécessaire pour une démo

### Perspectives d'amélioration

Avec plus de temps, les pistes d'amélioration seraient : sécuriser la clé API via des Vercel Serverless Functions, connecter de vraies APIs de comparaison de vols (Skyscanner, Amadeus), ajouter une authentification utilisateur pour persister les préférences, et implémenter un vrai système de paiement (Stripe) pour les abonnements.

---

## 📝 Licence

Projet pédagogique — M1/M2 Digital & IA · 2025  
Usage éducatif uniquement.