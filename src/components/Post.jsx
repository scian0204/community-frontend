import React from 'react';
import { useNavigate } from 'react-router-dom';

function Post(props) {
  const { post } = props;
  const writeDate = new Date(parseInt(post.writeDate)).toLocaleDateString();
  const nav = useNavigate();

  return (
    <tr
      onClick={() => {
        nav(`/PostShow/${post.postId}`);
      }}
      key={`${post.postId}`}>
      <td key={`${post.postId}_postId`}>{post.postId}</td>
      <td key={`${post.postId}_title`}>{post.title}</td>
      <td key={`${post.postId}_userId`}>{post.userId}</td>
      <td key={`${post.postId}_writeDate`}>{writeDate}</td>
      <td key={`${post.postId}_viewCount`}>{post.viewCount}</td>
      <td key={`${post.postId}_recommend`}>{post.recommend}</td>
    </tr>
  );
}

export default Post;
