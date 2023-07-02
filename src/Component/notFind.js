import React from 'react';
import '../style/notFind.css'
import pic from '../Image/1.jpeg'

function NotFind(props) {
    return (
        <div style={{  background: `url("${pic}") center center / cover no-repeat`}} className='notFind'>

        </div>
    );
}

export default NotFind;