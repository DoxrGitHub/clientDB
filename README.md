# clientDB

An EXTREMELY simple, easy to use Key-Value database for the frontend.

> clientDB uses localStorage to store info. While this will persist after page loads (obviously), clearing browser data will delete the database. All methods are promises.

## Initialization
Simply link the script in your site, and that's about it for setup.

```html
<script src="https://cdn.jsdelivr.net/gh/DoxrGitHub/clientDB@main/client.min.js"></script>
```

## Quick Docs

Initialize:
```js
const client = new Client()
```

Set a key to a value:

```js
client.set("key", "value")
```

Get a key's value:
```js
client.get("key").then(value => {
  // returns a value
})
```

Delete a key:
```js
client.delete("key")
```

List all keys:
```js
client.list().then(keys => {
  // returns an array with all keys
})
```

List keys with a prefix:
```js
client.list("prefix").then(matches => {
  // returns an array with matched keys with a prefix
})
```

## Quick Start

**Simple Key-Value usage:**

```js
const client = new Client();
client.set('exampleKey', 'exampleValue'); // sets the value "exampleValue" to a key, "exampleKey"
client.get('exampleKey').then(value => { // grabs the value for "exampleKey"
  console.log(value); // logs "exampleValue"
})
client.delete('exampleKey') // deletes the key
```

**(Very) Simple Key-List usage:**

> It's possible store a JSON object this way under a key.

```js
const client = new Client();
let bannedUsers = []; // assuming theres only one list. please do this differently if there are many lists since this is very inefficient, get the list straight from the database instead of from a variable array as seen in this example

async function fetchBannedUsers() {
  bannedUsers = await client.get("banned-users") || [];
  // gets the banned users from the key banned-users and stores them to the array
}

async function saveBannedUsers() {
  await client.set("banned-users", bannedUsers);
  // adds the array to the key banned-users
}

async function banUser(userId) {
  if (!bannedUsers.includes(userId)) bannedUsers.push(userId);
  await saveBannedUsers();
  // pushes the banned user to the array, where the array is then stored under the banned-users key
}

fetchBannedUsers().then(() => { // initalize and make sure that banned users are loaded
  banUser("u9348509438548")
  banUser("a4580934584095") // example usage of how one would ban a user
  if (bannedUsers.includes("a4580934584095")) {
    console.log("a4580934584095 is banned");
  }
})
```

###### Note: it's a bad idea to store restrictions like banned users in localDB since the user can easily modify localStorage themselves to remove the restriction.

**Simple Prefix List Usage**

```js
const client = new Client();
client.set('exampleKey', 'exampleValue');
client.set('exampleKey2', 'exampleValue2');
client.set('prefixKey', 'prefixValue');

client.list().then(keys => console.log(keys)); // logs ['exampleKey', 'exampleKey2', 'prefixKey']
client.list('pre').then(matches => console.log(matches)); // logs ['prefixKey']
```

## creds

- doxr: script development

clientDB was inspired by Replit's database tool.
