import { SearchIcon } from "@chakra-ui/icons"
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useState } from "react"
import MembersList from "../../components/MembersList/MembersList"

const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Box p={5} paddingInline={10}>
      <InputGroup>
        <Input
          type="text"
          placeholder="search members by username or phone number"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
        />
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
      </InputGroup>
      <MembersList searchTerm={searchTerm} />
    </Box>
  )
}

export default MembersPage
