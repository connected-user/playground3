import React from 'react';

class SubmitCommentForm extends React.Component{

	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id,username) {

		var text = $('#commentSubmitForm').val();

		$('#commentSubmitForm').val("");

		var comment = {
			id : id.feedItemId,
			submittedDate : Date.now(),
			text : text,
			user : {
				avatarUrl:null,
	  			city : "Fredericton",
	  			country : "Canada",
	  			displayName : username,
	  			stateProvince : "NB"
	  		}
		}

		this.props.onCommentSubmit(comment);
	}

	render(){        
		var {feedItemId,username} = this.props;

		return(
			<div className="photo-comment-submit">

    			<span id="commentSubmitLabel">
    				Write a comment:
    			</span>

   				<textarea  rows="3" id="commentSubmitForm"></textarea>

   				<button 
   				 onClick={() => { this.handleClick({feedItemId},"dylantest") }}
                 id="commentSubmitButton"
                 type="submit">
                    submit
                </button>

			</div>
		);
	}
}

export default SubmitCommentForm;