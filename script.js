(function () {
  var form = document.getElementById('regForm');
  var fields = {
    name:   { el: document.getElementById('name'),   err: document.getElementById('nameErr') },
    email:  { el: document.getElementById('email'),  err: document.getElementById('emailErr') },
    mobile: { el: document.getElementById('mobile'), err: document.getElementById('mobileErr') },
    course: { el: document.getElementById('course'), err: document.getElementById('courseErr') }
  };

  var validators = {
    name: function (v) {
      v = v.trim();
      if (!v) return 'Enter your full name.';
      if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(v)) return 'Use letters only, 2 to 50 characters.';
      return '';
    },
    email: function (v) {
      v = v.trim();
      if (!v) return 'Enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email, like name@example.com.';
      return '';
    },
    mobile: function (v) {
      if (!v) return 'Enter your mobile number.';
      if (!/^[6-9]\d{9}$/.test(v)) return 'Enter a 10-digit number starting with 6, 7, 8 or 9.';
      return '';
    },
    course: function (v) {
      return v ? '' : 'Choose a course.';
    }
  };

  function check(key) {
    var f = fields[key];
    var msg = validators[key](f.el.value);
    f.err.textContent = msg;
    f.el.parentNode.classList.toggle('invalid', !!msg);
    f.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  // Digits only in the mobile field
  fields.mobile.el.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
  });

  Object.keys(fields).forEach(function (key) {
    fields[key].el.addEventListener('blur', function () { check(key); });
    fields[key].el.addEventListener('input', function () {
      if (fields[key].el.parentNode.classList.contains('invalid')) check(key);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    Object.keys(fields).forEach(function (key) {
      if (!check(key) && !firstBad) firstBad = fields[key].el;
    });
    if (firstBad) { firstBad.focus(); return; }

    var data = {
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      mobile: fields.mobile.el.value,
      course: fields.course.el.value
    };
    // In a real site, send `data` to your server here, e.g. with fetch().
    console.log('Registration:', data);

    var dl = document.getElementById('summary');
    dl.innerHTML = '';
    [['Name', data.name], ['Email', data.email], ['Mobile', data.mobile], ['Course', data.course]]
      .forEach(function (row) {
        var dt = document.createElement('dt'); dt.textContent = row[0];
        var dd = document.createElement('dd'); dd.textContent = row[1];
        dl.appendChild(dt); dl.appendChild(dd);
      });
    document.getElementById('formWrap').style.display = 'none';
    document.getElementById('success').style.display = 'block';
  });

  document.getElementById('again').addEventListener('click', function () {
    form.reset();
    Object.keys(fields).forEach(function (key) {
      fields[key].err.textContent = '';
      fields[key].el.parentNode.classList.remove('invalid');
    });
    document.getElementById('success').style.display = 'none';
    document.getElementById('formWrap').style.display = 'block';
    fields.name.el.focus();
  });
})();
