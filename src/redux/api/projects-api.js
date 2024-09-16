import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["project"],
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (data) => ({
        url: "projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    getAllProjects: builder.query({
      query: (ownerUserId) => ({
        url: `projects/${ownerUserId}`,
      }),
      providesTags: ["project"],
    }),
    addNewFeature: builder.mutation({
      query: (data) => ({
        url: "projects/features",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    getAllFeatures: builder.query({
      query: (projectId) => ({
        url: `projects/features/${projectId}`,
      }),
      providesTags: ["project"],
    }),
    addNewTask: builder.mutation({
      query: (data) => ({
        url: "projects/features/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    getAllTasks: builder.query({
      query: ({ projectId, featureId }) => ({
        url: `projects/features/tasks/${projectId}/${featureId}`,
      }),
      providesTags: ["project"],
    }),
    updateTaskCompletionStatus: builder.mutation({
      query: ({ data, projectId, featureId, taskId }) => ({
        url: `projects/features/tasks/${projectId}/${featureId}/${taskId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    deleteTask: builder.mutation({
      query: ({ projectId, featureId, taskId }) => ({
        url: `projects/features/tasks/${projectId}/${featureId}/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetAllProjectsQuery,
  useAddNewFeatureMutation,
  useGetAllFeaturesQuery,
  useAddNewTaskMutation,
  useGetAllTasksQuery,
  useUpdateTaskCompletionStatusMutation,
  useDeleteTaskMutation,
} = projectsApi;
