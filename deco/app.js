(function () {
  var KEY = 'mv_cart';
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
  function count() { return read().reduce(function (n, i) { return n + i.q; }, 0); }
  function paint() {
    var el = document.getElementById('count');
    if (el) el.textContent = count();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (!b) return;
    var parts = b.getAttribute('data-add').split('|');
    var cart = read();
    var found = cart.filter(function (i) { return i.n === parts[0]; })[0];
    if (found) { found.q += 1; } else { cart.push({ n: parts[0], p: Number(parts[1]), q: 1 }); }
    save(cart); paint();
    var old = b.textContent;
    b.textContent = 'Ajouté ✓';
    setTimeout(function () { b.textContent = old; }, 1400);
    if (document.getElementById('cart')) render();
  });

  function render() {
    var box = document.getElementById('cart');
    if (!box) return;
    var cart = read();
    document.getElementById('empty').style.display = cart.length ? 'none' : 'block';
    document.getElementById('totals').style.display = cart.length ? 'flex' : 'none';
    box.innerHTML = cart.map(function (i, idx) {
      return '<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center;padding:24px 0;border-top:1px solid var(--line)">' +
        '<div class="ph" style="width:110px;height:110px;flex:none"><span></span></div>' +
        '<div style="flex:999 1 200px;min-width:0"><p style="margin:0 0 4px;font-family:Fraunces,Georgia,serif;font-size:20px">' + i.n + '</p>' +
        '<p style="margin:0;font-size:14px;color:var(--mute)">Collection Hiver</p></div>' +
        '<div style="display:flex;align-items:center;gap:12px">' +
        '<button class="btn-o" style="padding:8px 14px" data-q="' + idx + '|-1" aria-label="Retirer un">&minus;</button>' +
        '<span style="min-width:20px;text-align:center">' + i.q + '</span>' +
        '<button class="btn-o" style="padding:8px 14px" data-q="' + idx + '|1" aria-label="Ajouter un">+</button></div>' +
        '<p style="margin:0;min-width:90px;text-align:right;font-size:17px">' + (i.p * i.q) + ' $</p>' +
        '<button class="btn-o" style="padding:8px 14px;border-color:var(--line)" data-rm="' + idx + '" aria-label="Supprimer">&times;</button></div>';
    }).join('');
    var sub = cart.reduce(function (n, i) { return n + i.p * i.q; }, 0);
    var ship = sub === 0 ? 0 : (sub >= 300 ? 0 : 24);
    var s = document.getElementById('sub'); if (s) s.textContent = sub + ' $';
    var sh = document.getElementById('ship'); if (sh) sh.textContent = sub === 0 ? '—' : (ship === 0 ? 'Offerte' : ship + ' $');
    var t = document.getElementById('tot'); if (t) t.textContent = (sub + ship) + ' $';
  }

  document.addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]');
    var rm = e.target.closest('[data-rm]');
    var cart = read();
    if (q) {
      var p = q.getAttribute('data-q').split('|');
      cart[p[0]].q += Number(p[1]);
      if (cart[p[0]].q < 1) cart.splice(p[0], 1);
      save(cart); paint(); render();
    } else if (rm) {
      cart.splice(rm.getAttribute('data-rm'), 1);
      save(cart); paint(); render();
    }
  });

  document.addEventListener('click', function (e) {
    var d = e.target.closest('.cal .free');
    if (d) {
      var all = document.querySelectorAll('.cal .free');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('sel');
      d.classList.add('sel');
      document.getElementById('selday').textContent = d.getAttribute('data-day');
      document.getElementById('slots').style.display = 'block';
      document.getElementById('hint').style.display = 'none';
      return;
    }
    var s = e.target.closest('.slot');
    if (s) {
      var sl = document.querySelectorAll('.slot');
      for (var j = 0; j < sl.length; j++) sl[j].classList.remove('sel');
      s.classList.add('sel');
    }
  });

  // produit.html : lire le paramètre ?p=
  var P = [["Plaid Brume","Laine bouillie, 140 x 200 cm",240],["Tabouret Souche","Chêne fumé massif",390],["Coussin Ardoise","Lin épais, 50 x 50 cm",95],["Bougeoir Veille","Laiton patiné, lot de deux",130],["Rideau Janvier","Lin lavé, sur mesure",320],["Coupe Neige","Céramique émaillée mate",48],["Banc Sillon","Chêne et sangle de lin",620],["Tapis Givre","Laine nouée main, 170 x 240 cm",980],["Vase Brouillard","Grès émaillé, deux tailles",110]];
  var m = location.search.match(/p=(\d+)/);
  if (m && document.getElementById('ptitle')) {
    var it = P[Number(m[1])];
    if (it) {
      document.getElementById('ptitle').textContent = it[0];
      document.getElementById('pname').textContent = it[0];
      document.getElementById('pdesc').textContent = it[1];
      document.getElementById('pprice').textContent = it[2] + ' $';
      document.getElementById('addbtn').setAttribute('data-add', it[0] + '|' + it[2]);
      document.title = 'Maison Verel — ' + it[0];
    }
  }

  paint(); render();
})();
