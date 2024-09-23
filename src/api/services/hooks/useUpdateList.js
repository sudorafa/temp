import { useMutation } from "@tanstack/react-query"
import { useMemo } from "react"
import HttpClient from "../../HttpClient"
import TodoListService from "../TodoListService"
import DTOTodoList from '../../../models/DTOTodoList'

export const useUpdateList = (list) => {
  const client = useMemo(() => HttpClient.getInstance(), [])
  const service = new TodoListService(client)

  const mutation = useMutation({
    mutationFn: async ({ item }) => {
      const newItem = DTOTodoList.createItem(item, list.itens.length)
      list.itens.push(newItem)
      return service.updateTodo(list.id, list)
    },
  })
  return {
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    addItem: async (list) => mutation.mutate(list),
    updatedList: mutation.data
  }
}