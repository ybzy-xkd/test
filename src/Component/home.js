import React from 'react';
import '../style/home.css'
import {Button,Avatar} from "antd";
import head_img from '../Image/01.jpeg'

function Home(props) {
    return (
        <div className='home_background'>
            <div className='home'>
                <div className='head_img'>
                    <img src={head_img}/>
                </div>
                <div className='robot_name'>
                    <div className='spilt_line'/>
                    <h1>Robot</h1>
                    <div className='spilt_line'/>
                </div>
                <div>
                    <h3 className='introduce'>欢迎来到中控台</h3>
                </div>
                <div>
                    <Button>查看</Button>
                    <Button>下载</Button>
                </div>
            </div>
        </div>
    );
}

export default Home;