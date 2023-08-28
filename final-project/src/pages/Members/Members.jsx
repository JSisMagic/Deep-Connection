import { Box, Input, Stack } from "@chakra-ui/react"
import MembersList from "../../components/MembersList/MembersList"
import { useState } from "react"

const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Box p={5} paddingInline={10}>
      <Input
        type="text"
        placeholder="search members by username or phone number"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value.toLowerCase())}
      />
      <MembersList searchTerm={searchTerm} />
    </Box>
  )
}

export default MembersPage
