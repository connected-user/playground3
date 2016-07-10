import React from 'react';
import FontAwesomeIcon from '../components/FontAwesomeIcon';
class PhotoTags extends React.Component {
	constructor(){
		super();
	}

	scaleCoordinates(){
		var targetWidth = $('#expanded-image').width();
		var targetHeight = $('#expanded-image').height();

		var percentage = (targetWidth / 1920);

		return percentage;
	}

	componentDidMount(){

	}

	render(){
		var {tags} = this.props;
		var tagList = [];
		var p = this.scaleCoordinates();

	 	if(this.props.tags.length > 0){
	        
	 		var i = 0;
	 		var idstring = "tag" + i;
	    	var tagList = this.props.tags.map(

	            function(tag){ 

	                var x = (tag.topX*p);
	                var y = (tag.topY*p);

	                x = (x + 6);

	                var hotspotStyle = {
	                	position: "absolute",
	                    left: x,
	                    top: y,
	                    fontSize: "27px"
	                }

	            return(

	            	<div id={idstring} className="tooltip tooltip-effect-1" style={hotspotStyle}>
	            		<span className="tooltip-item"><FontAwesomeIcon className="fa fa-question-circle"/></span>
	            		<div className="tooltip-content clearfix">
	            		<div className="tag-image">
	            			<img src="resources/images/insulation.jpg" />
	            		</div>
	            			<div className="tooltip-text">
	            				<div className="tag-title">Natural Insulation</div>
	            				<div className="tag-info">
	            					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
	            				<div className="tag-controls" style={{float:"right"}}>
	            					<button className="tag-learn-more">Learn more...</button>
	            					<FontAwesomeIcon style={{paddingTop:5}}className="fa tag-control fa-newspaper-o"/>
	            					<FontAwesomeIcon className="fa tag-control fa-usd" style={{paddingLeft:"10px",marginRight:5}}/>
	            				</div>
	            				</div>
	            			</div>
	            		</div>
	            	</div>
	        	); i++;
	    		}	
	    	);
		}


		return(
			<map name="photoMap">
				{tagList}
			</map>
		);
	}
}
export default PhotoTags;