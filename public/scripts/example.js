/**
 *  Working Tutorial File
 */

// SAMPLE DATA
var data = [
  {id: 1, author: "Petes Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
  {id:3, author: "Julie Margolia", text: "LIKE AND SHARE IF YOU AGREE"},
  {id:4, author: "Carol Pyle", text: "I LOVE LAMP"}
];


///[ COMMENT BOX ]
var CommentBox = React.createClass({
  render: function(){
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList data={this.props.data}/>
        <CommentForm />
      </div>
      );
  }
});

//[ COMMENT LIST ]
var CommentList = React.createClass({
  render: function(){
    
    //Create list of Comment components
    var commentNodes = this.props.data.map(function(comment){
        return (
          <Comment key={comment.id} author={comment.author}>
            {comment.text}
          </Comment>
        );
      });
      
      //Return component list
      return (
        <div className="commentList">
          {commentNodes}
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
ReactDOM.render(<CommentBox data={data} />, document.getElementById('content'));