import React, {useState, useMemo, useEffect,} from 'react';
import '../style/websocket.css'
import {Button, Image} from "antd";
import io from 'socket.io-client'
import video from '../Image/01.jpeg'
import {connect} from "react-redux";



export default function Websocket() {
    let [state,setState] = useState(false)
    let [Temperatrue,setTemperature] = useState(['',''])
    let [distance,setDistance] = useState(0)
    let key_obj = {
        key_W:'w',
        key_A:'a',
        key_D:'d',
        key_S:'s',
        key_Stop:" "
    }
    const socket = useMemo(() => {
        // http://localhost:4000 对应的是服务器地址

        return io('http://172.20.10.10:5201');
    }, [])
    useEffect(() => {
        let monitor = document.getElementsByClassName('monitor')[0]

        socket.on('myevent',  (e) => {

            let value = arrayBufferToBase64(e)
            let img = document.createElement('img')
            img.src='data:image/jpg;base64,'+value
            img.style.width='400px'
            img.style.height='400px'
             document.body.appendChild(img)
            let timer = setTimeout(()=>{
                monitor.src='http://172.20.10.10:8081'
                clearTimeout(timer)
            },500)

        });

        socket.on('give_Temperature',(e)=>{
            setTemperature([...e])
        })
        socket.on('give_Central',(e)=>{
            setDistance(e)
        })
        //按键按下改变背景色
        document.addEventListener('keydown',(e)=>{
            for(let i in key_obj){
                if(e.key==key_obj[i]){
                   let btn = document.querySelector(`.${i}`)
                    btn.style.background='#1B73E8'
                    socket.emit('drive_direction',e.key)
                }
            }
        },false)
        document.addEventListener('keyup',(e)=>{
            for(let i in key_obj){
                if(e.key==key_obj[i]){
                    let btn = document.querySelector(`.${i}`)
                    btn.style.background=' rgba(0,0,0,0)'
                }
            }

        },false)


    }, [])



    function arrayBufferToBase64( buffer ) {

        let binary = '';
        let bytes = new Uint8Array( buffer );
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
    function get_Temperature() {
        socket.emit('get_Temperature','1')
    }
    function get_Central() {
        socket.emit('get_Central','1')
    }
    function onMonitor() {
        setState(true)

    }
    function handle(){
        socket.emit('give_message','6666')
    }

    return(
        <div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div className='direction'>
                    <button className='key key_W'>W</button>
                    <div className='key_AD'>
                        <button className='key key_A'>A</button>
                        <button className='key key_D'>D</button>
                    </div>
                    <button className='key key_S'>S</button>
                    <div>
                        <button className='key_Stop'>Stop</button>
                    </div>
                </div>
                <div className='Temperature' style={{marginTop:'20px'}}>
                    <Button onClick={get_Temperature}>获取温度和湿度</Button>
                    <span><h3>温度:{Temperatrue[0]}C</h3></span>
                    <span><h3>湿度:{Temperatrue[1]}%</h3></span>
                </div>
                <div className='Central_control' style={{marginTop:'20px'}}>
                    <Button onClick={get_Central}>开启超声波传感器</Button>
                    <span><h3>距离:{distance}cm</h3></span>
                </div>
            </div>

            <div className='video'>
                <div className='video_img'>
                    {state?<iframe className='monitor' src='http://172.20.10.10:8081'/>: <img src={video} alt="🧽" />}
                </div>
                <div className='video_btn'>
                    <Button onClick={onMonitor} >Click Me!</Button>
                    <Button onClick={handle}>click</Button>
                </div>
            </div>

         </div>
    )}

