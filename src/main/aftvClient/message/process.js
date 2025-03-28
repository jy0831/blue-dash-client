import { SVC } from "../const/svc.js";
import { getColor, getFlags } from "./utils.js";

export function processChat(message) {
  switch (message.serviceCode) {
    case SVC.SVC_CHATMESG:
      return processChatMesg(message);
    case SVC.SVC_SENDBALLOON:
      return processBalloon(message);
  }
}

function processBalloon(data) {
  const bjid = data.packet[0];
  const senderID = data.packet[1];
  const nickname = data.packet[2];
  const giftBalloon = data.packet[3];
  return {
    cmd: "balloon",
    data: {
      bjid,
      senderID,
      nickname,
      giftBalloon,
      // flag1,
      // flag2,
      // trans,
      // localLang: 3,
      // familyNickname: this.chatRoom.familyNickname,
      // familyNicknamePos: this.chatRoom.familyNicknamePos,
      // 직접 추가
      // flags: getFlags(flag1, flag2),
    },
  };
}
function processChatMesg(data) {
  const message = data.packet[0].replace(/\r/gi, "");
  const senderID = data.packet[1];
  const permission = Number(data.packet[3]);
  const chatLang = Number(data.packet[4]);
  const nickname = data.packet[5];
  const flag = data.packet[6];
  const subscriptionMonth =
    data.packet[7] === "-1" ? null : parseInt(data.packet[7]);

  const color = getColor(data.packet[8]);
  
  switch (permission) {
    case 1:
      return { cmd: "staff", data: { message, nickname } };
    case 2:
      return { cmd: "police", data: { message, nickname } };
    case 3:
    case 0:
    default:
      try {
        const [flag1, flag2] = flag.split("|");
        // console.log('paketArray: ',data.packet);
        const result = {
          cmd: "msg",
          data: {
            senderID,
            nickname,
            message,
            // flag1,
            // flag2,
            // trans,
            // localLang: 3,
            chatLang,
            // familyNickname: this.chatRoom.familyNickname,
            // familyNicknamePos: this.chatRoom.familyNicknamePos,
            color,
            subscriptionMonth,

            // 직접 추가
            flags: getFlags(flag1, flag2),
          },
        }
        // console.log('result: ',result);
        
        return result;
      } catch (e) {
        console.log(e);
        return null;
      }
  }
}
