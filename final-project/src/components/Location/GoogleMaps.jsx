import { GoogleMap, Marker } from "@react-google-maps/api";

const GoogleMapComponent = ({ center, selected }) => {
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      {selected && <Marker position={selected} />}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
