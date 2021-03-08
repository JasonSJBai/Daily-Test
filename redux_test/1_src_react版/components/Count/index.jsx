import React, { Component } from 'react'

export default class Count extends Component {

    state={count:0}

    //加法
    increment=()=>{
        const {value} = this.selectedNumber
        const {count} = this.state
        this.setState({count:count+value*1})
    }

    //减法
    decrement=()=>{
        const {value} = this.selectedNumber
        const {count} = this.state
        this.setState({count:count-value*1})
    }

    //奇数再加
    incrementIfOdd=()=>{
        const {value} = this.selectedNumber
        const {count} = this.state
        if(count % 2 !== 0){
        this.setState({count:count+value*1})
        }
    }

    incrementAsync=()=>{
        const {value} = this.selectedNumber
        const {count} = this.state
        setTimeout(()=>{
            this.setState({count:count+value*1})
        },1000)
    }


    render() {
        return (
            <div>
                <h2>当前和为:{this.state.count}</h2>
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
