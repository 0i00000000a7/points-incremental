function updatedisplay() {
  document.getElementById("pts").innerHTML = format(player.points)
  document.getElementById("square_display").innerHTML = "你有 " + formatWhole(player.square.points) + " 点数<sup>2</sup>"
  document.getElementById("dimboost").innerHTML = "重置之前的所有东西，但每次购买维度的乘数+"+getDimboostEffect()+"<br>"+getdimboostreward()+"价格："+formatWhole(player.dbcost)+" 维度8"
  if (player.dboost.lt(20)) {
    document.getElementById("dbtimes").innerHTML = "维度提升("+formatWhole(player.dboost)+")"
  } else {
    document.getElementById("dbtimes").innerHTML = "超级折算|维度提升("+formatWhole(player.dboost)+")"
  }
  document.getElementById("square_reset").innerHTML = "进行一次点数<sup>2</sup>重置，并获得 "+format(player.square.willgain)+" 点数<sup>2</sup><br>要求：1.000e460"
  document.getElementById("softcap1").innerHTML = "超过 "+format(player.scstart[1])+" 点数后，点数获取速度将被软上限限制!"
  if (player.canbuymax) {
    document.getElementById("buymax").innerHTML = "全部最大"
  }
  formatdim(1)
  formatdim(2)
  formatdim(3)
  formatdim(4)
  formatdim(5)
  formatdim(6)
  formatdim(7)
  formatdim(8)
  format_square_upgrades(1)
  format_square_upgrades(2)
  format_square_upgrades(3)
  format_square_upgrades(4)
  format_square_upgrades(5)
  format_square_upgrades(6)
  if (player.curpage  != "page1") {
    document.getElementById("page1").style.display = 'none'
  } else {
    document.getElementById("page1").style.display = 'block'
  }
  if (player.curpage  != "page2") {
    document.getElementById("page2").style.display = 'none'
  } else {
    document.getElementById("page2").style.display = 'block'
  }
  if (player.points.lt(player.scstart[1])) {
    document.getElementById("softcap1").style.display = 'none'
  } else {
    document.getElementById("softcap1").style.display = 'block'
  }
  if (player.points.lt(player.scstart[2])) {
    document.getElementById("softcap2").style.display = 'none'
  } else {
    document.getElementById("softcap2").style.display = 'inline-block'
  }
    document.getElementById("impossible_softcap").style.display = 'none'
    if (player.square.unl) {
      document.getElementById('square_layer').style.display = 'inline-block'
    } else {
      document.getElementById('square_layer').style.display = 'none'
    }
}
function formatdim(dim) {
  const d = "d"+dim
  const dm = "dm"+dim
  const dbtn = "dbtn"+dim
  document.getElementById(d).innerHTML = formatWhole(player.d[dim])
  document.getElementById(dm).innerHTML = format(player.dmult[dim])
  document.getElementById(dbtn).innerHTML = "价格："+formatWhole(player.dcost[dim])
}
function switchpage(page) {
  player.curpage = "page" + page
}
function getdimboostreward() {
  if (player.dboost.lt(3)) {
    return "在维度提升3，自动全部购买维度(永久保留)<br>"
  } else if (player.dboost.lt(10)){
    return "在维度提升10，购买一个变为购买最大，购买维度不再消耗点数，此效果永久保留<br>"
  } else {
    return ""
  }
}
function format_square_upgrades (upg) {
  const upgname = "sq_upg"+upg
  if (hasSqUpg(upg)) {
    document.getElementById(upgname).className="upg_bought"
  } else {
    document.getElementById(upgname).className="upg"
  }
}

function getDimboostEffect() {
  if (hasSqUpg(6)) {
    return "0.22"
  } else {
    return "0.2"
  }
}
setInterval(updatedisplay,10)