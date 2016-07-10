import React from 'react';
import FontAwesomeIcon from '../components/FontAwesomeIcon';
import Slider from 'react-slick';

class RelatedPhotoFeed extends React.Component {
  render(){
    var settings = {
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll:1,
      centerMode: false,
      variableWidth: true,
      variableHeight: false,
      arrows:false    
    };

    return(
      <div className="related-photo-feed">
        <span className="related-feed-title"><FontAwesomeIcon className="fa fa-search"/> Related photos: </span>
        <Slider {...settings}>
          <div className="related-photo"><div className="related-photo-info">Related Photo 1</div><img style={{width:370}} src="https://res.cloudinary.com/hdxsexu67/image/upload/c_scale,w_370/v1465476298/Helios_Design_Group_abrom_kitchen1_hfo5dy.jpg"/></div>
          <div className="related-photo"><div className="related-photo-info">Related Photo 2</div><img style={{width:370}} src="https://res.cloudinary.com/hdxsexu67/image/upload/c_scale,w_370/v1465476297/Brandi_Coyle1_zgjpjl.jpg"/></div>
          <div className="related-photo"><div className="related-photo-info">Related Photo 3</div><img style={{width:370}} src="https://res.cloudinary.com/hdxsexu67/image/upload/c_scale,w_370/v1464108177/1_zj8yye.jpg"/></div>
        </Slider>
      </div>
    );
  }
}

export default RelatedPhotoFeed;