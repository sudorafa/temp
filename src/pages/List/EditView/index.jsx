import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Input, ListItem, OrderedList, Text } from "@chakra-ui/react"
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetList } from "../../../api/services/hooks/useGetList"
import { useUpdateList } from "../../../api/services/hooks/useUpdateList"
import { SuccessAlert } from "../../../components/SuccessAlert"
import DTOTodoList from "../../../models/DTOTodoList"
import S from './edit-view.module.css'

function RecursiveList({ items }) {
  return (
    items.sort((a, b) => a.order - b.order).map(item => {
      if (item.itens) {
        return (
          <>
            <Text fontSize={"sm"} flex={1} textAlign={"center"} padding={2}>
              Sub-itens
            </Text>
            <RecursiveList items={item.itens} />
          </>
        )
      }

      return (
        <>
          <ListItem key={"list-item" + item.id} className={S["list-item"]}>
            <Text flex={1}>
              {item.order} - {item.item}
            </Text>
          </ListItem>
          <Divider key={"divider_" + item.id + item.order} />
        </>
      )
    })
  );
}

export const EditView = () => {
  const params = useParams();
  const [listName, setListName] = useState("")
  const [listItem, setListItem] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const { isSuccess: isListFetchSuccess, list: fetchedList } = useGetList(params.id)
  const { isSuccess: isListUpdateSuccess, isPending: isUpdateListPending, addItem } = useUpdateList(fetchedList)

  useEffect(() => {
    if (isListFetchSuccess) {
      console.log('fetched', fetchedList)
      setListName(fetchedList?.name)
    }

  }, [fetchedList, isListFetchSuccess])


  useEffect(() => {
    if (isListUpdateSuccess) setShowSuccess(true)

    return () => setTimeout(() => setShowSuccess(false), 5000)
  }, [isListUpdateSuccess])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newListItem = DTOTodoList.createItem(listItem)
    await addItem(newListItem)
    setListItem("")
  }


  if (fetchedList && fetchedList?.length === 0) return null

  return (
    <Card as="form" variant="elevated" onSubmit={handleSubmit}>
      <CardHeader>
        <Heading as="h2" className={S["form__title"]}>{listName}</Heading>
      </CardHeader>
      <CardBody>
        {showSuccess && (
          <SuccessAlert title="Item adicionado!" description={"Seu item foi registrado na lista!"} />
        )}
        <FormControl isRequired>
          <FormLabel>Novo item para lista</FormLabel>
          <Input type='text' value={listItem} onChange={(e) => setListItem(e.target.value)} />
        </FormControl>
      </CardBody>
      <CardFooter className={S["form__footer"]}>
        <ButtonGroup spacing='2'>
          <Button variant='outline' color="blue.600" type="submit" isLoading={isUpdateListPending}>
            Salvar
          </Button>
        </ButtonGroup>
      </CardFooter>
      {fetchedList?.itens.length > 0 && (
        <CardBody>
          <Heading as="h3" key={"list_header"} fontSize={"small"} marginBottom={4}>Itens</Heading>
          <OrderedList>
            <RecursiveList items={fetchedList.itens} />
          </OrderedList>
        </CardBody>
      )}
    </Card>
  )
}