import gql from 'graphql-tag';

// export default gql`
//   {
//     songs {
//       id
//       title
//     }
//   }
// `;

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default query;
