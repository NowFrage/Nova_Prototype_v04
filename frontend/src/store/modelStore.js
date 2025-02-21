import { create } from 'zustand';

const useModelStore = create(set => ({
  // État initial
  selectedModel: 'gpt-3.5-turbo',
  availableModels: [
    { id: 'gpt-3.5-turbo', name: 'ChatGPT 3.5' },
    { id: 'ollama', name: 'Ollama' },
    { id: 'deepseek', name: 'DeepSeek' },
    { id: 'mistral', name: 'Mistral' }
  ],
  
  // Actions
  setSelectedModel: (model) => set({ selectedModel: model })
}));

export default useModelStore;