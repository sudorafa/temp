import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, Input } from "@chakra-ui/react"
import {
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { useCreateList } from "../../../api/services/hooks/useCreateList"
import { SuccessAlert } from "../../../components/SuccessAlert"
import DTOTodoList from "../../../models/DTOTodoList"
import S from './create-view.module.css'
import DisplayLists from "../../../components/DisplayLists/DisplayLists"

export const CreateView = () => {
  const [listName, setListName] = useState("")
  const [currentSessionLists, setCurrentSessionLists] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const isListNameEmpty = listName === ""
  const { isSuccess, createdList, isPending, createList } = useCreateList()

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true)
      setCurrentSessionLists((c) => [...c, createdList])
    }

    return () => setTimeout(() => setShowSuccess(false), 5000)
  }, [isSuccess, createdList])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const list = DTOTodoList.create(listName)
    await createList(list)
    setListName("")
  }
  return (
    <Card as="form" variant="elevated" onSubmit={handleSubmit}>
      <CardHeader>
        <Heading as="h2" className={S["form__title"]}>Nova lista</Heading>
      </CardHeader>
      <CardBody>
        {showSuccess && (
          <SuccessAlert title="Lista adicionada!" description={"Vamos adicionar itens a lista!"} />
        )}
        <FormControl isRequired>
          <FormLabel>Nome da lista</FormLabel>
          <Input type='text' value={listName} onChange={(e) => setListName(e.target.value)} />
          <FormHelperText>Escolha o nome para sua lista de tarefas</FormHelperText>
        </FormControl>
      </CardBody>
      <CardFooter className={S["form__footer"]}>
        <ButtonGroup spacing='2'>
          <Button variant='outline' color="blue.600" type="submit" isDisabled={isListNameEmpty} isLoading={isPending}>
            Salvar
          </Button>
        </ButtonGroup>
      </CardFooter>
      {currentSessionLists.length > 0 && (
        <CardBody>
          <Heading as="h3" fontSize={"small"} marginBottom={4}>Listas criadas</Heading>
          <DisplayLists lists={currentSessionLists} />
        </CardBody>
      )}
    </Card>
  )
}