// โปรเน็ตเสริม.com — minimal JS: เมนูมือถือ, ปุ่ม copy รหัส, filter ตาราง
(function () {
  'use strict';

  // mobile menu: slide panel + backdrop + body scroll lock
  var btn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.mobile-menu');
  var backdrop = document.querySelector('.menu-backdrop');
  var closeBtn = document.querySelector('.menu-close');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    if (backdrop) backdrop.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (btn && menu) {
    btn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
    if (backdrop) backdrop.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }

  // copy USSD code
  function flash(pill) {
    pill.classList.add('copied');
    setTimeout(function () { pill.classList.remove('copied'); }, 1200);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.copy-btn');
    if (!b) return;
    var code = b.getAttribute('data-code');
    if (!code) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () { flash(b.closest('.ussd-pill')); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); flash(b.closest('.ussd-pill')); } catch (err) {}
      document.body.removeChild(ta);
    }
  });

  // chips filter (ตารางแพ็กเกจ): chip[data-filter] กรอง tr[data-cat]
  document.querySelectorAll('.chips[data-filter-group]').forEach(function (group) {
    var targetSel = group.getAttribute('data-filter-group');
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip[data-filter]');
      if (!chip) return;
      e.preventDefault();
      group.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      document.querySelectorAll(targetSel + ' tbody tr').forEach(function (tr) {
        tr.classList.toggle('hidden-row', f !== 'all' && tr.getAttribute('data-cat') !== f);
      });
    });
  });
})();
