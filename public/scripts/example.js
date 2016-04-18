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
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan">This is *another* comment</Comment>
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

//[ COMMENT ]
var Comment = React.createClass({
  rawMarkup: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function(){
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

//Render a CommentBox in the content div
ReactDOM.render(<CommentBox />, document.getElementById('content'));