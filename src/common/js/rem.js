!function (n) {
  let e = n.document,
    t = e.documentElement,
    i = 75,
    d = i / 20,
    o = "orientationchange" in n ? "orientationchange" : "resize",
    a = function () {
      let n = t.clientWidth || 375;
      n > 720 && (n = 720);
      t.style.fontSize = n / d + "px"
    };
    e.addEventListener && (n.addEventListener(o, a, !1),
    e.addEventListener("DOMContentLoaded", a, !1))
}(window);
