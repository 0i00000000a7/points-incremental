function loop() {
  for (let i = 1; i <= 8; i++) {
    player.dcost[i] = player.dscal[i].pow(player.dbought[i].add(1));
  }
  for (let x = 1; x <= 8; x++) {
    player.dmult[x] = player.dbuymult[x].pow(player.dbought[x]);
    if (hasSqUpg(1)) {
      player.dmult[x] = player.dmult[x].mul(player.square.times.add(1))
    }
    if (chalComp(1)) {
      player.dmult[x] = player.dmult[x].mul(player.square.best.add(1))
    }
    if (currentChal(2)) {
      player.dmult[x] = player.dmult[x].pow(0.01)
    }
  }
  calcdim()
  player.ptgain = player.d[1].mul(player.dmult[1])
  player.points = player.points.add(player.d[1].mul(player.dmult[1]).div(30));
  for (let i = 1; i <= 8; i++) {
    player.points = player.points.softcap(player.scstart[i],player.scpower[i])
  }
  for (let i = 1; i <= 4; i++) {
    player.points = player.points.overflow(player.ovstart[i],player.ovpower[i])
  }
  for (let i = 1; i <= 7; i++) {
    player.points = player.points.siltation(player.silstart[i],player.silpower[i])
  }
  for (let i = 1; i <= 6; i++) {
    player.points = player.points.warp(player.warpstart[i],player.warppower[i])
  }
  if (player.points.gte(E(10).expansion(1e19))) {
    player.isPrimaryGameEnd = true
  }
  if (player.isPrimaryGameEnd) {
    player.points = E(10).expansion(1e19)
  }
  for (let x = 1; x <= 8; x++) {
    player.dbuymult[x] = E(2).add(player.dboost.mul(hasSqUpg(5)? 0.22:0.2));
  }
    var base
    if (hasSqUpg(1)) {
      base = E(90).add(player.dbcscal.mul(player.dboost))
    } else {
      base = E(100).add(player.dbcscal.mul(player.dboost))
  }
  if (player.dboost.lt(20)) {
    player.dbcost = base
  } else if (player.dboost.lt(80)) {
    player.dbcost = base.mul(E(1.1).pow(player.dboost.sub(1)))
  } else {
    player.dbcost = base.mul(E(1.1).pow(60)).mul(E(1.5).pow(player.dboost.sub(80)))
  }
  if (player.dboost.gte(3)) {
    player.autobuyall = true
  }
  if (player.dboost.gte(10)) {
    player.canbuymax = true
  }
  if (player.autobuyall) {
    buyall()
  }
  if (hasSqUpg(5)) {
    dimboost()
  }
  getsquareamount()
  //console.error('错误：您正在使用控制台作弊')
  //console.error('错误：您正在使用控制台作弊​')
  if (hasSqUpg(2)) {
    player.scstart[1] = E(2).pow(1024).pow(player.square.best.add(1).log10().add(1).pow(1/2))
  } else {
    player.scstart[1] = E(2).pow(1024)
  }
  if (hasSqUpg(9)) {
    player.scstart[2] = E('ee6').pow(player.square.best.add(1).log10().div(1e4).add(1))
  }
  if (currentChal(1)) {
    player.dboost = E(3)
  }
  if (hasSqUpg(7)) {
    player.scstart[1] = E(Infinity)
    player.square.points = player.square.points.add(player.square.willgain.div(30))
  }
  player.square_upgcost = [null,E(1),E(1),E(10),E(1000),E(2e5),E(1e6),E('1e2316'),E('1e15405'),E('1e386975'),E('1e417189'),E(Infinity),E(Infinity)]
  player.P1_5.upg_cost = [null,E('300'),E(2500),E(15000),E(20000),E(5e20),E(Infinity),E(Infinity),E(Infinity),E(Infinity),E(Infinity),E(Infinity),E(Infinity)],
  player.chalReq = [null,E(1e155),E('1e75985'),E(Infinity),E(Infinity)]
  CompChal()
  if (hasSqUpg(8)) {
    player.square.times = player.square.times.add(1/30)
  }
  if (chalComp(1)) {
    player.dscal = [null,E(10),E(10),E(10),E(10),E(10),E(10),E(10),E(10),]
  }
  if (player.square.best.lt(player.square.points)) {
    player.square.best = player.square.points
  }
  if (hasSqUpg(10)) {
    var P1_5ptgain = E(1).div(30)
    var P1_5_upg1_eff = player.P1_5.points.add(10).log(10)
    if (chalComp(2)) {
      P1_5_upg1_eff = P1_5_upg1_eff.pow(10)
    }
    if (hasP1_5Upg(1)) {
      P1_5ptgain = P1_5ptgain.mul(P1_5_upg1_eff)
    }
    if (hasP1_5Upg(2)) {
      P1_5ptgain = P1_5ptgain.mul(player.square.points.add(10).log(10).div(1e5))
    }
    player.P1_5.points = player.P1_5.points.add(P1_5ptgain)
    player.scstart[2] = player.scstart[2].pow(player.P1_5.best.add(10).max(10).log(10).add(9).max(10).log(10))
  }
  if (player.P1_5.points.gte(player.P1_5.best)) {
    player.P1_5.best = player.P1_5.points
  }
  if (hasP1_5Upg(3)) {
    player.scstart[3] = E('ee8').pow(player.P1_5.best.add(10).max(10).log(10).add(9).max(10).log(10).pow(0.5))
  }
}
function calcdim() {
  if (!currentChal(1)) {
    for (let i = 1; i <= 7; i++) {
    player.d[i] = player.d[i].add(player.d[i+1].mul(player.dmult[i+1]).div(30));
    }
  } else {
    for (let i = 1; i <= 3; i++) {
    player.d[i] = player.d[i].add(player.d[i+1].mul(player.dmult[i+1]).div(30));
    }
  }
}

