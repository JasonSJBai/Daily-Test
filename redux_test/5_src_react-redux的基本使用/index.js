import React from 'react';
import ReactDOM from "react-dom";

import store from './redux/store'
import APP from './APP'

ReactDOM.render(<APP/>,document.getElementById('root'))

//监测redux中状态的改变，当其状态改变时，重新渲染外壳组件
store.subscribe(()=>{
    ReactDOM.render(<APP/>,document.getElementById('root'))
})
