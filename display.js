function updatedisplay() {
  document.getElementById("pts").innerHTML = format(player.points)
  document.getElementById("dimboost").innerHTML = "重置之前的所有东西，但每次购买维度的乘数+0.2!<br>在第三次，解锁自动全部购买!<br>价格："+formatWhole(player.dbcost)+" 维度8!"
  document.getElementById("dbtimes").innerHTML = "维度提升("+formatWhole(player.dboost)+")"
  formatdim(1)
  formatdim(2)
  formatdim(3)
  formatdim(4)
  formatdim(5)
  formatdim(6)
  formatdim(7)
  formatdim(8)
}
function formatdim(dim) {
  const d = "d"+dim
  const dm = "dm"+dim
  const dbtn = "dbtn"+dim
  document.getElementById(d).innerHTML = formatWhole(player.d[dim])
  document.getElementById(dm).innerHTML = format(player.dmult[dim])
  document.getElementById(dbtn).innerHTML = "价格："+formatWhole(player.dcost[dim])
}
setInterval(updatedisplay,10)