function buydim(dim) {
  if (player.points.gte(player.dcost[dim])) {
    if (player.canbuymax) {
      player.d[dim] = player.d[dim].add(player.points.log10().div(player.dscal[dim].log10()).floor().mul(10)).sub(player.dbought[dim].mul(10))
      player.dbought[dim] = player.points.log10().div(player.dscal[dim].log10()).floor()
    } else {
    player.dbought[dim] = player.dbought[dim].add(1);
    player.d[dim] = player.d[dim].add(10);
    player.points = player.points.sub(player.dcost[dim]);
      }
    }
}
function buyall() {
  buydim(1)
  buydim(2)
  buydim(3)
  buydim(4)
  buydim(5)
  buydim(6)
  buydim(7)
  buydim(8)
}
function dimboost() {
  if (player.d[8].gte(player.dbcost) && player.dboost.lt(100)) {
    if (!hasSqUpg(4)) {
      player.d = [null,E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),],
      player.dbought = [null,E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),],
      player.dmult = [null,E(1),E(1),E(1),E(1),E(1),E(1),E(1),E(1),],
      player.points = E(10)
      player.dboost = player.dboost.add(1)
    } else {
      player.dboost = player.dboost.add(1)
    }
  }
}
function getsquareamount() {
  player.square.willgain = player.points.root(460).div(10).floor()
}
function square_reset() {
  if (player.points.gte('1e460')) {
    player.d = [null,E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),],
    player.dbought = [null,E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),],
    player.dmult = [null,E(1),E(1),E(1),E(1),E(1),E(1),E(1),E(1),],
    player.points = E(10),
    player.dboost = E(hasP1_5Upg(4) ? 10 : (hasSqUpg(4) ? 2 : (hasSqUpg(3) ? 1 : 0)));
    player.square.points = player.square.points.add(player.square.willgain)
    player.square.unl = true
    player.square.times = player.square.times.add(1)
  }
}
function buy_square_upg(upg) {
  if (player.square.points.gte(player.square_upgcost[upg]) && !player.square_upgrades[upg]) {
    player.square_upgrades[upg] = true
    player.square.points = player.square.points.sub(player.square_upgcost[upg])
  }
}
function buy_P1_5_upg(upg) {
  if (player.P1_5.points.gte(player.P1_5.upg_cost[upg]) && !player.P1_5.upgrades[upg]) {
    player.P1_5.upgrades[upg] = true
    player.P1_5.points = player.P1_5.points.sub(player.P1_5.upg_cost[upg])
  }
}

function enterChal(chal) {
  player.curChal = chal
  square_reset()
}

function currentChal(chal) {
  if (player.curChal == chal) {
    return true
  } else {
    return false
  }
}

function CompChal() {
  if (!currentChal(0)) {
    if (player.points.gte(player.chalReq[player.curChal])) {
      player.chalComp[player.curChal] = true
      enterChal(0)
    }
  }
}

function chalComp(chal) {
  if (player.chalComp[chal]) {
    return true
  } else {
    return false
  }
}

setInterval(loop,1000/30)