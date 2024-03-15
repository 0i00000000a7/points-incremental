function hard_reset() {
  player = {
    points: E(10),
    ptgain: E(0),
    d:[null,E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),],
    dbought:[null,E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),],
    dmult:[null,E(1),E(1),E(1),E(1),E(1),E(1),E(1),E(1),],
    dbuymult:[null,E(2),E(2),E(2),E(2),E(2),E(2),E(2),E(2),],
    dcost:[null,E(10),E(1e2),E(1e3),E(1e4),E(1e5),E(1e6),E(1e7),E(1e8),],
    dscal:[null,E(10),E(1e2),E(1e3),E(1e4),E(1e5),E(1e6),E(1e7),E(1e8),],
    scstart:[null,E(2).pow(1024),E('ee6'),E('ee8'),E('ee13'),E('ee21'),E('ee31'),E('ee48'),E('ee58'),],
    scpower:[null,E(1/3),E(1/4),E(1/5),E(1/10),E(1/20),E(1/100),E(1/200),E(1/1000)],
    ovstart:[null,E('ee69'),E('ee279'),E('eee6'),E('eee10')],
    ovpower:[null,E(1/2),E(1/4),E(1/10),E(1/100)],
    silstart:[null,E('eee100'),E('10^^5'),E('10^^10'),('10^^1000'),E('10^^10^10'),E('10^^10^25'),E('10^^10^100')],
    silpower:[null,E(4/5),E(3/4),E(2/3),(1/2),E(1/4),E(1/10),E(1/100)],
    warpstart:[null,E('10^^^3'),E('10^^^10000'),E('10^^^10^10'),E('10^^^10^50'),E('10^^^10^200'),E('10^^^10^1000000')],
    warppower:[null,E(3/4),E(1/2),E(1/10),E(1/100),E(1/1000),E(1/1e6)],
    dboost: E(0),
    dbcost: E(100),
    dbcscal: E(50),
    autobuyall: false,
    canbuymax: false,
    curpage:"page1",
    version:E(2),
    square: {
      points: E(0),
      unl: false,
      willgain: E(0),
      times: E(0),
      best: E(0),
    },
    cube: {
      points: E(0),
      unl: false,
      willgain: E(0),
      times: E(0),
      best: E(0),
      resettime: E(0),
    },
      square_upgrades: [null,false,false,false,false,false,false,false,false,false,false,false,false],
      square_upgcost: [null,E(1),E(1),E(10),E(1000),E(2e5),E(1e6),E('1e2316'),E('1e15405'),E('1e386975'),E('1e417189'),E(Infinity),E(Infinity)],
      chalComp: [null,false,false,false,false],
      chalReq: [null,E(1e155),E('1e75985'),E(Infinity),E(Infinity)],
      curChal: 0,
    isPrimaryGameEnd: false,
    P1_5: {
      points: E(0),
      best: E(0),
      upgrades: [null,false,false,false,false,false,false,false,false,false,false,false,false],
      upg_cost: [null,E('300'),E(2500),E(15000),E(20000),E(5e20),E(Infinity),E(Infinity),E(Infinity),E(Infinity),E(Infinity),E(Infinity),E(Infinity)],
    },
  }
}
function transformToE(object) {
    for (let key in object) {
        if (typeof object[key] === "string" && !new E(object[key]).isNaN()) {
            object[key] = new E(object[key]);
        }
        if (typeof object[key] === "object") {
            transformToE(object[key]);
        }
    }
}

function save() {
	localStorage.setItem("pts-inc", JSON.stringify(player))
	//console.error('检测到您正在作弊，请立即停止该行为!')
	//console.error('检测到您正在作弊，请立即停止该行为!​')
	//console.count('本次保存次数')
}

function load() {
	hard_reset();
	let loadplayer = JSON.parse(localStorage.getItem("pts-inc"));
	if (loadplayer != null) {
		transformToE(loadplayer);
		Object.assign(player, loadplayer)
		console.clear()
	}
}

function hasSqUpg(upg) {
  if (player.square_upgrades[upg]) {
    return true
  } else {
    return false
  }
}
function hasP1_5Upg(upg) {
  if (player.P1_5.upgrades[upg]) {
    return true
  } else {
    return false
  }
}

function reverseString(input) {
    var charArray = input.split('');
    charArray.reverse();
    var reversedString = charArray.join('');
    return reversedString;  
}

function encodeBase64(input) {
    var str = typeof input === 'string' ? input : String(input);
    var encoded = btoa(unescape(encodeURIComponent(str)));
    return encoded;  
} 

function decodeBase64(input) {
    var encoded = typeof input === 'string' ? input : String(input);
    var decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded;  
}  

function export_copy() {
  return navigator.clipboard.writeText(reverseString(encodeBase64(JSON.stringify(player))))
}
function export_file() {
  let str = reverseString(encodeBase64(JSON.stringify(player)))
  let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Points Incremental Save - "+getCurrentBeijingTime()+".txt"
    a.click()
}

function getCurrentBeijingTime() {  
    const now = new Date();  
    const utcYear = now.getUTCFullYear();  
    const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0');  
    const utcDate = String(now.getUTCDate()).padStart(2, '0');  
    const utcHours = now.getUTCHours();  
    const utcMinutes = now.getUTCMinutes();  
    const utcSeconds = now.getUTCSeconds();  
    const utcMilliseconds = now.getUTCMilliseconds();  
    let beijingHours = (utcHours + 8) % 24;
    if (beijingHours < 0) {  
        now.setUTCDate(now.getUTCDate() + 1);
        beijingHours += 24;  
    }  
      
    const beijingTime = `${utcYear}-${utcMonth}-${utcDate} ${beijingHours.toString().padStart(2, '0')}:${utcMinutes.toString().padStart(2, '0')}:${utcSeconds.toString().padStart(2, '0')}.${utcMilliseconds.toString().padStart(3, '0')}`;  
    return beijingTime;  
}

function import_save(save) {
  importing_player = JSON.parse(decodeBase64(reverseString(save)))
  transformToE(importing_player);
  Object.assign(player, importing_player)
  console.clear()
}

function formated_hard_reset() {
  prompt_text = `您确定要硬重置吗？输入以下文字确认，此操作无法取消!：
I am tired of these endless points.`
  let promption = prompt(prompt_text);
  if (promption === "I am tired of these endless points.") {
    hard_reset()
  }
}

setInterval(save, 10)
