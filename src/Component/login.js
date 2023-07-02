import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {Button, Input,  Checkbox} from "antd";
import '../style/login.css'
import {  message, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import store from "../Redux/store";
import {connect} from "react-redux";

function  Login (props) {
    let navigate = useNavigate()
    let username,password,authentication

    useEffect(()=>{
        authentication = store.getState()['check']
        localStorage.getItem('pass')==='123456'? navigate('/login',{replace:true}): authentication==='true'&&message.error('请登录')

    },[])
    function userName(e){
        username=e.target.value
    }
    function passWord(e) {
        password=e.target.value
    }
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`)
        localStorage.setItem('name',username)
        localStorage.setItem('pass',password)
    }
    function logon() {

        if(username==='管理员'&password==='123456'){
            Storage(username,password)
            navigate('/login',{replace:true})

            return null
        }
        alert('账号或密码错误')
    }

        return (
            <div className='background'>
                <div className='box'>
                    <div className='head'><h2>iGmie SYS</h2></div>
                    <div className='setInput'>
                        <Input
                            className='userName'
                            placeholder="Enter your username"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                            onChange={userName}
                        />
                        <Input.Password className='passWord' placeholder="input password"  onChange={passWord}/>
                        <div className='checkBox'>
                            <Checkbox onChange={onChange}>Remember Me</Checkbox>
                            <span style={{color: 'dodgerblue'}}>忘记密码?</span>
                        </div>
                    </div>
                    <Button onClick={logon} className='login' type="primary">Log In</Button>
                </div>
            </div>

        );

}


export default connect(mapStateToProps)(Login)
function mapStateToProps(state) {
    return {
        check:state.check
    }
}
// function mapDispatchToProps() {
//
// }

function Storage(name,password) {
    localStorage.setItem('name',name)
    localStorage.setItem('pass',password)
    let time = setTimeout(()=>{
        localStorage.clear()
        clearTimeout(time)
    },300000)
}