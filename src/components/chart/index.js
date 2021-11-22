import { Line } from 'react-chartjs-2';
import './style.css';


function LineChart(){
        return (
                <div className="chart__box">
                        <Line
                                data = {{
                                        labels: ['Ange', 'Golem', 'Benediction', 'Equipement'],
                                        datasets: [{
                                                data: [0,5.5, 30.9, 20.2],
                                                borderColor: '#ffffff',
                                                backgroundColor: '#ffffff'
                                        }]   
                                }}
                                options={{
                                        plugins: {
                                                datalabels: {
                                                    color: '#ffffff'
                                                },
                                                legend:{
                                                        display:false
                                                }
                                        },
                                        maintainAspectRatio: false,
                                        scales: {
                                                y: {
                                                        beginAtZero: true,
                                                        ticks: {
                                                                color:"white"
                                                        },
                                                        grid: {
                                                                color: '#202020'
                                                        }
                                                },
                                                x:{
                                                        beginAtZero: true,
                                                        ticks: {
                                                                color:"white"
                                                        },
                                                        grid: {
                                                                color: '#202020'
                                                        }     
                                                }
                                        },
                                                                               
                                }}
                        />
                </div>
        );
}

export default LineChart;