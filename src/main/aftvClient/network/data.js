export async function getLoginData() {
  const response = await fetch(
    "https://login.afreecatv.com/app/LoginAction.php",
    {
      method: "POST",
      // body: "szUid=id&szPassword=password&szWork=login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const cookieString = response.headers.get("set-cookie");
  const PdboxTicket = /PdboxTicket=(.*?);/.exec(cookieString)[1];

  return { PdboxTicket };
}

export async function getPlayerData(BJID, cookieString) {
  const playerResponse = await fetch(
    `https://live.afreecatv.com/afreeca/player_live_api.php?bjid=${BJID}`,
    {
      method: "POST",
      headers: {
        Cookie: cookieString,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `bid=${BJID}&type=live&player_type=html5`,
    }
  );
  
  const data = await playerResponse.json();
  console.log(playerResponse);
  
  const CHDOMAIN = data["CHANNEL"]["CHDOMAIN"];
  const CHATNO = data["CHANNEL"]["CHATNO"];
  const FTK = data["CHANNEL"]["FTK"];
  // +=1 if wss
  const CHPT = parseInt(data["CHANNEL"]["CHPT"]) + 1;
  console.log('#####',CHDOMAIN, CHPT);

  return { CHDOMAIN, CHATNO, FTK, CHPT };
}

export async function getLiveData(STREAMER_UID) {
  const response = await fetch(
    `https://chapi.sooplive.co.kr/api/${STREAMER_UID}/station`,
    {
      method: "GET",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      }
    }
  );
  const liveData = await response.json();
  return liveData;
  
}
