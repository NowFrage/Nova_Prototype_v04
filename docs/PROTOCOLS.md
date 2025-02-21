# PROTOCOLES D’ACTION – Projet NOVA

---

## Références Principales

- **`NOVA_OVERVIEW.md`** : Aperçu général (objectifs, architecture, diagramme global).
- **`PROJECT_STRUCTURE_REFERENCE.md`** : Arborescence, règles de fractionnement (<400 lignes par fichier), emplacement des fichiers.
- **`tasks.json` & `progress.log`** : Suivi des tâches, statut `"pending"`, `"in-progress"`, `"completed"`.
- **`TASK_GUIDE.md`** : Règles pour exécuter les tâches (lecture, validation, etc.).

---

## 1) Protocole : `createFile`

**Objectif**  
Créer un nouveau fichier (max ~400 lignes) dans le projet.

**Étapes**

1. **Analyser la demande**
   - Lire la requête utilisateur. Vérifier si un répertoire précis est mentionné.
2. **Consulter**
   - Ouvrir `PROJECT_STRUCTURE_REFERENCE.md` pour identifier **où** créer le fichier.
   - Vérifier l’existant via `/listStructure` ou manuellement (pour être sûr de ne pas dupliquer).
3. **Créer un squelette**
   - Générer un code minimal répondant à la demande (langage, structure).
4. **Sortie**
   - Fournir le snippet de ce nouveau fichier (ne pas écrire directement sur disque).
5. **Mise à jour**
   - Si ce nouveau fichier modifie la logique ou l’arborescence, **éditer** `docs/PROJECT_STRUCTURE_REFERENCE.md` si nécessaire (ex. pour mentionner un nouveau dossier).
   - Vérifier si une tâche dans `tasks.json` est liée à cette création de fichier (si oui, mettre à jour `progress.log`).

**Exemple**

```
/createFile
Chemin : src/backend/utils/logger.js
Contenu : Logger console + timestamp
```

---

## 2) Protocole : `editFile`

**Objectif**  
Modifier un fichier existant (ajout, correction, refactoring…).

**Étapes**

1. **Analyser la requête**
   - Identifier la portion de code à modifier (ou le diff fourni).
2. **Consulter**
   - Vérifier si le fichier est mentionné dans `PROJECT_STRUCTURE_REFERENCE.md`.
   - Voir s’il y a des consignes spécifiques dans `TASK_GUIDE.md` ou `NOVA_OVERVIEW.md` (p. ex. si c’est un fichier critique).
3. **Modifier**
   - Proposer uniquement le fragment modifié, pas la totalité du fichier.
   - Respecter la limite (~400 lignes). Si le fichier devient trop gros, proposer une **scission** en deux fichiers.
4. **Mise à jour**
   - Si vous renommez un fichier ou changez sa localisation, **mettre à jour** `PROJECT_STRUCTURE_REFERENCE.md`.
   - Mettre à jour éventuellement `progress.log` si cette modification s’inscrit dans une tâche en cours.

**Exemple**

```
/editFile
Fichier : src/backend/utils/logger.js
Ajoute un paramètre verbose
```

---

## 3) Protocole : `runTests`

**Objectif**  
Exécuter la suite de tests du projet (unitaires, intégration…).

**Étapes**

1. **Analyser**
   - Consulter `tasks.json` pour voir si une tâche en cours exige des tests spécifiques (ex. “T003”).
2. **Lancer les tests**
   - Fournir la commande (ex. `npm test`, `scripts/run-tests.js`).
3. **Afficher résultats**
   - Listes des tests passés / échoués, éventuels logs d’erreurs.
4. **Proposer correctifs**
   - Suggérer `/editFile` si besoin de corriger le code.
   - Mettre à jour `progress.log` si c’est un jalon important (ex. la fin d’une tâche).

**Exemple**

```
/runTests
```

---

## 4) Protocole : `launchProject`

**Objectif**  
Démarrer l’application (dev ou prod).

**Étapes**

1. **Analyser**
   - Vérifier la config (front + back).
   - S’il y a un script (`"dev": "concurrently..."`) dans `package.json`, l’indiquer.
