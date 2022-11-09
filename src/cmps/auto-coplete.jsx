import React, { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-autocomplete";


const AboutPagesss = () => {
  const [address, setAddress] = useState("")

  const handleSelect = async value => {

  }
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
      </PlacesAutocomplete>
    </div>
  )
}
export default AboutPagesss