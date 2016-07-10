import React from 'react';
import PhotoTags from '../components/PhotoTags';
import LikeIcon from '../components/LikeIcon';
import RelatedPhotoFeed from '../components/RelatedPhotoFeed';
import { Scrollbars } from 'react-custom-scrollbars';
import PhotoComments from '../components/PhotoComments';
import {SectionsContainer, Header, Section} from 'react-fullpage';

class PhotosDetails extends React.Component {

  constructor(){
    super();
    this.state = {data: { author:{}, comments:{}, stats:{}, photoTags:{} }};
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
  }

  getFeedItemId(){
  	var pathString = this.props.location.pathname;
  	var identifierPosition = pathString.lastIndexOf("/");
  	identifierPosition++;
  	var feedItemId = pathString.slice(identifierPosition);

  	return feedItemId;
  }

  componentDidMount(){
    var feedItemId = this.getFeedItemId();
    var target = "https://risedevapi1.herokuapp.com/feed/" + feedItemId;

  	fetch(target)
          .then((response) => response.json())
          .then((data) => {
           this.setState({data: data});
          })
          .catch((error) => console.warn(error));
  }
  
  reloadCommentsFromServer(xhr,that){

    return  function(){

      if (xhr.readyState == 4) {

        if (xhr.status == 201) {

          var newState = Object.assign({}, that.state.data);
          var feedItemId = that.getFeedItemId();
          var url = "https://risedevapi1.herokuapp.com/feed/"+feedItemId+"/comments";

           fetch(url)
                  .then((response) => response.json())
                  .then((data) => {
                   newState.comments = data.content;
                   that.setState({ data : newState });
                  })
                  .catch((error) => console.warn(error)); 
        }
      } 
    }
  }

  reloadCommentsFromEdit(xhr,that,commentReactComponent){

    return  function(){
      
      if (xhr.readyState == 4) {

        if (xhr.status == 200) {

          var newState = Object.assign({}, that.state.data);
          var feedItemId = that.getFeedItemId();
          var url = "https://risedevapi1.herokuapp.com/feed/"+feedItemId+"/comments";

           fetch(url)
                  .then((response) => response.json())
                  .then((data) => {
                   commentReactComponent.setState({ editable: false });
                   newState.comments = data.content;
                   that.setState({ data: newState });
                  })
                  .catch((error) => console.warn(error)); 
        }
      } 
    }
  }

  handleCommentSubmit(comment){
    var xhr = new XMLHttpRequest();
    var feedItemId = comment.id;
    var url = "https://risedevapi1.herokuapp.com/feed/"+ feedItemId +"/comments";

    var data = {
      "text": comment.text,
      "user": {"username": comment.user.displayName}
    };

    var postData = JSON.stringify(data);

    xhr.open("POST", url, true);
    xhr.onreadystatechange = this.reloadCommentsFromServer(xhr,this);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(postData);    
  }

  handleCommentDelete(commentId,commentIndex){
    var feedItemId = this.getFeedItemId();
    var http = new XMLHttpRequest();
    var url = "https://risedevapi1.herokuapp.com/feed/" + feedItemId + "/comments/" + commentId;
    var oldState = this.state.data;
    var currentComments = this.state.data.comments;
    var newState = Object.assign({}, this.state.data);

    currentComments.splice(commentIndex,1);

    newState.comments = currentComments;
    this.setState({ data : newState });

    http.open("DELETE", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.send();
  }

  handleCommentEdit(comment,commentReactComponent){
    var xhr = new XMLHttpRequest();
    var feedItemId = this.getFeedItemId();
    var url = "https://risedevapi1.herokuapp.com/feed/"+ feedItemId +"/comments/" + comment.id;

    var data = {
      "text": comment.text,
      "user": {"username": comment.user.displayName}
    };

    var putData = JSON.stringify(data);

    xhr.open("PUT", url, true);
    xhr.onreadystatechange = this.reloadCommentsFromEdit(xhr,this,commentReactComponent);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(putData);  
  }

  render(){
  	var leftPhotoStyle = {height:'100%',width: 'auto'};
	  var rightPhotoStyle = {width: '100%'};
    var scrollbarStyle = {width: "100%", height: "41vh",borderTop: "1px dashed #d8d8d8"};
    const photoDetails = this.state.data;
    const feedItemId = this.getFeedItemId();

    var likes = "";
    var coordinatesArray = photoDetails.photoTags;

    if (photoDetails.stats.likeCount > 1 || photoDetails.stats.likeCount == 0) likes = "likes"; else likes = "like";
    
     let options = {
      sectionClassName:     'section',
      scrollBar:            false,
      navigation:           false,
      verticalAlign:        false,
      sectionPaddingTop:    '50px',
      sectionPaddingBottom: '50px',
      arrowNavigation:      true,
      anchors:['photodetails','productType'],
      verticalCentered:false
  };

    return(
        
      <div className="photo-details-wrap">

        <div className="photo-details-left">
          <img style={leftPhotoStyle}
           src={photoDetails.imageUrl}
           id="expanded-image"
           useMap="#photoMap"/>
          <PhotoTags tags={coordinatesArray}/>
        </div>

        <div className="photo-details-right">

          <div className="photo-title">
            {photoDetails.title}
            <div className="photo-likes">
              <div className="likes-number">
                <span className="likes-count">
                  {photoDetails.stats.likeCount}
                </span>
                <span className="likes-word">
                  {likes}
                </span>
              </div>
              <LikeIcon className="photo-details-like fa fa-heart" favoriteData={photoDetails}/>
            </div>
          </div>
        
          <div className="author-details">
          	<div className="author-photo">
          		<img style={rightPhotoStyle} src="http://designgear.in/demo/eve/demo/images/speaker3-140x140.png"/>
          	</div>
          	<div className="author-name">
          		{photoDetails.author.displayName}
          	</div>
          </div>

          <div className="photo-description">
          	{photoDetails.description}
          </div>

          <RelatedPhotoFeed/>

          <Scrollbars 
           style={scrollbarStyle}
           autoHide autoHideTimeout={1000}
           autoHideDuration={200}>
              <div className="comments-container">
          	     <PhotoComments 
                  feedItemId={feedItemId} 
                  comments={this.state.data.comments} 
                  onCommentSubmit={this.handleCommentSubmit}
                  onCommentDelete={this.handleCommentDelete}
                  onCommentEdit={this.handleCommentEdit}
                 />
              </div>
          </Scrollbars>

        </div>
        
      </div>

    );
  }
}

export default PhotosDetails;