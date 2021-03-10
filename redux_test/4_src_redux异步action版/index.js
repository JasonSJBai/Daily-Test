import React from 'react';
import ReactDOM from "react-dom";

import store from './redux/store'
import APP from './APP'

ReactDOM.render(<APP/>,document.getElementById('root'))

store.subscribe(()=>{
    ReactDOM.render(<APP/>,document.getElementById('root'))
})
