import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { aiApi } from "../features/ai/aiAPI";
import { authApi } from "../features/auth/authAPI";
import { noteApi } from "../features/notes/notesAPI";
import { profileApi } from "../features/profile/profileAPI";
import { verifyApi } from "../features/verify/verifyAPI";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [verifyApi.reducerPath]: verifyApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      verifyApi.middleware,
      noteApi.middleware,
      aiApi.middleware
    ),
});
setupListeners(store.dispatch);
