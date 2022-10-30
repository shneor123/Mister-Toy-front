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
                        'rgb(1, 147, 108)',
                        'rgb(12, 180, 121)',
                        'rgb(41, 209, 157)',
                        'rgb(75, 234, 170)',
                        'rgb(112, 245, 202)',
                        'rgb(146, 243, 208)',
                        'rgb(184, 251, 233)'
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
                        'rgb(47, 143, 157)',
                        'rgb(27, 154, 170)',
                        'rgb(59, 172, 182)',
                        'rgb(90, 190, 194)',
                        'rgb(153, 225, 217)',
                        'rgb(179, 232, 220)',
                        'rgb(204, 238, 222)'
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
