/**
 * @Description:
 * @Author: bubao
 * @Date: 2024-03-19 15:38:14
 * @LastEditors: bubao
 * @LastEditTime: 2024-03-20 18:18:35
 */
const { Peer } = require("peerjs");
const fetch = require("node-fetch");
const WebSocket = require("ws");
const WebRTC = require("wrtc");
const FileReader = require("filereader");
const readline = require("readline");
const config = require("./config.js");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const polyfills = { fetch, WebSocket, WebRTC, FileReader };

const peer = new Peer({ config, ...polyfills });

peer.on("open", (id) => {
  console.log("My peer ID is: " + id);
  rl.question("Enter peer ID to connect: ", (peerId) => {
    const conn = peer.connect(peerId, { serialization: "json" });
    conn.on("open", () => {
      console.log("Connected to peer");
      rl.prompt();
    });

    conn.on("data", (data) => {
      console.log("Received:", data);
      rl.prompt();
    });

    conn.on("close", (data) => {
      console.log("close:", data);
      peer.destroy();
      rl.close();
      process.exit();
    });
  });
});

peer.on("connection", (conn) => {
  rl.on("line", (input) => {
    console.log("Send:", input);
    conn.send(input);
    rl.prompt();
  });
});

peer.on("error", (err) => {
  console.error("PeerJS error:", err);
});

rl.on("SIGINT", () => {
  peer.destroy();
  rl.close();
  process.exit();
});
