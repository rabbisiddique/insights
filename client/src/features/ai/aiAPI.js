import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aiApi = createApi({
  reducerPath: "ai",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/ai",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Notes", "AiMessages"],

  endpoints: (builder) => ({
    improveWriting: builder.mutation({
      query: ({ noteId, title, content }) => ({
        url: "/improve-writing",
        method: "POST",
        body: { noteId, title, content },
      }),
      invalidatesTags: ["AiMessages"],
    }),
    summarizeNoteContent: builder.mutation({
      query: (payload) => ({
        url: "/summarize",
        method: "POST",
        body: payload,
      }),
    }),
    suggestTags: builder.mutation({
      query: (payload) => ({
        url: "/suggest-tags",
        method: "POST",
        body: payload, // can be { noteId } or { title, content }
      }),
    }),
    aiNoteMaker: builder.mutation({
      query: (payload) => ({
        url: "/ai-interact",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result) =>
        result?.note
          ? [
              { type: "Notes", id: "LIST" }, // refetch all notes
              { type: "Notes", id: result.note._id }, // refetch this note
            ]
          : [{ type: "Notes", id: "LIST" }],
    }),

    // aiAPI.js
    // api/aiApi.js
    getAiMessages: builder.query({
      query: (noteId) => `/get-messages/${noteId}`,
      providesTags: (result, error, noteId) => [
        { type: "AiMessages", id: noteId },
      ],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useImproveWritingMutation,
  useSummarizeNoteContentMutation,
  useSuggestTagsMutation,
  useGetAiMessagesQuery,
  useAiNoteMakerMutation,
} = aiApi;
