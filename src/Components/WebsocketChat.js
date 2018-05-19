import React from 'react'
import { MessageList } from './MessageList'
//import keydown, { Keys } from 'react-keydown'
export class WebsocketChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textValue: "",
            message: [],
            users: [],
            messageReceived: ""
        }
        this.flag = 0;
        this.connection = new window.WebSocketManager.Connection("ws://play-chat-application.herokuapp.com/chat");

        this.connection.connectionMethods.onConnected = () => {
        }
        this.connection.connectionMethods.onDisconnected = () => {
        }
        this.connection.connectionMethods.onOpen=()=>{
        }
        this.connection.start();
        this.handleFormInput = this.handleFormInput.bind(this);
    }

    handleFormInput(e) {
        this.flag++;
        e.preventDefault();
        let self = this;
        let data = this.state.textValue;
        if(data.trim().length > 0 && data !==""){
            self.connection.invoke("SendMessage", this.connection.connectionId, data);
            self.setState({
                textValue:""
            })
        }       
    }

    componentDidMount() {
        let self = this;
        self.connection.clientMethods["pingMessage"] = (socketId, messages) => {
            console.log(messages, "message");
            const message = this.state.message;
            const usersId = this.state.users;
            if(this.connection.connectionId === socketId){
                message.push("me :"+ messages);
            }
            else
            {  
            message.push(socketId + " said : " + messages + "")
            }
            usersId.push(socketId)
            self.setState({
                users: usersId,
                message: message
            })
        }
    }
    onTextChange(evt) {
        let text = evt.target.value;
        this.setState({
            textValue: text
        })
    }

    renderList() {

        let messageText = this.state.message;
        let indes = 1;
        return (
            messageText.map((text, index) => {
                console.log(text, "text", index, "index")
                return (
                    <MessageList key1={++indes} value={text} />
                )
            })
        )
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleFormInput}>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" value={this.state.textValue} placeholder="enter the text" className="form-control" onChange={(evt) => this.onTextChange(evt)} />
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-primary">Send</button>
                            </span>
                        </div>
                        {this.flag >= 0 && <div>{this.renderList()}</div>}
                    </div>
                </form>
            </div>
        )
    }
}