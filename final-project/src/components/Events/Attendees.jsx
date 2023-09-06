import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap
} from "@chakra-ui/react";
import { getUserByEmail } from "../../services/users.services";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email) => EMAIL_REGEXP.test(email);

const Attendees = ({ initialData = [], onChange }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(initialData)

  useEffect(() => {
    onChange(data);
  }, [data, onChange])

  const exists = (email) => data.includes(email);

  const addEmail = async (email) => {
    email.trim();

    if (!isValidEmail(email)) {
      alert("Please input a valid email");
      return;
    }

    if (exists(email)) {
      alert("Attendee already added");
      return;
    }

    const user = await getUserByEmail(email);

    if (user === null) {
      alert ("Cannot find such user");
      return;
    }

    setData([...data, email]);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Validate and add the email if we press tab or enter.
  const handleKeyDown = (e) => {
    if (["Enter", "Tab"].includes(e.key)) {
      e.preventDefault();

      addEmail(value);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const clipboard = e.clipboardData.getData("text");
    addEmail(clipboard);
  };

  const handleCloseClick = (email) => {
    const index = data.findIndex((e) => e === email);
    if (index !== -1) {
      const newEmails = [...data];
      newEmails.splice(index, 1);
      setData(newEmails);
    }
  };

  const Chip = ({ email, onCloseClick }) => (
    <Tag key={email} borderRadius="full" variant="solid" colorScheme="green">
      <TagLabel>{email}</TagLabel>
      <TagCloseButton
        onClick={() => {
          onCloseClick(email);
        }}
      />
    </Tag>
  );

  const ChipList = ({ data = [], onCloseClick }) => (
    <Wrap spacing={1} mb={3}>
      {data.map((email) => (
        <Chip email={email} key={email} onCloseClick={onCloseClick} />
      ))}
    </Wrap>
  );
  
  return (
    <>
    <ChipList data={data} onCloseClick={handleCloseClick} />
    <Box>
      <Input 
        type="email" 
        placeholder="Add email"
        onPaste={handlePaste} 
        onKeyDown={handleKeyDown} 
        onChange={handleChange} 
        value={value} 
      />
    </Box>
    </>
  )
}

export default Attendees;
