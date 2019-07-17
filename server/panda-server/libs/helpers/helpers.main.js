const crypto = require('crypto');


exports.uniqueId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 9)


exports.hash = async string =>
	new Promise((resolve, reject) =>
    	crypto.pbkdf2(string, 'D3GS-FH59-XY393foi', 100000, 64, 'sha512', 
    		(err, hash) =>
	    		! err
				? resolve(hash.toString('hex'))
				: reject(err)
    	)
	)