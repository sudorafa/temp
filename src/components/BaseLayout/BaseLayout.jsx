import { Container } from "@chakra-ui/react"
import { Navbar } from "../Navbar/Navbar"

export const BaseLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container as="main"> 
        {children}
      </Container>
    </>
  )
}