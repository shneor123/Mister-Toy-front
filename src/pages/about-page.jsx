import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export const AboutPage = () => {

    const [map, setMap] = useState({
        center: {
            lat: 32.109333,
            lng: 34.855499
        },
        zoom: 15,
        branches: [
            {
                lat: 32.109333,
                lng: 34.855499,
                name: 'Tel Aviv'
            },
            {
                lat: 32.794044,
                lng: 34.989571,
                name: 'Haifa'
            },
            {
                lat: 31.771959,
                lng: 35.217018,
                name: 'Jerusalem'
            },
            {
                lat: 40.730610,
                lng: -73.935242,
                name: 'New York'
            }
        ]
    })

    const onSetCenter = (lat, lng) => {
        setMap((prevmapOpts) => ({ ...prevmapOpts, center: { lat, lng } }))
    }


    const { branches, center, zoom } = map
    if (!branches) return <></>
    return (
        <main className='about-page-container'>
            <div className='about-container'>
                <div>
                    <h2>Our Story:</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates expedita ab obcaecati eligendi nobis ea reprehenderit debitis incidunt, inventore, consequuntur tenetur exercitationem in odio! Consequatur temporibus totam amet tempora error!<br></br><br></br> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sit facilis dicta ab provident aut illo, magnam est, aperiam exercitationem cum. Deleniti voluptatibus rem accusamus ex pariatur ab esse est!
                    </p>
                </div>
                {
                    <div className='visit-us-container'>
                        <h2>Visit Us Here:</h2>
                        {branches.map(branch =>
                            <h3 key={branch.lat} onClick={() => onSetCenter(branch.lat, branch.lng)}>
                                {branch.name}
                            </h3>
                        )}
                    </div>
                }
            </div>

            <div className='map' style={{ borderRadius: '4px', }}>
                <GoogleMapReact
                    // style={{borderRadius: '5px'}}
                    bootstrapURLKeys={{ key: 'AIzaSyA7svj7Pw0bEG5od8w7lW9Mu8zKhfCMDrA' }}
                    defaultCenter={center}
                    center={center}
                    defaultZoom={zoom}
                >
                    {branches.map(branch => <AnyReactComponent key={branch.name} title={branch.name} lat={branch.lat} lng={branch.lng} text={'🧸'} />)}
                </GoogleMapReact>
            </div>
        </main>
    );
}