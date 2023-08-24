import { Input, List, ListItem, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Popover isOpen={status === "OK"}>
      <PopoverTrigger>
        <Input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search an address"
        />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <List>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ListItem key={place_id} onClick={() => handleSelect(description)}>
                {description}
              </ListItem>
            ))}
        </List>
      </PopoverContent>
    </Popover>
  );
};

export default PlacesAutocomplete;
