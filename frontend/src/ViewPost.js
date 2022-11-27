import React, { useEffect, useState } from 'react';
import PageTemplate from "./pages/PageTemplate.js"
import FullPostComponent from "./components/FullPostComponent.js"
import { Link } from "react-router-dom";

function ViewPost() {
    const [post, setPost] = useState({});
    const [modDisplay, setModDisplay] = useState("none");
    const [fullDisplay, setFullDisplay] = useState("none");

    useEffect(() => {
            async function reloadData() {
                let data;
        
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const id = urlParams.get('id');
                console.log("here's the ID in the URL: ", id);
        
                try {
                    const res = await fetch(`/getPost?id=${id}`, {
                        method: 'GET'
                    });
                    data = await res.json();
                    console.log("here's the data: ", data);
                } catch (e) {
                    console("error downloading data: ", e);
                    return false;
                }
        
                setPost(data.at(0));

                if (true) {
                    setModDisplay("block");
                }
                
                setFullDisplay("block");

            }
            reloadData();
        }, []
    );

    return (
        <div>
        <div className="container">
            <div className="row d-flex header-row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
                <h1>View Post</h1>
                <Link to="/dashboard">Back</Link>
                {/*<a href="/dashboard">Back</a>*/}
            </div>
            <div className="col-md-3"></div>
            </div>
            <div className="row d-flex">
                <div className="col-md-3"></div>
                <div className="col-md-12">
                    <FullPostComponent 
                        post={post}
                        modDisplay={modDisplay}
                        fullDisplay={fullDisplay}
                         />
                </div>
                <div className="col-md-2"></div>
            </div>
            </div>
            <PageTemplate></PageTemplate>
        </div>
    )
}

export default ViewPost;