/**
 *  Working Tutorial File
 */

///[ COMMENT BOX ]
var CommentBox = React.createClass({
  render: function(){
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList />
        <CommentForm />
      </div>
      );
  }
});

//[ COMMENT LIST ]
var CommentList = React.createClass({
  render: function(){
    return (
      <div className="commentList">
        Hi, I am a CommentList.
      </div>
    );
  }
});

//[ COMMENT FORM ]
var CommentForm = React.createClass({
  render: function(){
    return(
      <div className="commentForm">
        Hello, I am a CommentForm.
      </div>
    );
  }
});


//Render a CommentBox in the content div
ReactDOM.render(<CommentBox />, document.getElementById('content'));