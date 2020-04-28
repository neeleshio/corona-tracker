import React from 'react';

import { Cards } from './components';
import styles from './App.module.css';
import { fetchData } from './api'

class App extends React.Component {
    state = {
        data: {},
        country: ''
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
    }

    render() {
        const { data } = this.state;
        return (
            <div className={styles.container}>
                <Cards data={data} />
            </div>
        )
    }
}

export default App; 