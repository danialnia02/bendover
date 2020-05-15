import React from 'react';

// import Background from './banner.png';
import './Background.css';

const pagebackground = props => {
    return (
        <div className ="container">
            <div className ="background">
                <div className ="aboutbox">
                    <div className ="banner">
                        {/* <img src="./banner.png"/> */}
                    </div>
                    <text> this is the content below banner</text>
                </div>
            </div>
            <div className ="subscribe">
                <div className ="usernamebox">
                    <text>Join us etc etc</text>
                    <form>
                        <label>
                            <input type="text" name="name" />
                        </label>
                        <input type="submit" value="Subscribe" />
                    </form>
                </div>
            </div>
            <div className ="footer">
                <div className ="mediaicons">
                    {/* this is for the images */}
                </div>
                <text>JIBABOOM @ 2020 All Rights Reserved</text>
            </div>
        </div>
      );
}

export default pagebackground;