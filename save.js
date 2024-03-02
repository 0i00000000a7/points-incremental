
function hard_reset() {
  player = {
    points: E(10),
    d:[null,E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),],
    dbought:[null,E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),],
    dmult:[null,E(1),E(1),E(1),E(1),E(1),E(1),E(1),E(1),],
    dbuymult:[null,E(2),E(2),E(2),E(2),E(2),E(2),E(2),E(2),],
    dcost:[null,E(10),E(1e2),E(1e3),E(1e4),E(1e5),E(1e6),E(1e7),E(1e8),],
    dscal:[null,E(10),E(1e2),E(1e3),E(1e4),E(1e5),E(1e6),E(1e7),E(1e8),],
    scstart:[null,E(1e100),E('ee6'),E('ee8'),E('ee13'),E('ee21'),E('ee31'),E('ee48'),E('ee58'),],
    scpower:[null,E(1/3),E(1/4),E(1/5),E(1/10),E(1/20),E(1/100),E(1/200),E(1/1000)],
    ovstart:[null,E('ee69'),E('ee279'),E('eee6'),E('eee10')],
    ovpower:[null,E(1/2),E(1/4),E(1/10),E(1/100)],
    silstart:[null,E('eee100'),E('10^^5'),E('10^^10'),('10^^1000'),E('10^^10^10'),E('10^^10^25'),E('10^^10^100')],
    silpower:[null,E(4/5),E(3/4),E(2/3),(1/2),E(1/4),E(1/10),E(1/100)],
    warpstart:[null,E('10^^^3'),E('10^^^10000'),E('10^^^10^10'),E('10^^^10^50'),E('10^^^10^200'),E('10^^^10^1000000')],
    warppower:[null,E(3/4),E(1/2),E(1/10),E(1/100),E(1/1000),E(1/1e6)],
    curpage:"page1"
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
	console.count('本次保存次数')
}

setInterval(save, 10)

function load() {
	hard_reset();
	let loadplayer = JSON.parse(localStorage.getItem("pts-inc"));
	if (loadplayer != null) {
		transformToE(loadplayer);
		for (let key in loadplayer) {
			player[key] = loadplayer[key];
			console.clear()
		}
	}
}
