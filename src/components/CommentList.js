import React from 'react';
import Comment from '../components/Comment.js';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class CommentList extends React.Component{
    
    constructor(){
        super();        
    }

    render(){
        var commentList = [];
        
        if(this.props.comments.length > 0){

            var commentList = this.props.comments.map(

                function(comment,currentIndex){

                                    return(
                                        <Comment
                                         avatar={comment.user.avatarUrl} 
                                         key={comment.id} 
                                         text={comment.text}
                                         onCommentEdit={this.props.onCommentEdit}
                                         onCommentDelete={this.props.onCommentDelete}
                                         commentId={comment.id}
                                         commentIndex={currentIndex}
                                         submittedDate={comment.submittedDate}
                                        />
                                    ); 
                }, this
            );
        }
        return(
            <div className="photo-comment-list">
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {commentList}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default CommentList;