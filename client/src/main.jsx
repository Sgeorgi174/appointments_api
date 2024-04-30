import ReactDOM from "react-dom/client";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </Provider>
);
