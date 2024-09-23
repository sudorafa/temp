import { useMutation } from "@tanstack/react-query"
import { useMemo } from "react"
import HttpClient from "../../HttpClient"
import TodoListService from "../TodoListService"

export const useCreateList = () => {
  const client = useMemo(() => HttpClient.getInstance(), [])
  const service = new TodoListService(client)
  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return service.createTodo(newTodo)
    },
  })
  return {
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    createList: async (list) => mutation.mutate(list),
    createdList: mutation.data
  }
}