import { legacy_createStore as createStore } from "redux";
import reducers from "./reducers";
// persist redux
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "chart"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };
