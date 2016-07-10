import React from 'react';
import CommentList from '../components/CommentList';
import SubmitCommentForm from '../components/SubmitCommentForm';

class PhotoComments extends React.Component {

    constructor(){
        super();        
    }

    render(){
        return (
            <div id="photo-comments-wrapper">
                <CommentList
                 comments={this.props.comments}
                 onCommentEdit={this.props.onCommentEdit}
                 onCommentDelete={this.props.onCommentDelete}
                />
                <SubmitCommentForm
                 feedItemId={this.props.feedItemId}
                 onCommentSubmit={this.props.onCommentSubmit}
                />
            </div>
        );
    }
}

export default PhotoComments;