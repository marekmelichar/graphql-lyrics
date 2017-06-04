import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
// import query from '../../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id }
    })
    // another approach to refetch data when one item is deleted:
    //  use this when you want to re-fetch data on the same component where the mutation is called
    .then(() => this.props.data.refetch())
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }
    return(
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

// trick to use query and mutation at the same component :
export default graphql(mutation)(
  graphql(query)(SongList)
)
