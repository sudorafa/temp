import { Heading } from "@chakra-ui/react";
import { BaseLayout } from "../../components/BaseLayout/BaseLayout";
import { CreateView } from "./CreateView";
import { EditView } from "./EditView";

export default function List({mode}) {
  return (
    <BaseLayout>
      <Heading as="h1" marginBottom={4}>Listas de Tarefas</Heading>
      {mode === "create" && <CreateView/>}
      {mode === "edit" && <EditView/>}
    </BaseLayout>
  )
}
