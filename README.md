## Complete setup for a **basic Express server** and a **React application**


## ✅ 1. Setup Folder Structure

```bash
my-fullstack-app/
├── server/       # Express backend
└── client/       # React frontend
```


## ✅ 2. Express Server (Node.js Backend)

### **Step 1: Create Backend**

```bash
mkdir server && cd server
npm init -y
npm install express cors
```

### **Step 2: Create `index.js`**

```js
// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for frontend
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### **Step 3: Add Start Script in `package.json`**

```json
"scripts": {
  "start": "node index.js"
}
```
---

## Let's break down your Express server code **line by line**

### ✅ **1. Import required packages**

```js
const express = require('express');
const cors = require('cors');
```

* `express`: This is the **Express framework**, used to create a backend web server in Node.js.
* `cors`: Stands for **Cross-Origin Resource Sharing**. It allows your frontend (like React on port 3000) to communicate with your backend (on port 5000), **without security errors** in the browser.



### ✅ **2. Create an Express app**

```js
const app = express();
```

* This line **initializes an Express application**.
* You can now use `app` to define routes, middleware, and settings.



### ✅ **3. Apply middleware**

```js
app.use(cors());
```

* This line **enables CORS** for all incoming requests.
* Without this, your frontend (React) may get **CORS errors** when calling the API.



```js
app.use(express.json());
```

* This middleware **parses incoming JSON request bodies**, like when a POST request sends JSON data.
* Without this, `req.body` would be `undefined`.

Example:

```js
POST /api
Content-Type: application/json

{ "name": "Ezaz" }
```

With `express.json()`, you can now use:

```js
console.log(req.body.name); // "Ezaz"
```



#### ✅ **4. Define a basic route**

```js
app.get('/', (req, res) => {
    res.send('Hello From Express');
});
```

* This defines a **GET endpoint** at `/`.
* When you open `http://localhost:5000/` in your browser, it returns a simple message: `"Hello From Express"`.

Explanation:

* `req`: The **request object** (from the client)
* `res`: The **response object** (used to send data back)
* `res.send(...)`: Sends plain text or HTML back to the client



#### **5. Start the server**

```js
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

* `PORT = 5000`: This is the port your server listens on.
* `app.listen(...)`: Starts the server and makes it ready to accept requests.
* The callback function runs once the server is successfully running, printing the server URL.




## ✅ 3. React App (Frontend)

### **Step 1: Create React App**

Go back to root:

```bash
cd ..
npx create-react-app client
```

Or with Vite:

```bash
npm create vite@latest client -- --template react
cd client
npm install
```

### **Step 2: Modify `App.js` to Call Express API**

```js
// client/src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React + Express App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
```



## ✅ 4. Run Both Servers

### Run Backend:

```bash
cd server
npm start
```

### Run Frontend:

```bash
cd client
npm start
```

---

 


### ✅ ** 1. Import Required Modules **

  ```js
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
```

  * `React`: Needed to write JSX and use React features.
* `useState`: React Hook to store and manage state(here, the message from Express).
* `useEffect`: React Hook to run ** side effects ** (like API calls) after the component renders.

> ✅ You can combine these imports:

```js
import React, { useEffect, useState } from 'react';
```


### ✅ ** 2. Define the Functional Component **

  ```js
const App = () => {
```

  * Defines the main `App` component using an ** arrow function**.
* This component will be rendered as your frontend UI.



### ✅ ** 3. Initialize State **

  ```js
const [message, setMessage] = useState('');
```

  * `message`: Holds the data fetched from the backend.
* `setMessage`: Function to ** update the message **.
* Initial value is an empty string`''`.



### ✅ ** 4. Fetch Data on Component Mount **

  ```js
useEffect(() => {
  fetch('http://localhost:5000/')
    .then((res) => res.text())
    .then((data) => setMessage(data));
}, []);
```

  * `useEffect(...)`: Runs ** once after component mounts ** (because of empty `[]` dependency).
* `fetch('http://localhost:5000/')`: Calls your Express backend.
* `.then((res) => res.text())`: Converts the response from the server into plain text.
* `.then((data) => setMessage(data))`: Updates the `message` state.

If your server sends back`"Hello from Express"`, then`message` will become that.



### ✅ ** 5. Render the UI **

  ```js
return (
  <div style={{ margin: "30px", backgroundColor: "#000" }}>
    <p>{message}</p>
  </div>
)
```

  * `div`: A black background container with 30px margin.
* `{message}`: Displays the message fetched from the backend.

If Express sent "Hello From Express", you’ll see:

```text
Hello From Express
```

  in your browser, with a black background.


### ✅ ** 6. Export the Component **

  ```js
export default App;
```

  * Makes the `App` component available for use in `index.js`(entry point of React).

---

