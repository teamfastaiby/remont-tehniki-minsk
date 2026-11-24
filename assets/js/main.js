/* Игнатюк А.М. — ремонт шестерен КПП */
(function () {
  "use strict";
  var PHONE = "+375 (33) 325-11-70";
  var WA = PHONE ? "https://wa.me/" + PHONE.replace(/\D/g, "") : "";

  var burger = document.getElementById("burger"), drawer = document.getElementById("drawer"), dclose = document.getElementById("drawerClose");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.setAttribute("data-open", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setDrawer(true); });
  if (dclose) dclose.addEventListener("click", function () { setDrawer(false); });
  if (drawer) drawer.addEventListener("click", function (e) { if (e.target === drawer) setDrawer(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });

  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__i");
      var open = item.getAttribute("data-open") === "true";
      item.parentElement.querySelectorAll('.faq__i[data-open="true"]').forEach(function (o) { if (o !== item) o.setAttribute("data-open", "false"); });
      item.setAttribute("data-open", open ? "false" : "true");
      q.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    if (!PHONE) { a.setAttribute("href", "#zayavka"); }
  });

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
      var lines = ["Заявка в ремонт техники:"];
      var pairs = [["f-name", "Имя"], ["f-phone", "Телефон"], ["f-what", "Что чистить"], ["f-where", "Адрес / район"], ["f-when", "Когда"], ["f-msg", "Комментарий"]];
      pairs.forEach(function (p) { var v = val(p[0]); if (v) lines.push(p[1] + ": " + v); });
      if (!val("f-what")) lines.push("Что чистить: уточню в переписке");
      lines.push("Прошу рассчитать стоимость химчистки.");
      var text = lines.join("\n");
      var out = form.querySelector(".formout");
      if (WA) { window.open(WA + "?text=" + encodeURIComponent(text), "_blank", "noopener"); if (out) { out.textContent = "Открыли WhatsApp с готовой заявкой — останется нажать «Отправить»."; out.setAttribute("data-show", "true"); } return; }
      var done = function () {
        if (!out) return;
        out.textContent = "Заявка собрана: " + text.replace(/\n/g, " · ") + ". Скопируйте и отправьте её в сообщения — отвечу и посчитаю стоимость.";
        out.setAttribute("data-show", "true");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, done); } else { done(); }
      form.reset();
    });
  });
})();
