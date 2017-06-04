import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
// import query from '../../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()

    // to send data into database :
    // it will return a Promise, so we can chain on it
    // refetchQueries: [{ query }]is used because we want to re-render and re-fetch data on SongList and that is another component
    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
      .catch((err) => { console.log(err) })
  }

  render() {
    return(
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

// mutation is used when data is being sent to database
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
