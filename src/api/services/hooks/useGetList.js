import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import HttpClient from "../../HttpClient"
import TodoListService from "../TodoListService"

export const useGetList = (listId) => {
  const client = useMemo(() => HttpClient.getInstance(), [])
  const service = new TodoListService(client)
  const query = useQuery({ queryKey: ['todos', listId], queryFn: async () => await service.getTodoById(listId) })
  return {
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
    list: query.data
  }
}