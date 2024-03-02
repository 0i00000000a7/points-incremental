function updatedisplay() {
  document.getElementById("pts").innerHTML = format(player.points)
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
  document.getElementById(d).innerHTML = format(player.d[dim])
  document.getElementById(dm).innerHTML = format(player.dmult[dim])
  document.getElementById(dbtn).innerHTML = "价格："+format(player.dcost[dim])
}
setInterval(updatedisplay,10)