import React, { useContext } from 'react';
import GmtList from './GmtList';
import UserContext from '../context/UserContext';
import GboardWriter from './GboardWriter';

function Gboard(props) {
  const { userData } = useContext(UserContext);

  return (
    <>
      {userData != null && <GboardWriter target={props.userId} />}
      <GmtList target={props.userId} />
    </>
  );
}

export default Gboard;
