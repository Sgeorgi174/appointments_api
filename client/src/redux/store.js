import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";
import appointmentsReducer from "./appointmentsSlice";
import { botTokenApi } from "./botTokenApi";
import { botSettingsApi } from "./botSettingsApi";
import { appointmentsApi } from "./appointmentsApi";
import { scheduleApi } from "./scheduleApi";
import { categoriesApi } from "./categoriesApi";
import { servicesApi } from "./servicesApi";
import { contactsInfoApi } from "./contactsInfoApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [botTokenApi.reducerPath]: botTokenApi.reducer,
    [botSettingsApi.reducerPath]: botSettingsApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [contactsInfoApi.reducerPath]: contactsInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      botTokenApi.middleware,
      botSettingsApi.middleware,
      appointmentsApi.middleware,
      scheduleApi.middleware,
      categoriesApi.middleware,
      servicesApi.middleware,
      contactsInfoApi.middleware
    ),
});

setupListeners(store.dispatch);
