import { createPinia, setActivePinia } from 'pinia';

const pinia = createPinia();

// Ensure a global active Pinia for cases where stores are used outside components.
setActivePinia(pinia);

export default pinia;
