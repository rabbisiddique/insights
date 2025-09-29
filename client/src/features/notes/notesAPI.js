import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteApi = createApi({
  reducerPath: "notes",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/note",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Notes"], // ✅ define once
  endpoints: (builder) => ({
    createNoteCard: builder.mutation({
      query: (body) => ({
        url: "/create-note",
        method: "POST",
        body,
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

    getAllNote: builder.query({
      query: () => ({
        url: "/get-all-note",
        method: "GET",
      }),
      providesTags: ["Notes"], // ✅ consistent
    }),

    getNote: builder.query({
      query: (id) => ({
        url: `/get-single-note/${id}`,
        method: "GET",
      }),
      providesTags: ["Notes"], // ✅ consistent
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
} = noteApi;
