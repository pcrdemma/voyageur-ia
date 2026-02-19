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
| **Vercel / Netlify** | Déploiement et hébergement |

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
- CTA vers l'agent Aria pour toute destination personnalisée

### 🤖 Agent Conversationnel Aria
- Widget chatbot flottant (bas droite), toujours accessible
- Propulsé par **Claude Sonnet 4** via l'API Anthropic
- Personnalité définie : experte voyage, chaleureuse, conseils concrets
- Spécialisée : vols, hôtels, locations, itinéraires, meilleure période, budget
- **Modèle freemium** : 5 messages gratuits / jour, illimité en abonnement

### 🎯 Quiz de Recommandation Personnalisée
- 4 questions sur les préférences voyage (type, budget, durée, groupe)
- Barre de progression animée
- Algorithme de recommandation de destination
- Résultat avec visuel, description et prix estimé
- Lien direct vers Aria pour planifier le voyage recommandé

### 💳 Page Abonnements (Freemium)
- 3 plans tarifaires : **Découverte** (gratuit) · **Explorer** (9,90€/mois) · **Nomad** (24,90€/mois)
- Mise en avant du plan le plus populaire
- Activation simulée avec déblocage des messages illimités
- Section garanties : paiement sécurisé, annulation libre, support 24/7, IA temps réel

---

## 🤖 IA Utilisées

| Usage | Outil / Modèle |
|---|---|
| **Génération du code** | Claude Sonnet 4.6 via claude.ai (vibe coding) |
| **Agent chatbot Aria** | Claude Sonnet 4 — API Anthropic |
| **Visuels destinations** | Unsplash (photos libres de droits) |
| **Design & architecture** | Généré et itéré avec Claude |

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
# 1. Créer le projet Vite + React
npm create vite@latest voyageur-ia -- --template react
cd voyageur-ia

# 2. Installer les dépendances
npm install

# 3. Remplacer les fichiers sources
# → src/App.jsx     par travelai-app.jsx
# → src/main.jsx    par main.jsx fourni
# → src/index.css   par index.css fourni

# 4. Lancer en développement
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

> ⚠️ **Note** : L'API Anthropic est appelée côté client pour cette démonstration. En production, sécurisez la clé API via un backend (Node/Express, Vercel Serverless Functions, etc.)

---

## ☁️ Déploiement

### Option A — Bolt.new + Vercel ⚡ *(le plus rapide — 3 minutes, sans Node.js)*

1. Allez sur [bolt.new](https://bolt.new)
2. Dans le prompt, écrivez :
   ```
   Crée une app React + Vite. Voici le fichier App.jsx complet : [coller travelai-app.jsx]
   ```
3. Cliquez **Deploy** → déploiement Vercel automatique
4. Récupérez l'URL publique ✅

### Option B — GitHub + Vercel *(recommandé pour le rendu Moodle)*

```bash
# 1. Initialiser Git
git init
git add .
git commit -m "feat: VoyageurIA webapp"

# 2. Créer un repo sur github.com → New Repository → Public
git remote add origin https://github.com/VOTRE_USERNAME/voyageur-ia.git
git branch -M main
git push -u origin main

# 3. Sur vercel.com
# → Add New Project → importer le repo GitHub
# → Framework preset : Vite
# → Deploy ✅
```

### Option C — Netlify Drag & Drop *(sans Git)*

```bash
# Builder le projet
npm run build
# Glisser le dossier /dist sur netlify.com → Deploy manually ✅
```

---

## 📝 Licence

Projet pédagogique — M1/M2 Digital & IA · 2025  
Usage éducatif uniquement.

---

## 👥 Crédits

- **Framework** : React + Vite
- **IA Chatbot** : Anthropic — Claude Sonnet 4
- **Code généré avec** : Claude Sonnet 4.6 (claude.ai)
- **Photos** : Unsplash (libres de droits)
- **Typographie** : Google Fonts — Playfair Display & DM Sans
