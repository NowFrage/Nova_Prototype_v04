# Guide des Tâches – `TASK_GUIDE.md`

## 1. Objectif

Ce document décrit le **processus** que l’IA (et, si besoin, le développeur) doit suivre pour exécuter les tâches figurant dans **`tasks.json`**.  
Il précise :

- **Les étapes** pour passer une tâche du statut `"pending"` à `"completed"`.
- **Les documents** à consulter avant et pendant la réalisation de la tâche.
- **La validation** via tests et mise à jour des journaux (`progress.log`).

---

## 2. Processus de Traitement des Tâches

### 1) Lecture du Task Tracker

- Ouvrez le fichier **`tasks.json`**.
- Identifiez la **première** tâche avec le statut `"pending"`.

### 2) Préparation et Validation de la Tâche

- Lisez **`TASK_GUIDE.md`** (ce document) et **`PROJECT_STRUCTURE_REFERENCE.md`** pour confirmer les **règles** (limite ~400 lignes, emplacement de fichiers, etc.).
- Au besoin, référez-vous à **`PROTOCOLS.md`** si la tâche implique une action comme `/createFile`, `/editFile`, etc.
- Vérifiez dans **`tasks.json`** la liste `filesAffected` et le champ `tests` pour connaître les **fichiers** et **tests** liés.

### 3) Exécution de la Tâche

- **Passer** la tâche en `"in-progress"` dans `tasks.json`.
- **Analyser** la demande (ex. création de dossier, ajout de code, refacto…).
- **Si** la tâche impose de créer ou modifier un fichier, consultez **`PROJECT_STRUCTURE_REFERENCE.md`** pour vérifier l’emplacement correct et la règle des 400 lignes.
- **Réaliser** l’action (par ex. via `/createFile`, `/editFile`, `/integrate`, etc. – voir `PROTOCOLS.md`).
- **Documenter** votre code avec des commentaires clairs si nécessaire.

### 4) Validation et Tests Automatiques

- Exécutez la commande de test associée (ex. `"npm test"` ou `"scripts/run-tests.js"`), indiquée dans `tasks.json` ou dans la consigne.
- Si des tests échouent, utilisez `/debug` ou `/editFile` (selon `PROTOCOLS.md`) pour corriger le code, puis retestez.
- Ne **finalisez** la tâche que lorsque **tous les tests** passent ou que la situation est maîtrisée.

### 5) Mise à Jour des Journaux

- Quand la tâche est **validée**, marquez-la `"completed"` dans `tasks.json`.
- Dans **`progress.log`**, ajoutez une entrée mentionnant :
  - La **date/heure**.
  - L’**ID** de la tâche (ex. T001).
  - Un résumé du résultat (ex. “Création du logger ok, tests passés”).

### 6) Passer à la Tâche Suivante

- Répétez le processus pour la prochaine tâche `"pending"`.
- **Si** la nouvelle tâche nécessite d’autres actions (création de docs, mise à jour `PROJECT_STRUCTURE_REFERENCE.md`, etc.), veillez à **appliquer** rigoureusement les protocoles.

---

## 3. Consignes Spécifiques

1. **Respectez les Règles de Développement**

   - Voir **`PROJECT_STRUCTURE_REFERENCE.md`** pour les règles (pas de gros fichiers > 400 lignes, structure modulaire, etc.).

2. **Documentez vos Modifications**

   - Dans le code (commentaires).
   - Dans `progress.log` (résumé de l’action).
   - Mettez à jour la structure du projet dans `PROJECT_STRUCTURE_REFERENCE.md` si vous créez un nouveau dossier, déplacez/renommez un fichier, etc.

3. **Utilisez les Tests Unitaires**

   - Validez systématiquement votre implémentation par des tests (voir le champ `tests` dans `tasks.json`).
   - En cas d’erreur, appliquez `/debug` et `/editFile` (ou tout autre protocole nécessaire) pour corriger.

4. **En Cas de Conflit ou d’Hésitation**
   - Priorisez la lisibilité et la conformité aux règles.
   - Vous pouvez également consulter **`NOVA_OVERVIEW.md`** pour comprendre la vision globale du projet.

---

## 4. Exemple d’Utilisation

### Tâche T001 : Initialisation du Projet

1. **Statut** : Passer T001 en `"in-progress"`.
2. **Action** : Créer la structure de base (voir `PROJECT_STRUCTURE_REFERENCE.md`), installer dépendances.
3. **Test** : Vérifier l’absence de warnings (`npm run build`, `npm test`).
4. **Log** : Dans `progress.log`, noter la finalisation.
5. **Statut** : Marquer T001 `"completed"`.

### Tâche T002 : Ajout d’une Fonctionnalité

1. **Statut** : `"in-progress"`.
2. **Action** : Selon la description (ex. créer un nouveau fichier via `/createFile` ou modifier un existant via `/editFile`).
3. **Test** : Voir `tests` dans `tasks.json`. Corriger si nécessaire.
4. **Log** : Mise à jour `progress.log`.
5. **Statut** : `"completed"`.

---

## 5. Finalisation

- **Veillez** à ce que tous les fichiers de suivi (`tasks.json`, `progress.log`) soient synchronisés après chaque tâche.
- **N’oubliez pas** de mettre à jour la documentation (notamment `PROJECT_STRUCTURE_REFERENCE.md`) si la structure évolue.
- Si vous avez un message de confirmation ou d’étape finale à afficher (ex. “Environnement de développement pour NOVA prêt”), faites-le après la dernière tâche critique.

**Fin du Document**
