import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, InputGroup, InputLeftAddon, list, Text, } from "@chakra-ui/react";
import { BaseLayout } from "../../components/BaseLayout/BaseLayout";
import { AddIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import S from './home.module.css'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllLists } from "../../api/services/hooks/useGetAllLists";
import { Input } from '@chakra-ui/react'
import DisplayLists from "../../components/DisplayLists/DisplayLists";

export default function Home() {
  const [editMode, setEditMode] = useState(false)

  const onEditClickHandler = () => {
    setEditMode(true)
  }

  return (
    <BaseLayout>
      <section className={S["screen-grid"]} >
        {!editMode && (
          <Card variant="elevated" className={S["card"]}>
            <CardBody className={S["card__body"]}>
              <div className={S["card__icon"]}>
                <AddIcon color="#fff" boxSize={6} />
              </div>
              <Text fontSize="lg" align="center" color="gray.500">Aqui você pode criar uma nova lista de tarefas</Text>
            </CardBody>
            <CardFooter className={S["card__footer"]}>
              <ButtonGroup spacing='2'>
                <Button variant='outline' color="blue.600">
                  <NavLink to="list/new">
                    Criar Lista
                  </NavLink>
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        )}
        <Home.EditCard onEditClick={onEditClickHandler} />
      </section>
    </BaseLayout>
  )
}

Home.EditCard = function EditCard({ onEditClick }) {
  const [isSearchOn, setIsSearchOn] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { isSuccess, lists } = useGetAllLists()
  const [searchList, setSearchList] = useState(lists)

  useEffect(() => {
    if (searchTerm === '') setSearchList(lists)

    if (isSuccess && lists.length) {
      const filteredLists = lists.filter(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchList([...filteredLists])
    }
  }, [searchTerm, lists, isSuccess])

  const onClick = () => {
    onEditClick()
    setIsSearchOn(true)
  }

  const TEXT_CONTENT = {
    home: {
      instruction: 'Aqui você pode editar suas listas de tarefas'
    },
    edit: {
      instruction: 'Aqui você pode buscar suas listas para editar'
    }
  }

  const getInstructionText = () => {
    if (isSearchOn) return TEXT_CONTENT.edit.instruction

    return TEXT_CONTENT.home.instruction
  }

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <Card variant="elevated" className={S["card"]}>
      {isSearchOn && (
        <CardHeader>
          <Text fontSize="lg" align="center" color="gray.500">{getInstructionText()}</Text>
          <InputGroup>
            <InputLeftAddon><SearchIcon /></InputLeftAddon>
            <Input placeholder={'"Compras do mês"'} type="text" value={searchTerm} onChange={onChangeHandler} />
          </InputGroup>
        </CardHeader>
      )}
      <CardBody className={S["card__body"]}>
        {!isSearchOn && (
          <>
            <div className={S["card__icon"]}>
              <EditIcon color="#fff" boxSize={6} />
            </div>
            <Text fontSize="lg" align="center" color="gray.500">{getInstructionText()}</Text>
          </>
        )}
        {isSearchOn && isSuccess && lists.length > 0 && (
          <DisplayLists lists={searchList} />
        )}
      </CardBody>
      {!isSearchOn && (
        <CardFooter className={S["card__footer"]}>
          <ButtonGroup spacing='2'>
            <Button variant='outline' color="blue.600" onClick={onClick}>
              {/* <NavLink to="list/edit/1"> */}
              Editar Lista
              {/* </NavLink> */}
            </Button>
          </ButtonGroup>
        </CardFooter>
      )}
    </Card>
  )
}