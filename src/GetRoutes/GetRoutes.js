import React, {useEffect, useState} from 'react';
import {NavLink, useLocation, useRoutes , Navigate} from 'react-router-dom'
import Login from "../Component/login";
import Home from "../Component/home";
import Websocket from "../Component/websocket";
import {AliwangwangOutlined, ChromeOutlined,} from '@ant-design/icons';
import { Space } from 'antd';
import './GetRoutes.css'
import NotFind from "../Component/notFind";
import {connect} from "react-redux";
import store from "../Redux/store";

function GetRoutes(props) {
    const location = useLocation();
    let [state,setState] = useState('')
    useEffect(() => {
        setState(location.pathname)
    }, [location.pathname])

    function Waylay({children}) {
        let state  = localStorage.getItem('name')
        if(!state){
            // store.dispatch({type:'authentication'})
            props.set()
        }
        return state === '管理员' ? children : <Navigate to='/'/>
    }
    

    
    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks

       <div>
           {state==='/'?null: <div className='homing'>
                       <NavLink className={({isActive})=> isActive?'active':null} to='/login'><Space><ChromeOutlined /></Space></NavLink>
                       <NavLink className={({isActive})=> isActive?'active':null} to='/home'><Space><AliwangwangOutlined /></Space></NavLink>
                </div>
           }
           {
               useRoutes([{
               path:'/',
               element:<Login/>
           },
               {
                   path:'/login',
                   element:<Waylay><Websocket/></Waylay>,
               },
               {
                   path:'/home',
                   element:<Waylay><Home/></Waylay>
               },
               {
                   path:'*',
                   element:<NotFind/>
               }
           ])
           }
       </div>
    );
}

// function mapStateToProps(state) {
//     return {
//         check:state.check
//     }
// }
let mapDispatchToProps = {
     set(){
         return {
             type:'authentication'
         }
     }
}


export default connect(null,mapDispatchToProps)(GetRoutes);


