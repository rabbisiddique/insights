import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../features/auth/authAPI";
import { profileApi } from "../features/profile/profileAPI";
import { verifyApi } from "../features/verify/verifyAPI";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [verifyApi.reducerPath]: verifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      verifyApi.middleware
    ),
});
setupListeners(store.dispatch);
