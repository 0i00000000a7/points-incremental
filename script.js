function loop() {
  for (let i = 1; i <= 8; i++) {
    player.dcost[i] = player.dscal[i].pow(player.dbought[i].add(1));
  }
  for (let x = 1; x <= 8; x++) {
    player.dmult[x] = player.dbuymult[x].pow(player.dbought[x]);
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
}
function calcdim() {
  for (let i = 1; i <= 7; i++) {
    player.d[i] = player.d[i].add(player.d[i+1].mul(player.dmult[i+1]).div(30));
  }
}

function buydim(dim) {
  if (player.points.gte(player.dcost[dim])) {
    player.dbought[dim] = player.dbought[dim].add(1);
    player.d[dim] = player.d[dim].add(10);
    player.points = player.points.sub(player.dcost[dim]);
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
setInterval(loop,1000/30)