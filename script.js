function loop() {
  for (let i = 1; i <= 8; i++) {
    player.dcost[i] = player.dscal[i].pow(player.dbought[i].add(1));
  }
  for (let x = 1; x <= 8; x++) {
    player.dmult[x] = player.dbuymult[x].pow(player.dbought[x]);
    if (hasSqUpg(1)) {
      player.dmult[x] = player.dmult[x].mul(player.square.times.add(1))
    }
  }
  calcdim()
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
  if (player.dboost.gte(20)) {
    var base
    if (hasSqUpg(1)) {
      base = E(90).add(player.dbcscal.mul(player.dboost))
    } else {
      base = E(100).add(player.dbcscal.mul(player.dboost))
  }
  player.dbcost = base.mul(E(1.1).pow(player.dboost.sub(20)))
} else {
    if (hasSqUpg(1)) {
    player.dbcost = E(90).add(player.dbcscal.mul(player.dboost))
    } else {
  player.dbcost = E(100).add(player.dbcscal.mul(player.dboost))
  }
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
  //console.log('已成功完成1/30秒的计算!')
  //console.log('已成功完成1/30秒的计算​!')
  if (hasSqUpg(2)) {
    player.scstart[1] = E(2).pow(1024).pow(player.square.points.add(1).log10().add(1).pow(1/2))
  }
  player.square_upgcost = [null,E(1),E(1),E(10),E(1000),E(2e5),E(1e6),E(Infinity),E(Infinity),E(Infinity),E(Infinity),E(Infinity),E(Infinity)]
}
function calcdim() {
  for (let i = 1; i <= 7; i++) {
    player.d[i] = player.d[i].add(player.d[i+1].mul(player.dmult[i+1]).div(30));
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
  if (player.d[8].gte(player.dbcost)) {
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
    player.dboost = E(hasSqUpg(4) ? 2 : (hasSqUpg(3) ? 1 : 0));
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


setInterval(loop,1000/30)