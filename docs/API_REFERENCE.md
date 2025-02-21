# Documentation API NOVA v0.4

## Points d'entrée API

### Chat

#### GET /api/chat/conversations
Récupère la liste des conversations.

#### POST /api/chat/conversations
Crée une nouvelle conversation.

#### POST /api/chat/messages
Envoie un nouveau message.

#### GET /api/chat/conversations/:conversationId/messages
Récupère les messages d'une conversation.

### Projets

#### GET /api/projects
Récupère la liste des projets.

#### POST /api/projects
Crée un nouveau projet.

#### PUT /api/projects/:id
Met à jour un projet existant.

### Mémoire Contextuelle

#### POST /api/memory
Sauvegarde un élément de mémoire contextuelle.

#### GET /api/memory/project/:projectId
Récupère la mémoire contextuelle d'un projet.

#### PATCH /api/memory/:id/relevance
Met à jour la pertinence d'un élément de mémoire.

## Modèles de Données

### Conversation
```json
{
  "title": "string",
  "projectId": "ObjectId",
  "context": "string",
  "status": "active|archived",
  "createdAt": "Date",
  "updatedAt": "Date"
}

Message
{
  "content": "string",
  "role": "user|assistant|system",
  "modelId": "string",
  "conversationId": "ObjectId",
  "timestamp": "Date"
}
Project
{
  "name": "string",
  "description": "string",
  "path": "string",
  "settings": {
    "defaultModel": "string",
    "theme": "string"
  }
}
ContextualMemory
{
  "projectId": "ObjectId",
  "type": "conversation|codeContext|projectStructure",
  "content": "object",
  "relevance": "number",
  "metadata": "object"
}


