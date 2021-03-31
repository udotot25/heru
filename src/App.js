import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const list = {
		nextPage: 2,
		sort: 1,
		entries: [
			{
				id: 'abcde',
				name: 'Langstorm',
				score: 55000,
				pic: 'https://miro.medium.com/max/430/1*bopgnrkjyiu6usW4xecmqw.jpeg',
				rank: 1
			},
			{
				id: 'fghij',
				name: 'Langstorm',
				score: 55000,
				pic: 'https://pics.me.me/one-does-not-simply-make-an-http-request-in-nodejs-51658436.png',
				rank: 2
			}
		]
}

const URL = 'https://exampleleaderboards.com/api/v1/leaderboard?event_name=&view=&page=&sortOrder=';
//const URL = list;

function App() {
	const [board, setBoard] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        const response =  axios.get(URL)
		.then((response) => {
			setBoard(response.data);
		})
		.catch(error => {console.log('Error: ', error)});
        
    }

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'score', 'pic', 'rank'];

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    const renderBody = () => {
        return board && board.map(({ id, name, score, pic, rank }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{score}</td>
                    <td>{pic}</td>
                    <td>{rank}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>Heru Assessment</h1>
			
			<label htmlFor="events">
				<input id="events" name="event_name" type="text" />
			</label>
			<label htmlFor="range">
				<select name="view" id="range">
				  <option value="hundred">Top 100</option>
				  <option value="global">Global Leaderboard</option>
				</select>
			</label>
			
            <table id='leaderboard'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
				<tfoot>
					<tr>
						<td colSpan="5">
							<button className='button'>Refresh Leaderboard</button>
						</td>
					</tr>
				</tfoot>
            </table>
        </>
    )
}
export default App;
