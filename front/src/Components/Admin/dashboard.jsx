import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Token from "../../Functions/token"
import "../../style/admin_dashboard.css"
function AdminDashboard(){
    const navigate = useNavigate()
    const [state,setState] = useState({
        id:"",
        name:"",
    })
    useEffect(()=>{
        if(!Token.isTokenExist()){
            navigate("/")
        }
        if(Token.isTokenExpired()){
            navigate("/")
        }
        const decode = jwtDecode(Token.getToken())
        setState({
            id:decode.id,
            name:decode.name.charAt(0).toUpperCase() + decode.name.slice(1)
        })
    },[navigate])

    return(
        <div className="admin_dashboard_container">
            <h3 className="admin_dashboard_heading">Admin Dashboard</h3>
            <h3 className="admin_dashboard_text">Name : {state.name}</h3>
        </div>
    )
}

export default AdminDashboard;