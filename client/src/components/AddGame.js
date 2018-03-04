import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { getIsFetching, getVisibleGames } from '../reducers'

class AddGame extends Component{
    constructor(props){
        super(props);
        this.state = {term: ''}
        this.onInputChange = this.onInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onInputChange(event){
        this.setState({term:event.target.value})
    }
    onFormSubmit(event){
        const { isFetching, requestGames, fetchGames } = this.props;

        event.preventDefault();
        // we need to go fetch weather data
        requestGames();
        fetchGames(this.state.term);
        this.setState({term:'' })
    }
    renderContent(){
        const { isFetching , games} = this.props
        console.log( isFetching)
        if (isFetching && !games.length){
            return <p>Loading</p>
        } else if (games){
            return <div>{games.map(this.getGame)}</div>
        }

    }
    styleCSS = {
        padding:'20px'
    };

    getGame(data){
        return(
            <div>
            <pre key={data.id}>{data.name}</pre>
            <img src ={data.cover.url} alt = "" />
            </div>
        )
    }

	render(){
		return(
			<div style={this.styleCSS}>
                <form onSubmit={this.onFormSubmit}>
                    <input
                    value={this.state.term}
                    onChange={this.onInputChange}/>
                    <button type="submit">
                        Search
                    </button>
                    {this.renderContent()}
                </form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        isFetching :getIsFetching(state),
        games:getVisibleGames(state),
    }
}

export default connect(mapStateToProps,actions)(AddGame);