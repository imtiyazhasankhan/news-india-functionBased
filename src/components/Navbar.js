import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import Search_icon from "./Search_icon.svg";
import Menu_button from "./Menu_button.svg";

const Navbar = (props) => {

    function defaultUrl(){
        return "/"
    }

    let [searchUrlTo, setSearchUrlTo] = useState(()=> defaultUrl())

    useEffect(() => {
        let searchBox = document.getElementById("searchBox")
        searchBox.onchange = () => {
            let kyaNaamDu = `${document.getElementById("searchBox").value}`
            let removedSpace = kyaNaamDu.replace(/\s/g, '')
            setSearchUrlTo(removedSpace)
        }

        var isClicked = false

        document.getElementById("searchIcon").onclick = () => {
            isClicked = true
            if (window.matchMedia("(max-width: 606px)").matches) {
                console.log("Searchbar open in small device")
                document.getElementById("searchBarContainer").classList.add("SM_SearchBar")
                document.getElementById("searchIcon").style.display = "none"
                document.getElementById("navMenus").style.display = "none"
                document.getElementById("searchBox").style.display = "block"
                document.getElementById("searchButton").style.display = "block"
            }
            else {
                document.getElementById("searchIcon").style.display = "none"
                document.getElementById("navMenus").style.display = "none"
                document.getElementById("searchBox").style.display = "block"
                document.getElementById("searchButton").style.display = "block"
            }
        }

        document.getElementById("searchButton").onclick = () => {
            isClicked = false
        }

        let searchBarForSM = () => {
            if (isClicked && (window.matchMedia("(max-width: 606px)").matches)) {
                document.getElementById("searchBarContainer").classList.add("SM_SearchBar")
            }
            if (window.matchMedia("(min-width: 607px)").matches) {
                document.getElementById("searchBarContainer").classList.remove("SM_SearchBar")
            }
        }
        window.addEventListener('resize', searchBarForSM);
      });
    

    let { title, searchFunction, onChngFncSrchbr } = props

    // ____leftBar_____________
    let leftBar = document.getElementById("leftBar")
    let appName = document.getElementById("nameOfApp")
    let menuButton = document.getElementById("menuButton")

    let openLeftbar = () => {
        if (leftBar !== 'undefined' && leftBar !== null) {
            leftBar.style.visibility = "visible"
            leftBar.style.transform = "translateX(0px)"
            menuButton.style.display = "none"
            appName.style.display = "none"
        }
        else {
            console.log("Error: ", leftBar)
        }
    }

    let closeLeftbar = () => {
        leftBar.style.visibility = "hidden"
        leftBar.style.transform = "translateX(-302px)"
        appName.style.display = "block"
        menuButton.style.display = "block"
    }
    // ________enf of leftbar____________


    return (
        <>
            <div className="navContainer">

                <div className="navbar">
                    <div className="leftDiv">
                        <img src={Menu_button} alt="Search" onClick={openLeftbar} className="menuButton" id='menuButton' />
                        <div className="seprater"></div>
                        <div className="logoNameContainer">
                            <Link id='nameOfApp' to="/">{title}</Link>
                        </div>
                    </div>
                    <div className="rightDiv">
                        <div id='navMenus' className="categoriesContainer">
                            <NavLink className="nav-link" to="technology">Technology</NavLink>
                            <NavLink className="nav-link" to="science">Science</NavLink>
                            <NavLink className="nav-link" to="sports">Sports</NavLink>
                            <NavLink className="nav-link" to="health">Health</NavLink>
                            <NavLink className="nav-link" to="entertainment">Entertainment</NavLink>
                        </div>
                        <div className="seprater"></div>
                        <div id='searchBarContainer' className="searchBarContainer">
                            <img id='searchIcon' src={Search_icon} alt="Search" className="searchIcon" />
                            <input id='searchBox' placeholder='eg: linux, corona, delhi' type="text" onChange={onChngFncSrchbr} />
                            <Link id='searchButton' onClick={searchFunction} to={`${searchUrlTo}`}>Search</Link>
                        </div>
                    </div>
                </div>

            </div>
            {/* __________________leftBar____________ */}
            <div id='leftBar'>
                <Link className='appName' to="/">{title}</Link>
                <div id='closeLeftBar' onClick={closeLeftbar}>x</div>

                <div className='categoriesLeftbar'>
                    <span>Categories</span>
                    <ul>
                        <li><NavLink className="nav-link" to="technology">Technology</NavLink></li>
                        <li><NavLink className="nav-link" to="science">Science</NavLink></li>
                        <li><NavLink className="nav-link" to="sports">Sports</NavLink></li>
                        <li><NavLink className="nav-link" to="health">Health</NavLink></li>
                        <li><NavLink className="nav-link" to="entertainment">Entertainment</NavLink></li>
                    </ul>
                </div>
            </div>
            {/* _______________end___leftBar_______________ */}
        </>
    )

}

export default Navbar
