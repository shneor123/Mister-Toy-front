import React, { useState } from 'react'
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';


export const Dashboard = ({ toys }) => {


    const [userData, setUserData] = useState({
        
        labels: toys.map((toy) => toy.name),
        datasets: [
            {
                label: "# of vots",
                data: toys.map((toy) => toy.price),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderRadius: 10,
                borderWidth: 2,
            },
        ],
    })
    return (
        <div className="App">
            <div style={{ width: 700 }}>
                <BarChart chartData={userData} />
            </div>
            <div style={{ width: 700 }}>
                <LineChart chartData={userData} />
            </div>
        </div>
    );
}

