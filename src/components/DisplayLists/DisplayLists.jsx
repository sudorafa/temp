import { AddIcon } from "@chakra-ui/icons"
import { Button, Divider, ListItem, OrderedList, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import S from './display-lists.module.css'


const DisplayLists = ({ lists }) => {

  if (lists.length === 0) return null

  return (
    <OrderedList width={"100%"} flexGrow={1}>
      {lists.map(list => (
        <>
          <ListItem key={list.id} className={S["list-item"]}>
            <Text flex={1}>
              {list.name}
            </Text>
            <VStack spacing={2}>
              <Button size={"sm"} rightIcon={<AddIcon />} color='blue.600' variant='outline' className={S["action-button"]}>
                <Link to={`/list/edit/${list.id}`} replace>
                  Adicionar itens
                </Link>
              </Button>
            </VStack>
          </ListItem>
          <Divider key={"divider" + list.id} />
        </>
      ))}
    </OrderedList>
  )
}

export default DisplayLists