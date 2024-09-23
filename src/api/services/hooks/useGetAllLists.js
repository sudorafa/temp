import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import HttpClient from "../../HttpClient"
import TodoListService from "../TodoListService"

export const useGetAllLists = () => {
  const client = useMemo(() => HttpClient.getInstance(), [])
  const service = new TodoListService(client)
  const query = useQuery({ queryKey: ['todos'], queryFn: () => service.getAll() })
  return {
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
    lists: query.data
  }
}