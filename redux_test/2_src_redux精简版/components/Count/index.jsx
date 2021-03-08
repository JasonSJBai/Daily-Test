import React, { Component } from 'react'
import store from '../../redux/store'

export default class Count extends Component {

    // componentDidMount(){
    //     //检测redux中状态的更新，当更新时就调用render重加载组件，刷新页面
    //     store.subscribe(()=>{
    //         this.setState({})
    //     })
    // }
    //加法
    increment=()=>{
        const {value} = this.selectedNumber
        store.dispatch({type:'increment',data:value*1})
    }

    //减法
    decrement=()=>{
        const {value} = this.selectedNumber
        store.dispatch({type:'decrement',data:value*1})
    }

    //奇数再加
    incrementIfOdd=()=>{
        const {value} = this.selectedNumber
        if(store.getState() % 2 !== 0){
            store.dispatch({type:'increment',data:value*1})
        }
    }

    //异步加
    incrementAsync=()=>{
        const {value} = this.selectedNumber
        setTimeout(()=>{
            store.dispatch({type:'increment',data:value*1})
        },1000)
    }


    render() {
        return (
            <div>
                <h2>当前和为:{store.getState()}</h2>
                <select ref={c => this.selectedNumber = c}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>                   
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
                <button onClick={this.incrementAsync}>异步加</button>
            </div>
        )
    }
}
