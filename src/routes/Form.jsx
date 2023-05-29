import React from 'react';
import { useParams } from 'react-router-dom';

function Form(props) {
  const format = {
    user: {
      userId: 'text',
      userName: 'text',
      password: 'password',
      image: 'text',
    },
    board: {
      boardName: 'text',
      userId: 'text',
    },
    post: {
      boardId: 'hidden',
      userId: 'text',
      title: 'text',
      content: 'textarea',
      image: 'text',
    },
  };

  const form = useParams().form;
  const data = format[form];

  return (
    <div>
      <h1>Form 페이지임</h1>
    </div>
  );
}

export default Form;
