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
  getInitialState: function(){
      return {data:[]};
    },
    loadCommentsFromServer: function(){
       $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data){
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err){
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handleCommentSubmit: function(comment){
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentDidMount: function(){
     this.loadCommentsFromServer();
     setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function(){
      return (
        <div className="commentBox">
          <h2>Comments</h2>
          <CommentList data={this.state.data}/>
          <CommentForm onSubmitCallback={this.handleCommentSubmit}/>
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
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    
    if(!text || !author){
      return;
    }
    
    this.props.onSubmitCallback({author: author, text: text});
    
    this.setState({author:'', text:''});
  },
  render: function(){
    return(
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Your name" 
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input 
        type="text" 
        placeholder="Say something..."
        value={this.state.text}
        onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
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
ReactDOM.render(<CommentBox url={"/api/comments"} pollInterval={2000} />, document.getElementById('content'));