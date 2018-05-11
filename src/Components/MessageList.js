import React from 'react'

export class MessageList extends React.Component{

    render(){
        console.log(this.props.value);
        return(
            <div>
            <label key={this.props.key1}>{this.props.value}</label>
            </div>
        )
        
    }
}