import React from 'react'
import Websocket from 'react-websocket';

export class Chat extends React.Component {
//app.js constructorconstructor(props){
    //super(props);
    // fetch("http://localhost:5000/api/values",{
    //   method:'GET',
    //   headers:{
    //     'Content-Type':'application/json'
    //   }
    // }).then(response=>{
    //   if(response.status==200){
    //     console.log("success")
    //   }
    //   else if(response.status==204){
    //     console.log("fal")
    //   }
    // }).catch(error=>console.log(error))
    // var sock = new SockJs('http://localhost:5000/chat');
    // sock.onopen = function() {
    //     console.log('open');
    // };
    // sock.onmessage = function(e) {
    //     console.log('message', e.data);
    // };
    // sock.onclose = function() {
    //     console.log('close');
    // };
    //const socket = ws('http://localhost:5000/chat');
   // socket.open();
    // socket.on('connect', function(){console.log("connect")});
    // socket.on('event', function(data){});
    // socket.on('disconnect', function(){});
   //sock.send('test');
   //sock.close();
  //}

    constructor(props) {
        super(props);
        this.state = {
            textValue: "",
            message: "",
            users: ""
        }
        this.handleFormInput = this.handleFormInput.bind(this);
        this.handleData = this.handleData.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleFormInput(e) {
        e.preventDefault();
        // this.ws = new Websocket('ws://localhost:5000/chat');     
        // setInterval( _ =>{
        //     this.ws.send(this.state.textValue)
        // }, 2000 );
        this.handleOpen(e);
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result.data,"data");
        this.setState({
            //message: data,
            users: result.data
        })
    }

    handleOpen(e){
       debugger;
        let clientId = this.state.users;
        console.log(clientId,"clientId")
        if(clientId!==null && clientId !== "")
        this.refWebSocket.sendMessage(clientId,JSON.stringify("Here's some text that the server is urgently awaiting!")); 
        
    }
    onTextChange(evt) {
        let text = evt.target.value;
        this.setState({
            textValue: text
        })
    }

    // componentDidMount() {
    //     debugger;
    //     const socket = new Websocket('ws://localhost:5000/chat');
    //     socket.connection.onMessage = e => {
    //         this.setState({
    //             users: Object.values(JSON.parse(e.data)),
    //             message: e
    //         })
    //     };
    //     setInterval( _ =>{
    //         socket.send(this.state.textValue)
    //     }, 2000 );
    //   }


    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleFormInput}>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" value={this.state.textValue} placeholder="enter the text" className="form-control" onChange={(evt) => this.onTextChange(evt)} />
                            <span className="input-group-btn">
                                <Websocket url='ws://localhost:5000/chat' onMessage={this.handleData}
                                    onOpen={this.handleOpen} onClose={this.handleClose}
                                    reconnect={true} debug={true}
                                    ref={Websocket => {
                                        this.refWebSocket = Websocket;
                                    }} />

                                <button type="submit" className="btn btn-primary">Send</button>
                            </span>
                        </div>
                        <div>
                            <span>
                                <label text={this.state.message} />
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}