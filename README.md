# 👶 Prénom Magique — Déploiement sur Vercel

## 🚀 Déploiement en 5 minutes

### 1. Installe les dépendances
```bash
npm install
```

### 2. Configure ta clé API Anthropic
Crée un fichier `.env.local` à la racine :
```
ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXXXX
```
> ⚠️ Ne jamais commiter ce fichier ! Il est déjà dans .gitignore.

### 3. Teste en local
```bash
npm start
```

### 4. Déploie sur Vercel

#### Option A — Via CLI (recommandé)
```bash
npm install -g vercel
vercel
```
Puis dans le dashboard Vercel → ton projet → Settings → Environment Variables :
```
ANTHROPIC_API_KEY = sk-ant-XXXXXXXXXXXXXXXXXX
```

#### Option B — Via GitHub
1. Push le projet sur GitHub
2. Va sur [vercel.com](https://vercel.com) → "New Project"
3. Importe ton repo GitHub
4. Ajoute la variable d'environnement `ANTHROPIC_API_KEY`
5. Clique "Deploy" 🎉

## 📁 Structure du projet
```
prenom-magique/
├── api/
│   └── generate.js       ← Serverless function (clé API sécurisée)
├── public/
│   └── index.html
├── src/
│   ├── App.js            ← Application principale
│   └── index.js
├── .env.local            ← Variables locales (ne pas commiter)
├── .gitignore
├── package.json
└── vercel.json
```

## 🔒 Sécurité
La clé API Anthropic n'est **jamais exposée** côté client.
Toutes les requêtes passent par `/api/generate.js` (serverless function Vercel).

## 💡 Obtenir une clé API Anthropic
Rends-toi sur [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key
