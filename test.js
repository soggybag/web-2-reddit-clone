// Import some libraries for the the example
const { SHA256 } = require('crypto-js');  // Import Hash
const jwt = require('jsonwebtoken');      // Import JSON Web Token


// ****************************************************************************
// This first example converts data to a hash salts the hash and
// verifies the original data against the hash.

// 1) Define some data to share
// Some data
const data = {
  _id: 'Hello World'
}
// 2) Define a salt - This is a secret value added to the end of a hash.
const salt = 'secret-code';

// 3) Make a token - A token is made of the data and hash+salt
const token = {
data,
  hash: SHA256(JSON.stringify(data) + salt).toString()
}

/*

The data and token are attached to an object which can be passed to a client.
A hash is a one way transformation that will always produce the same output
for the same input. You can NOT reverse a hash to get the original input.

*/

console.log("Token sent to client");
console.log(token);                   // The client receives
console.log("----------------------");

// 4) Define a function to verify a hash with salt
function verify(token) {
  // Hashing the data with salt should produce the same hash value.
  const res = SHA256(JSON.stringify(token.data)+salt).toString();
  if (res === token.hash) {
    // If they match the token is verified
    return "Token verified!";
  }
  // If they do not match there is a problem
  return "Token failed verification";
}

// 5) Verify the token.
console.log(verify(token));

// In the next step try and hack your token.
console.log("--------------------");
console.log("Commences hacking!");
// 6) Change the _id to a different value in an attempt to access restricted data.
token.data._id = "Nefarious activity!";
console.log(verify(token));              // 7) Verify the hacked token.
// You can also try hacking the hash or the data and the hash.






// ****************************************************************************
// Let try that with JWT. Essentially JWT is doing everything above with
// added functionality and features.

// 0000000000000.0000000000000000.0000000000000000

console.log('--------------------------------------');
// Make some new data
const newData = {
  _id: "foo"
}

// Make a JWT token
const jwtToken = jwt.sign(newData, 'secret-sauce');
console.log(jwtToken);

console.log('-----------------------------');
// jwt.verify() throws an error if it fails so try and catch...
try {
  console.log(jwt.verify(jwtToken, 'secret-sauce'));
} catch (err) {
  console.log(err.message);
}

// jwt.sign

// https://en.wikipedia.org/wiki/Cryptographic_hash_function
// http://www.iusmentis.com/technology/hashfunctions/
