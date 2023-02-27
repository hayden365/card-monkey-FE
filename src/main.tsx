import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import GlobalStyles from "./global/globalStyles";
import router from "./router";
import store from "./store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";

let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </>,
);
