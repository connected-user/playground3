import React from 'react';
import FontAwesomeIcon from './FontAwesomeIcon';

class Comment extends React.Component{

    constructor(){
        super();
        this.commentEditSubmit = this.commentEditSubmit.bind(this);
        this.commentDeleteClick = this.commentDeleteClick.bind(this);
        this.commentEditState = this.commentEditState.bind(this);
        this.state = {editable : false};
    }

    commentEditState(){
        this.setState({
            editable : true
        });
    }

    commentEditSubmit(editKey,commentId,username) {
        var editId = "#" + editKey;
        var text = $(editId).val();
        var comment = {
            id : commentId,
            text : text,
            user : {
                avatarUrl : null,
                city : "Fredericton",
                country : "Canada",
                displayName : username,
                stateProvince : "NB"
            }
        }
        this.props.onCommentEdit(comment,this);
    }

    commentDeleteClick(commentId,commentIndex){
        this.props.onCommentDelete(commentId,commentIndex);
    }

    timeSince(date){
        if (typeof date !== 'object') {
            date = new Date(date);
        }

        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;

        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            intervalType = 'year';
        } else {
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                intervalType = 'month';
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    intervalType = 'day';
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                        intervalType = "hour";
                    } else {
                        interval = Math.floor(seconds / 60);
                        if (interval >= 1) {
                            intervalType = "minute";
                        } else {
                            interval = seconds;
                            intervalType = "second";
                        }
                    }
                }
            }
        }
        if (interval > 1 || interval === 0) {
            intervalType += 's';
        }
        return interval + ' ' + intervalType;
    }

    render(){

        var {commentId,commentIndex} = this.props;

        var editTextStyle = {
            border: "1px dashed #ccc",
            padding: "4px",
            backgroundColor:"white",
            height: "35px"
        }

        var editInputStyle = {
            border: 0,
            outline: "none",
            color: "#5d5d5d",
            fontSize: "17px",
            fontWeight: "300",
            fontFamily: "'Yantramanav'",
            width: "232px",
            backgroundColor:"white",
            paddingRight: "5px",
            paddingLeft: "1px"
        }
        
        var date = this.props.submittedDate;

        var myDate = new Date(date);

        var editId = "edit" + this.props.commentId;

        var dateString = this.timeSince(myDate);
    
        return(

            <div className="photo-comment">

                <div className="comment-avatar">
                    <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/p120x120/13221500_10153561898672452_3459637915444863391_n.jpg?oh=f2b592832c49d32ef7c096a6eb565521&oe=57C36FC2" id="profile-pic-missing"/>
                </div>
                
                <div className="comment-arrow2">
                </div>

                <div className="comment-arrow">
                </div>

                <div className="comment-date">
                   {this.props.date}
                </div>

                <div className="comment-content" id={this.props.id}>  
                    
                    <div className="comment-author">
                        Dylan Paul
                    </div>

                    {
                        this.state.editable 
                    ?
                        <div className="comment-text" style={editTextStyle}>
                            <input className="comment-edit-input" id={editId} defaultValue={this.props.text} style={editInputStyle}>  
                            </input>

                            <button
                             className="comment-edit-submit"
                             onClick={() => { this.commentEditSubmit(editId,this.props.commentId,"dylantest")}}> 
                                save
                            </button>
                       </div> 
                    :
                        <div>
                            <div className="comment-text">
                                <span className="comment-date">{dateString}</span>
                                {this.props.text}     
                            </div>

                            <div className="comment-controls">
                                <FontAwesomeIcon
                                 onClick={this.commentEditState}
                                 className="fa fa-pencil comment-control"/>

                                <FontAwesomeIcon
                                 onClick={() => { this.commentDeleteClick(this.props.commentId,this.props.commentIndex)}}
                                 className="fa fa-trash comment-control"/>
                            </div>
                        </div>
                    }
                </div>

            </div>

        );
    }
}

export default Comment;