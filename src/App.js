import React from 'react';
import axios from 'axios';
import Switch from "react-switch";
import "./style.css";
import sun from './assets/sun.svg'
import moon from './assets/moon.svg'
import CountUp from 'react-countup';

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.getCountryData = this.getCountryData.bind(this);
        this.handleTheme = this.handleTheme.bind(this);
    }


    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: [],
        lightMode: false,
    }

    handleTheme(lightMode) {
        this.setState( {lightMode} );
        if(this.state.lightMode) {
            document.querySelector(':root').style.setProperty('--background-color', '#E5E5E5');
            document.querySelector(':root').style.setProperty('--box-background-color', '#FFFFFF');
            document.querySelector(':root').style.setProperty('--text-color', '#000000');
        }
        else {
            document.querySelector(':root').style.setProperty('--background-color', '#1E1D21');
            document.querySelector(':root').style.setProperty('--box-background-color', '#262529');
            document.querySelector(':root').style.setProperty('--text-color', '#AAAAAA');
        }
      }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const resApi = await axios.get('https://covid19.mathdro.id/api');
        const resCountries = await axios.get('https://covid19.mathdro.id/api/countries');
        const countries = resCountries.data.countries.map(country => { return country.name });
        countries.unshift('Worldwide')
        console.log(resApi.data);

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
            return <option className="country" key={i}>{countries}</option>
        })
    };

    render() {
        return (
            <div className="container">
                <h1>Corona Tracker</h1>
                <div id="theme-toggle" ><Switch offColor="#E5E5E5" onColor="#1E1D21" checkedIcon={<img className="theme-icon" src={moon} />} uncheckedIcon={<img className="theme-icon" src={sun} />} onChange={this.handleTheme} checked={this.state.lightMode} /></div>
                <select className="dropdown" onChange={this.getCountryData}>
                    {this.renderCountryOptions()}
                </select>
                <div className="flex">
                    <div className="box confirmed">
                        <h2>Confirmed</h2>
                        <h3><CountUp
                            start={0}
                            end={this.state.confirmed}
                            duration={2}
                            separator=","
                        /></h3>
                    </div>
                    <div className="box recovered">
                        <h2>Recovered</h2>
                        <h3><CountUp
                            start={0}
                            end={this.state.recovered}
                            duration={2}
                            separator=","
                        /></h3>
                    </div>
                    <div className="box deaths">
                        <h2>Deaths</h2>
                        <h3><CountUp
                            start={0}
                            end={this.state.deaths}
                            duration={2}
                            separator=","
                        /></h3>
                    </div >
                </div>
                <footer>
                    <p>Corona Tracker v1.0</p>
                    <p>Developed by Neelesh Shetty 🛸</p>
                    <a class="button github" href="https://github.com/neeleshio" target="_blank">
                        <i class="fab fa-github-square "></i>
                        <span>GITHUB</span>
                    </a>
                    <a class="button twitter" href="https://twitter.com/neeleshio" target="_blank">
                        <i class="fab fa-twitter-square "></i>
                        <span>TWITTER</span>
                    </a>
                    <a class="button linkedin" href="https://linkedin.com/in/neeleshio" target="_blank">
                        <i class="fab fa-linkedin"></i>
                        <span>LINKEDIN</span>
                    </a>
                </footer>

            </div>
        )
    }
}