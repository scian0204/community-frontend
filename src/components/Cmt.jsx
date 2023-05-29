import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cmt(props) {
  const { comment } = props;
  const [isProfile, setIsProfile] = useState(false);
  const circleStyle = {
    width: '30px',
    height: '30px',
    WebkitBorderRadius: '700px',
    MozBorderRadius: '700px',
    borderRadius: '700px',
    backgroundColor: 'gray',
  };

  return (
    <div key={comment.commentId}>
      <div className="card">
        <div className="card-header">
          <Link
            to={
              !isProfile
                ? {
                    pathname: `/Profile/${comment.userId}`,
                  }
                : {
                    pathname: `/PostShow/${comment.postId}`,
                  }
            }>
            <img
              style={circleStyle}
              // src={`http://localhost:8080/api/image?fileName=${rows[e].image}`}
            />
            &nbsp;{comment.userId}
          </Link>
          {/* // <% if(isLogin) { %>
              // <% if(rs.getString("userid").equals(session.getAttribute("uid")) || session.getAttribute("isAdmin") != null) { %>
              //   <div className="float-right">
              //     <a className="btn btn-danger" href="delete.jsp?tableName=comment&id=<%= rs.getInt(1) %>">����</a> 
              //     <a className="btn btn-warning" href="update.jsp?tableName=comment&id=<%= rs.getInt(1) %>">����</a> 
              //   </div>
              // <% } %>
              // <% } %> */}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{comment.comment}</p>
            <footer className="blockquote-footer">
              <cite title="Source Title">
                {new Date(parseInt(comment.writeDate)).toLocaleDateString()}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Cmt;
