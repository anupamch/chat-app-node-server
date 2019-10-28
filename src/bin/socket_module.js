module.exports=function(server,db,app){
	
	    var io = require('socket.io')(server);
		var users = {}
	     io.sockets.on('connection', function(socket){
			 
			   
			  socket.on('disconnect_logout', function (data) {
					
					var key = null;
					for (var k in users){
					  if (users[k] === socket.id){
						key = k;
						break;
					  }
					}
					
					delete users[key];
					io.sockets.emit('onlineusers',{users:users})
				  });
		      socket.on('join', function (data) {
					
					users[data.socket_user_id]=socket.id 
					io.sockets.emit('onlineusers',{users:users})
				  });
				  
			    socket.on('newMessage', function(data){
					//console.log(users[data.to])
					io.to(users[data.to]).emit('newMessage', {msg: data.msg,from:data.from});
				  });
				socket.on('userWritingEvent', function(data){
					//console.log(users[data.to])
					socket.to(users[data.to]).emit('userWritingEvent', {msg: data.msg,from:data.from});
				  });  
				socket.on('getOnlineUsers',function(data){
					    
					    io.sockets.emit('onlineusers',{users:users})
						//console.log(users)
					})  	  
				  
		});
		
		
		
		
		
		
	
	}