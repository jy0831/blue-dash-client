import { WebSocket } from "ws";

import { createPacket } from "../packet/create.js";
import { Flag } from "../utils/flag.js";
import { FLAG } from "../const/flag.js";
import { getPlayerData } from "../network/data.js";
import { buildPacketArray } from "../packet/utils.js";
import { SVC } from "../const/svc.js";
import { waitForNextEvent } from "../utils/ws/waitForNextEvent.js";

export class AftvChatClientSession {
  client = null;
  keepAliveTimer = null;

  keepAlivePacket = createPacket(SVC.SVC_KEEPALIVE, buildPacketArray([]));

  createWsClient(CHPT, CHDOMAIN, BJID) {
    const ws = new WebSocket(
      `wss://${CHDOMAIN}:${CHPT}/Websocket/${BJID}`,
      "chat"
    );
    ws.binaryType = "arraybuffer";
    return ws;
  }

  async connect(BJID, credential) {
    const playerResponse = await getPlayerData(BJID);
    
    const ws = this.createWsClient(
      playerResponse.CHPT,
      playerResponse.CHDOMAIN,
      BJID
    );
    this.client = ws;
    console.log('connect1');
    
    await waitForNextEvent(ws, "open");
    console.log('connect11');
    ws.send(this.createLoginPacket());
    await waitForNextEvent(ws, "message");
    console.log('connect111');
    ws.send(this.createJoinChPacket(playerResponse));
    await waitForNextEvent(ws, "message");
    console.log('connect1111');
    this.keepAliveTimer = setInterval(() => {
      ws.send(this.keepAlivePacket);
    }, 60 * 1000);

    return ws;
  }

  createLoginPacket() {
    return createPacket(
      SVC.SVC_LOGIN,
      buildPacketArray([
        // 비로그인 "", 로그인 szTicket
        "",
        // 모르겠음, 항상 ""
        "",
        // 플래그
        new Flag().add(FLAG.GUEST).flag1, // 게스트
        // .add(FLAG.MOBILE_WEB) // 모바일
        // .add(FLAG.QUICKVIEW) // 퀵뷰
        // .add(FLAG.FOLLOWER) // 팔로워
      ])
    );
  }

  createJoinChPacket(playerResponse) {
    return createPacket(
      SVC.SVC_JOINCH,
      buildPacketArray([
        // nChatNo
        playerResponse.CHATNO,
        // szFanTicket
        playerResponse.FTK,
        // 모르겠음, 항상 "0"
        "0",
        // 모르겠음, 항상 ""
        "",
        // getLog() returnvalue
        // uuid 쿠키에서
        "log&set_bps=8000&view_bps=1000&quality=normal&geo_cc=KR&geo_rc=11&acpt_lang=ko_KR&svc_lang=ko_KRpwdauth_infoNULLpver2access_systemhtml5",
      ])
    );
  }
}
