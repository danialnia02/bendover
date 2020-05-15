import React from 'react';

import Background from './vertical-raveimage.png';
import Banner from './banner.png';
import guyfallingover from './guyfallingover.png';
import facebook from './facebook.png';
import instagram from './instagram.png';
import twitter from './twitter.png';
import youtube from './youtube.png';
import './Background.css';

const pagebackground = props => {
    return (
        <div className ="container">
            <div className ="background">
                <img src={Background} />
                <p>ABOUT</p>
                <div className ="aboutbox">
                    {/* <div className ="banner"> */}
                        <img src= {Banner} />
                        <text>
                            Jibaboom is a company made to help event goers have the 
                            best experience they can possibly have by making pools to find out
                            the interest of the event goers and planning the event according to their likings
                        </text>
                    {/* </div> */}
                    {/* <text> this is the content below banner</text>   */}
                </div>
            </div>
            <div className ="subscribe">
                <img src={guyfallingover} />
                <div className ="usernamebox">
                    <text>
                        JOIN OUR MAILING LIST FOR UPCOMING EVENTS,
                        SPECIAL OFFERS AND MORE!
                    </text>
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
                    <img src={facebook} />
                    <img src={instagram} />
                    <img src={twitter} />
                    <img src={youtube} />
                </div>
                <text>JIBABOOM @ 2020 All Rights Reserved</text>
            </div>
        </div>
      );
}

export default pagebackground;