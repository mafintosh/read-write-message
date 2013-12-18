exports.read = function(stream, callback) {
	var len = 4;
	var hasLength = false;

	var readable = function() {
		var b = stream.read(len);
		if (!b) return;

		if (!hasLength) {
			len = b.readUInt32LE(0);
			hasLength = true;
			b = stream.read(len);
			if (!b) return;
		}

		stream.removeListener('readable', readable);

		try {
			b = JSON.parse(b.toString());
		} catch (err) {
			return callback(null);
		}

		callback(b);
	};

	stream.on('readable', readable);
	readable();
};

exports.write = function(stream, head) {
	var str = JSON.stringify(head);
	var len = Buffer.byteLength(str);
	var buf = new Buffer(4+len);
	buf.writeUInt32LE(len, 0);
	buf.write(str, 4);
	stream.write(buf);
};