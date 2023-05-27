import React from 'react';

function Post(props) {
  const { post } = props;
  return (
    <tr onClick={() => {}} key={`1${post}`}>
      <td key={`2${post}`}>{post}</td>
      <td key={`3${post}`}>{post}</td>
      <td key={`4${post}`}>{post}</td>
      <td key={`5${post}`}>{post}</td>
      <td key={`6${post}`}>{post}</td>
      <td key={`7${post}`}>{post}</td>
    </tr>
  );
}

export default Post;
