import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from "@chakra-ui/react"

export const SuccessAlert = ({ title, description, onCloseClick }) => {

  return (
    <Alert status='success' marginBottom={4}>
      <AlertIcon />
      <Box width={"100%"}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onCloseClick}
      />
    </Alert>
  )
}