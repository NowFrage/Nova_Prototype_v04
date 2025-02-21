## 1. Introduction

Bienvenue dans le **Guide de Structure du Projet NOVA – v0.4**.  
Ce document définit :

- **L’arborescence globale** du projet NOVA.
- **Les dossiers** et **fichiers clés** attendus.
- **Les règles de fractionnement** du code (limite de ~400 lignes maximum par fichier).
- Les **règles** à suivre pour créer ou modifier un fichier, afin d’éviter les écueils observés dans les versions antérieures (v0.1 à v0.3).

**À qui s’adresse ce guide ?**

- À l’IA intégrée dans l’IDE (qui doit venir y consulter l’emplacement exact où créer ou modifier des fichiers).
- Aux développeurs souhaitant comprendre ou contribuer à la structure du projet.

---

## 2. Arborescence Générale

Le projet est regroupé dans un dossier racine nommé **`NOVA/`**.  
Voici la **structure de base** :

```
NOVA/
 ├─ .gitignore
 ├─ .env                      (Optionnel, variables d'environnement)
 │
 ├─ package.json             (Dépendances et scripts à la racine)
 ├─ tasks.json               (Suivi des tâches)
 ├─ progress.log             (Journal d'avancement)
 │
 ├─ docs/                    (Documentation globale)
 │   ├─ PROTOCOLS.md         (Protocoles IA – createFile, editFile, etc.)
 │   ├─ ARCHITECTURE.md      (Diagrammes et structure technique)
 │   ├─ PROJECT_STRUCTURE_REFERENCE.md  (Ce fichier-ci)
 │   ├─ README_DEV.md        (Guide développeur)
 │   └─ ... autres documents
 │
 ├─ config/                  (Fichiers de configuration globale)
 │   ├─ default.json
 │   ├─ electron.config.js   (si Electron)
 │   └─ ...
 │
 ├─ scripts/                 (Scripts d'automatisation ou utilitaires)
 │   ├─ list-structure.sh
 │   ├─ run-tests.js
 │   ├─ validate-structure.js
 │   └─ ...
 │
 ├─ tests/                   (Tests d’intégration ou E2E généraux)
 │   ├─ integration/
 │   └─ ...
 │
 ├─ GlobalMemory/            (Mémoire contextuelle, logs IA, résumés automatiques)
 ├─ Projects/                (Un dossier par projet géré par NOVA)
 │
 ├─ backend/                 (Code du serveur Node.js / Express / WebSocket)
 │   ├─ package.json         (Optionnel si on sépare les dépendances back)
 │   ├─ server.js
 │   ├─ src/
 │   │   ├─ api/             (Routes Express : /api/diagram, /api/chat, etc.)
 │   │   ├─ services/        (Logique métier : IA, BD, etc.)
 │   │   ├─ models/          (Schémas/ORM si BD)
 │   │   └─ ...
 │   └─ tests/               (Tests unitaires du backend)
 │       ├─ api.test.js
 │       ├─ services.test.js
 │       └─ ...
 │
 └─ frontend/                (Code client : Electron / React / Vue, etc.)
     ├─ package.json         (Optionnel si dépendances front séparées)
     ├─ public/              (Fichiers statiques)
     ├─ src/
     │   ├─ main.js          (Point d’entrée Electron ou React/Vue)
     │   ├─ components/
     │   ├─ layouts/
     │   ├─ views/
     │   ├─ services/        (Appels API, logique front)
     │   ├─ styles/          (Feuilles de style)
     │   ├─ store/           (État global React/Vuex, si besoin)
     │   └─ ...
     └─ tests/               (Tests front-end : unitaire, snapshot, etc.)
         ├─ components/
         └─ ...
```

---

## 3. Règles de Fractionnement et de Taille des Fichiers

Pour **éviter** de reproduire les erreurs des prototypes passés (fichiers de 400-500 lignes devenus ingérables), le projet impose une **limite indicative** de **~400 lignes** par fichier code.

### 3.1. Stratégie de découpage

1. **Séparer** la logique en modules :

   - Dans le backend, utilisez `src/services/` pour la logique, `src/api/` pour les routes, etc.
   - Créez plusieurs fichiers plus petits plutôt qu’un gros fichier unique.

2. **Un composant, un fichier** dans le frontend :

   - Dans `frontend/src/components/`, évitez les composants monstres de 500 lignes. Factorisez la logique dans des hooks/composables/services au besoin.

3. **Créer un dossier ou un sous-module** si vous constatez qu’un seul fichier grossit trop.

   - Par exemple, `services/ai/` peut se scinder en `services/ai/factory.js`, `services/ai/openai.js`, `services/ai/ollama.js`, etc.

4. **Utiliser des tests unitaires** pour chaque module.
   - Dans `backend/tests/` ou `frontend/tests/`, un test correspond généralement à un fichier (ex. `api.test.js`, `services-ia.test.js`…).

### 3.2. Bonne pratique pour la taille

- **If > 400 lignes** : scinder la logique dans un nouveau fichier, ou un module annexe.
- **Structure** : viser 1 classe / 1 service / 1 composant par fichier.
- **Comment** : si l’IA doit ajouter une fonctionnalité majeure, elle peut créer un nouveau fichier (et se référer à `PROTOCOLS.md` → `/createFile`).

---

## 4. Règles d’Ajout ou de Modification de Fichiers

L’IA doit **consulter** ce document à chaque fois qu’elle se voit confier une tâche de création/modification. Elle doit :

1. **Vérifier** l’emplacement cible (backend, frontend, config, docs…).
2. **S’assurer** que le fichier n’existe pas déjà (ou qu’on ne duplique pas un code similaire).
3. **Respecter** les protocoles d’action (voir `docs/PROTOCOLS.md`), notamment :

   - `/createFile`
   - `/editFile`
   - …

4. **Maintenir** une taille raisonnable (inférieure à 400 lignes).
5. **Mettre à jour** le(s) test(s) associé(s) si nécessaire (backend/tests, frontend/tests, etc.).
6. **Documenter** dans `progress.log` ou `tasks.json` lorsqu’une nouvelle tâche est terminée.
