import React from "react";
import logo from "./logo.svg";
import "./App.css";

function notifyMe() {
  console.log(Notification.permission);
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

function sendMessage() {
  if (!("Notification" in window)) {
    alert("このブラウザはプッシュ通知に対応してません。。。");
    return;
  }
  console.log(Notification.permission);
  if (Notification.permission === "granted") {
    console.log("a");
    navigator.serviceWorker.ready.then((registration: any) => {
      console.log("b");
      registration.active.postMessage("hello!!!");
      console.log("c");
    });
  } else {
    alert("通知の許可がもらえませんよ");
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div onClick={notifyMe}>通知許可</div>
        <div onClick={sendMessage}>通知送信</div>
      </header>
    </div>
  );
}

export default App;
