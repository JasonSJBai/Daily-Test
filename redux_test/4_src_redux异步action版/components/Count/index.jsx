import React, { Component } from 'react'
//引入store，用于获取redux中保存的状态
import store from '../../redux/store'
//引入actionCreator，专门用于生成Count组件的action对象
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action'


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
        store.dispatch(createIncrementAction(value*1))
    }

    //减法
    decrement=()=>{
        const {value} = this.selectedNumber
        store.dispatch(createDecrementAction(value*1))
    }

    //奇数再加
    incrementIfOdd=()=>{
        const {value} = this.selectedNumber
        if(store.getState() % 2 !== 0){
            store.dispatch(createIncrementAction(value*1))
        }
    }

    //异步加
    
    /*
    incrementAsync=()=>{
        const {value} = this.selectedNumber
        setTimeout(()=>{
            store.dispatch(createIncrementAction(value*1))
        },500)
    }
    */
    incrementAsync=()=>{
        const {value} = this.selectedNumber
        store.dispatch(createIncrementAsyncAction(value*1,500))
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
