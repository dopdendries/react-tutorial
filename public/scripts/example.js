/**
 *  Working Tutorial File
 */

var DEFAULT_ID = 0;

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
      
      var comments = this.state.data;
      //
      comment.id = DEFAULT_ID;
      comments.push(comment);
      this.setState({data: comments});
      
      console.log("new Comment"+comment.toString());
      
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
          <h1>Comments</h1>
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

//[ COMMENT ]
var Comment = React.createClass({
  rawMarkup: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function(){
    return (
      <div className="comment mt10">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
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
      <form className="commentForm fcon" onSubmit={this.handleSubmit}>
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

//Render a CommentBox in the content div
ReactDOM.render(<CommentBox url={"/api/comments"} pollInterval={2000} />, document.getElementById('content'));