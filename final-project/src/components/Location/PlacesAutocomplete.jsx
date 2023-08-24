import { Input, List, ListItem, Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

const PlacesAutocomplete = ({ selected, setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete({
    debounce: 500
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    setSelected(address);
  };

  useEffect(() => {
    if (selected === '') {
      setValue('', false);
    }
  }, [setValue, selected])

  return (
    <Popover isOpen={status === "OK"}>
      <PopoverTrigger>
        <Input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search an address"
          autoComplete="off"
        />
      </PopoverTrigger>
      <PopoverContent width="422px">
      <PopoverBody>
        <List>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ListItem key={place_id} onClick={() => handleSelect(description)} _hover={{
                background: "white",
                color: "teal.500",
                cursor: "pointer"
              }}>
                {description}
              </ListItem>
            ))}
        </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PlacesAutocomplete;
