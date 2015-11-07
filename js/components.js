(function (React) {
  'use strict';

  var CommentBox = React.createClass({
    propTypes: {
      url: React.PropTypes.string.isRequired
    },

    getDefaultProps: function () {
      return {
        url: 'https://gist.githubusercontent.com/Sen-Zhang/3a89e370cc744b390b13/raw/a0720009b6d49d7d736dfd01b44257d0c9e0fb8f/default_comments.json'
      };
    },

    getInitialState: function () {
      return {comments: []};
    },

    loadCommentsFromServer: function () {
      $.ajax({
        url: this.props.url,
        dataType: "json",
        type: "GET",
        cache: false,
        success: function (data) {
          this.setState({comments: data});
        }.bind(this),
        error: function (xhr, status, error) {
          console.log(this.props.url, status, error.toString());
        }.bind(this)
      });
    },

    handelSaveComment: function (comment) {
      this.setState({comments: this.state.comments.concat(comment)}, function () {
        $.ajax({
          url: this.props.saveUrl,
          type: "POST",
          dataType: "json",
          data: {comment: comment},
          success: function () {
            console.log('Save Comment Successfully!');
          }.bind(this),
          error: function (xhr, status, error) {
            console.log(comment, status, error.toString());
          }.bind(this)
        })
      });
    },

    //componentWillMount: function () {
    //  alert('Will Mount');
    //},
    //
    //componentWillUpdate: function (nextProps, nextState) {
    //  alert('Will Update');
    //},
    //
    //componentDidUpdate: function (prevProps, prevState) {
    //  alert('Did Update');
    //},
    //
    //componentWillUnmount: function () {
    //  alert('Will Unmount');
    //},

    componentDidMount: function () {
      this.loadCommentsFromServer();
      //alert('Did Mount');
    },

    render: function () {
      return (
        <div className="well">
          <h2 style={{textAlign: 'center'}}>Comment Box</h2>
          <CommentList comments={this.state.comments}></CommentList>
          <CommentForm saveComment={this.handelSaveComment}></CommentForm>
        </div>
      );
    }
  });

  var CommentList = React.createClass({
    render: function () {
      return (
        <div>
          <ul className="list-group">
            {
              this.props.comments.map(function (item) {
                return (<li className="list-group-item"> {item} </li>);
              })
            }
          </ul>
        </div>
      );
    }
  });

  var CommentForm = React.createClass({
    saveComment: function () {
      var $commentForm = $("#commentForm"),
        commentContent = $commentForm.val().trim();

      this.props.saveComment(commentContent);
      $commentForm.val("");
    },

    render: function () {
      return (
        <div>
          <div className="form-group">
            <textarea id="commentForm" rows="5" className="form-control"></textarea>
          </div>
          <div className="form-group text-right">
            <input type="button" className="btn btn-primary" value="Save" onClick={this.saveComment}/>
          </div>
        </div>
      );
    }
  });

  var url = "https://gist.githubusercontent.com/Sen-Zhang/26d2dfea188a450d0cf5/raw/92181c5f3485afe2a7f07a283eceff4ca595eeb5/comments.json";

  React.render(
    // <CommentBox></CommentBox>,
    <CommentBox url={url}></CommentBox>,
    document.getElementById('content')
  );
})(window.React);
