import React from 'react';
import axios from 'axios';
import "./style.css";

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.getCountryData = this.getCountryData.bind(this)
    }


    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: []
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const resApi = await axios.get('https://covid19.mathdro.id/api');
        const resCountries = await axios.get('https://covid19.mathdro.id/api/countries');
        const countries = resCountries.data.countries.map(country => { return country.name });
        countries.unshift('Worldwide')

        this.setState({
            confirmed: resApi.data.confirmed.value,
            recovered: resApi.data.recovered.value,
            deaths: resApi.data.deaths.value,
            countries
        })
    };

    async getCountryData(e) {
        if (e.target.value === "Worldwide") {
            return this.getData()
        }
        const res = await axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
        this.setState({
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value,
        })
    }

    renderCountryOptions() {
        return this.state.countries.map((countries, i) => {
            return <option key={i}>{countries}</option>
        })
    };

    render() {
        return (
            <div className="container">
                <h1>Corona Tracker</h1>
                <select className="dropdown" onChange={this.getCountryData}>
                    {this.renderCountryOptions()}
                </select>
                <div className="flex">
                    <div className="box confirmed">
                        <h2>Confirmed</h2>
                        <h3>{this.state.confirmed}</h3>
                    </div>
                    <div className="box recovered">
                        <h2>Recovered</h2>
                        <h3>{this.state.recovered}</h3>
                    </div>
                    <div className="box deaths">
                        <h2>Deaths</h2>
                        <h3>{this.state.deaths}</h3>
                    </div >
                </div>
                <footer>
                    <p>Corona Tracker v1.0</p>
                    <p>Developed by Neelesh Shetty 🛸</p>
                    <a class="button github" href="https://github.com/neeleshio" target="_blank">
                        <i class="fab fa-github-square "></i>
                        <span>GITHUB</span>
                    </a>
                    <a class="button twitter" href="https://github.com/neeleshio" target="_blank">
                        <i class="fab fa-twitter-square "></i>
                        <span>TWITTER</span>
                    </a>
                    <a class="button linkedin" href="https://github.com/neeleshio" target="_blank">
                        <i class="fab fa-linkedin"></i>
                        <span>LINKEDIN</span>
                    </a>
                </footer>

            </div>
        )
    }
}