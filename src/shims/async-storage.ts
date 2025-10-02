const createMemoryStorage = () => {
  const store = new Map<string, string | null>();

  return {
    getItem: async (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: async (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: async (key: string) => {
      store.delete(key);
    },
    clear: async () => {
      store.clear();
    },
    getAllKeys: async () => Array.from(store.keys()),
  };
};

const AsyncStorage = createMemoryStorage();

export default AsyncStorage;
export const { getItem, setItem, removeItem, clear, getAllKeys } = AsyncStorage;
