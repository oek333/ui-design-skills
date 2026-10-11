// Single shared state. Every region renders from this; nothing keeps its own copy.
const state = { selectedWitness: null, hidden: new Set() };
const listeners = [];
function setState(patch) { Object.assign(state, patch); listeners.forEach(fn => fn(state)); }
function subscribe(fn) { listeners.push(fn); }
