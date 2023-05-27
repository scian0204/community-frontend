import React from 'react';
import { useParams } from 'react-router-dom';

function Form(props) {
  const { test } = useParams();

  return (
    <div>
      <h1>Form 페이지임</h1>
    </div>
  );
}

export default Form;
