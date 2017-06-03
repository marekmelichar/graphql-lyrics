import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../../queries/fetchSong';

import LyricCreate from '../lyric_create/LyricCreate';
import LyricList from '../lyric_list/LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data

    if (!song) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id }}}
})(SongDetail)

// 59315f54767de5227a1adb41
