/**
 * @Description:
 * @Author: bubao
 * @Date: 2024-03-20 18:18:15
 * @LastEditors: bubao
 * @LastEditTime: 2024-03-20 18:19:42
 */
module.exports = {
  config: {
    iceServers: [
      {
        urls: "turn:123:3478",
        username: "username",
        credential: "credential",
      },
    ],
    sdpSemantics: "unified-plan",
  },
  host: "123",
  secure: false,
  port: 9000,
  path: "/",
  debug: 0,
};
