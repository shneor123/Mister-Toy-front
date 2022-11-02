import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { toyService } from '../services/toy.service.js'

ChartJS.register(ArcElement, Tooltip, Legend);

export class Dashboard extends React.Component {

    state = {
        labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'],
        labelsStockMap: [0, 0, 0, 0, 0, 0, 0],
        labelsPriceMap: [0, 0, 0, 0, 0, 0, 0],
    }

    async componentDidMount() {
        const allToysInStore = await toyService.query()
        const { labels, labelsStockMap, labelsPriceMap } = this.state

        allToysInStore.forEach(toy => {
            toy.labels.forEach(label => {
                const idx = labels.findIndex(l => l === label)
                if (idx !== -1) {
                    labelsPriceMap[idx] += toy.price
                    labelsStockMap[idx] += 1
                }
            })
        })

        const labelsAvgPriceMap = labelsPriceMap.map((label, idx) => label / labelsStockMap[idx])
        this.setState({ labelsStockMap, labelsPriceMap: labelsAvgPriceMap })
    }

    render() {
        const { labels, labelsStockMap, labelsPriceMap } = this.state
        if (!labelsStockMap || !labelsPriceMap) return <h1>loading</h1>

        const data1 = {
            labels,
            datasets: [
                {
                    label: '# of Votes',
                    data: labelsStockMap,
                    backgroundColor: [
                        'rgba(255, 20, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 45, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 69, 64, 1)',
                        'rgba(255, 120, 120, 1)'
                    ],
                    borderColor: [
                        'rgb(40, 44, 52)'
                    ],
                    borderWidth: 1,
                },
            ],
        }

        const data2 = {
            labels,
            datasets: [
                {
                    label: '# of Votes',
                    data: labelsPriceMap,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 120, 120, 1)',
                    ],
                    borderColor: [
                        'rgb(40, 44, 52)'
                    ],
                    borderWidth: 1,
                },
            ],
        }
        return <section className='charts-container'>
            <div>
                <h2>Inventory by type</h2>
                <Doughnut data={data1} />
            </div>
            <div>
                <h2>Average prices per type</h2>
                <Doughnut data={data2} />
            </div>
        </section>
    }
}
