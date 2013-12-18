# read-write-message

Read/write a length prefixed JSON message to a stream and send regular binary data afterwards.
Useful for sending stream headers etc.

	npm install read-write-message

## Usage

``` js
var rw = require('read-write-message');
var net = require('net');

net.createServer(function(socket) {
	rw.read(socket, function(header) {
		console.log(header);
		socket.pipe(process.stdout);
	});
}).listen(10000, function() {
	var socket = net.connect(10000);
	rw.write(socket, {hello:'world'});
	socket.write('other stuff as well...');
});
```

The above example will print

```
{hello: 'world'}
other stuff as well...
```

## License

MIT