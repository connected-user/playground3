/**
 * Created by Dylan on 16/05/2016.
 */
import React from 'react';

class FontAwesomeIcon extends React.Component {

    render() {
       var { className,id,onClick,style } = this.props;
        return (
          
          
          <i className={className} style={style} id={id} onClick={onClick}></i> 
        );
    }
}

export default FontAwesomeIcon;