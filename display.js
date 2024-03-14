function updatedisplay() {
  document.getElementById("pts").innerHTML = format(player.points)
  document.getElementById("square_display").innerHTML = "你有 " + formatWhole(player.square.points) + " 点数<sup>2</sup>"
  document.getElementById("dimboost").innerHTML = "重置之前的所有东西，但每次购买维度的乘数+"+getDimboostEffect()+"<br>"+getdimboostreward()+"价格："+getDimboostCost()+" 维度8"
  if (player.dboost.lt(20)) {
    document.getElementById("dbtimes").innerHTML = "维度提升("+formatWhole(player.dboost)+")"
  } else if (player.dboost.lt(80)){
    document.getElementById("dbtimes").innerHTML = "超级折算|维度提升("+formatWhole(player.dboost)+")"
  } else if (player.dboost.lt(100)){
    document.getElementById("dbtimes").innerHTML = "究极折算|维度提升("+formatWhole(player.dboost)+")"
  } else {
    document.getElementById("dbtimes").innerHTML = "硬上限|维度提升("+formatWhole(player.dboost)+")"
  }
  document.getElementById("square_reset").innerHTML = "进行一次点数<sup>2</sup>重置，并获得 "+format(player.square.willgain)+" 点数<sup>2</sup><br>要求：1.000e460"
  document.getElementById("softcap1").innerHTML = "超过 "+format(player.scstart[1])+" 每秒点数后，点数获取速度将被软上限限制!"
  document.getElementById("softcap2").innerHTML = "超过 "+format(player.scstart[2])+" 每秒点数后，点数获取速度将被二重软上限限制!"
  document.getElementById("softcap3").innerHTML = "超过 "+format(player.scstart[3])+" 每秒点数后，点数获取速度将被三重软上限限制!"
  document.getElementById("p1_5-eff-display").innerHTML = "你有 "+format(player.P1_5.points)+" 点数<sup>1.5</sup>，二重软上限被延缓到^"+format(player.P1_5.best.add(10).max(10).log(10).add(9).max(10).log(10),4)
  if (player.canbuymax) {
    document.getElementById("buymax").innerHTML = "全部最大"
  }
  for (let i = 1; i <= 8; i++) {
    formatdim(i)
  }
  for (let i = 1; i <= 10; i++) {
    format_square_upgrades(i)
  }
  for (let i = 1; i <= 4; i++) {
    format_P1_5_upgrades(i)
  }
  format_chal(1)
  format_chal(2)
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
  if (player.curpage  != "page3") {
    document.getElementById("page3").style.display = 'none'
  } else {
    document.getElementById("page3").style.display = 'block'
  }
  if (player.curpage  != "page4") {
    document.getElementById("page4").style.display = 'none'
  } else {
    document.getElementById("page4").style.display = 'block'
  }
  if (player.ptgain.lt(player.scstart[1])) {
    document.getElementById("softcap1").style.display = 'none'
  } else {
    document.getElementById("softcap1").style.display = 'block'
  }
  if (player.ptgain.lt(player.scstart[2])) {
    document.getElementById("softcap2").style.display = 'none'
  } else {
    document.getElementById("softcap2").style.display = 'inline-block'
  }
  if (player.ptgain.lt(player.scstart[3])) {
    document.getElementById("softcap3").style.display = 'none'
  } else {
    document.getElementById("softcap3").style.display = 'inline-block'
  }
    document.getElementById("impossible_softcap").style.display = 'none'
    if (player.square.unl) {
      document.getElementById('square_layer').style.display = 'inline-block'
    } else {
      document.getElementById('square_layer').style.display = 'none'
    }
    if (player.square.unl) {
      document.getElementById('square_display').style.display = 'block'
    } else {
      document.getElementById('square_display').style.display = 'none'
    }
    if (hasSqUpg(8)) {
      document.getElementById('chal').style.display = 'inline-block'
    } else {
      document.getElementById('chal').style.display = 'none'
    }
    if (hasSqUpg(10)) {
      document.getElementById('point^1.5-p4').style.display = 'inline-block'
      document.getElementById('point^1.5').style.display = 'inline-block'
    } else {
      document.getElementById('point^1.5').style.display = 'none'
      document.getElementById('point^1.5-p4').style.display = 'none'
    }
    document.title = "点数增量：你有 "+format(player.points)+" 点数"
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
function format_P1_5_upgrades (upg) {
  const upgname = "p1.5_upg"+upg
  if (hasP1_5Upg(upg)) {
    document.getElementById(upgname).className="P1_5_upg_bought"
  } else {
    document.getElementById(upgname).className="P1_5_upg"
  }
}
function format_big_square_upgrades (upg) {
  const upgname = "sq_upg"+upg
  if (hasSqUpg(upg)) {
    document.getElementById(upgname).className="big_upg_bought"
  } else {
    document.getElementById(upgname).className="big_upg"
  }
}

function getDimboostEffect() {
  if (hasSqUpg(6)) {
    return "0.22"
  } else {
    return "0.2"
  }
}
function format_chal(chal) {
  const chalname = "chal"+chal
  const comp = "chalcomp"+chal
  if (currentChal(chal)){
    document.getElementById(chalname).className="inchal"
    document.getElementById(comp).innerHTML = "进行中"
  } else if (chalComp(chal)) {
    document.getElementById(chalname).className="chalcomp"
    document.getElementById(comp).innerHTML = "已完成"
  } else {
    document.getElementById(chalname).className="chal"
    document.getElementById(comp).innerHTML = "未完成"
  }
}

function getDimboostCost() {
  if (player.dboost.lt(100)) {
    return formatWhole(player.dbcost)
  } else {
    return `Rayo(10<sup>100</sup>)`
  }
}

setInterval(updatedisplay,10)
我认为是log(max(10,log(max(n+10,10))+9))