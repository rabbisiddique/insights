import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../utils/baseUrl";

export const noteApi = createApi({
  reducerPath: "notes",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/note`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Notes"], // ✅ define once
  endpoints: (builder) => ({
    createNoteCard: builder.mutation({
      query: (payload) => ({
        url: "/create-note",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Notes"], // ✅ consistent
    }),

    updateNote: builder.mutation({
      query: ({ noteId, formData }) => ({
        url: `/update-note/${noteId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Notes"], // ✅ ensures update triggers refresh
    }),

    // notesAPI.js - Keep it simple
    getAllNote: builder.query({
      query: () => ({
        url: "/get-all-note",
        method: "GET",
      }),
      providesTags: ["Notes"], // ✅ Simple
    }),

    getNote: builder.query({
      query: (id) => ({
        url: `/get-single-note/${id}`,
        method: "GET",
      }),
      providesTags: ["Notes"],
    }),
    getPublicNotes: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/public?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Notes"],
    }),

    getFilteredNotes: builder.query({
      query: ({ title, tags, page = 1, limit = 6 }) => ({
        url: `/get-filtered-note?page=${page}&limit=${limit}`,
        method: "POST",
        body: { title, tags },
      }),
      providesTags: ["Notes"], // ✅ consistent
    }),

    deleteNote: builder.mutation({
      query: (deleteId) => ({
        url: `/delete-note/${deleteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"], // ✅ consistent
    }),
    archiveNote: builder.mutation({
      query: (id) => ({
        url: `/archive-note/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notes"],
    }),
    deleteAllNote: builder.mutation({
      query: () => ({
        url: `/delete-all-note`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
    notesCount: builder.query({
      query: () => ({
        url: `/notes-stats`,
        method: "GET",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useCreateNoteCardMutation,
  useUpdateNoteMutation,
  useGetAllNoteQuery,
  useGetNoteQuery,
  useGetFilteredNotesQuery,
  useDeleteNoteMutation,
  useArchiveNoteMutation,
  useNotesCountQuery,
  useDeleteAllNoteMutation,
  useGetPublicNotesQuery,
} = noteApi;