2. **Lancer**
   - Fournir la commande (`npm run dev`, `npm start`, etc.).
3. **Logs**
   - Résumer ou afficher les logs (URL du serveur, port, etc.).
4. **Mise à jour**
   - Si la commande de lancement a changé (ex. on a renommé un script), **update** `docs/PROJECT_STRUCTURE_REFERENCE.md` ou `README_DEV.md` s’il y a une incohérence.

**Exemple**

```
/launchProject
Mode : dev
```

---

## 5) Protocole : `debug`

**Objectif**  
Diagnostiquer un problème (erreur de compilation, crash…).

**Étapes**

1. **Collecter infos**
   - Lire le message d’erreur, voir la config (`PROJECT_STRUCTURE_REFERENCE.md`) pour repérer d’éventuels conflits.
2. **Hypothèses**
   - Lister les causes possibles (version Node obsolète, package manquant, etc.).
3. **Solution**
   - Proposer `/editFile` ou `/integrate` si besoin d’ajouter une dépendance.
   - Si c’est un script/lancement, renvoyer vers `/launchProject` ou `/verify`.
4. **Finaliser**
   - Mettre à jour `progress.log` si la correction résout une tâche en cours.

**Exemple**

```
/debug
Erreur "Cannot find module 'express' " au démarrage
```

---

## 6) Protocole : `listStructure`

**Objectif**  
Lister l’arborescence du projet (ignorer `node_modules`, `dist`, etc.).

**Étapes**

1. **Déterminer** la commande (ex. `scripts/list-structure.sh`).
2. **Afficher**
   - Fournir la sortie sous forme de hiérarchie.
3. **Commenter**
   - Signaler si un dossier manque ou si un fichier est anormalement placé.
   - Inviter à consulter / mettre à jour `PROJECT_STRUCTURE_REFERENCE.md` si la structure a évolué.

**Exemple**

```
/listStructure
```

---

## 7) Protocole : `integrate`

**Objectif**  
Ajouter un module/librairie ou configurer un outil (Webpack, Electron…).

**Étapes**

1. **Analyser la demande**
   - Ex. “Installer axios pour les requêtes HTTP côté frontend.”
2. **Vérifier**
   - Compatibilité Node, versions, etc.
   - Regarder `tasks.json` si une tâche s’y rapporte (ex. T004).
3. **Commande**
   - Proposer `npm install axios --save`, etc.
   - Si besoin de config Webpack/Electron, proposer `/editFile` sur la config concernée.
4. **Mise à jour**
   - Ajuster `PROJECT_STRUCTURE_REFERENCE.md` si on crée un nouveau dossier (ex. `config/webpack/`).
   - Mettre à jour `progress.log` si c’est la fin d’une intégration.

**Exemple**

```
/integrate
Librairie : axios
But : Gérer les requêtes HTTP côté frontend
```

---

## 8) Protocole : `verify`

**Objectif**  
Vérifier la **compilation**, exécuter un **lint**, analyser la **couverture** (coverage).

**Étapes**

1. **Repérer** la commande (`npm run build`, `npm run lint`…).
2. **Rapport**
   - Afficher les erreurs ou avertissements.
   - Eventuellement proposer `/editFile` ou `/debug` pour résoudre.
3. **Mise à jour**
   - S’il faut mentionner de nouveaux scripts, corriger `PROJECT_STRUCTURE_REFERENCE.md` ou `README_DEV.md`.

**Exemple**

```
/verify
But : build + lint pour détecter d’éventuelles erreurs
```

---

## 9) Protocole : `commit`

**Objectif**  
Générer un message de commit Git pertinent.

**Étapes**

1. **Récap** des changements
   - Ex. “Création d’un logger, mise à jour doc…”
2. **Formater**
   - Ex. `[feat] Added logger + doc update`.
3. **Optionnel**
   - Fournir la commande : `git commit -m "[feat]..."`.
   - Si c’est un commit important (fin de tâche), mettre à jour `progress.log` et marquer la tâche comme `"completed"` dans `tasks.json`.

**Exemple**

```
/commit
Changements : Ajout du logger + mise à jour du README
```
