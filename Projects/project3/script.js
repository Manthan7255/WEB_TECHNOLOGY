

/**
 * Load data from localStorage with a fallback default.
 * @param {string} key
 * @param {*} defaultVal
 */
function load(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

/** Persist data to localStorage */
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/** Generate a unique numeric ID */
function uid() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/** Get initials from a full name */
function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0] || '')
    .join('')
    .toUpperCase();
}

/** Format a date string to a readable format */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ─────────────────────────────────────────────────
   SEED / DEFAULT DATA
───────────────────────────────────────────────────*/

const DEFAULT_PATIENTS = [
  { id: 1001, name: 'Aanya Sharma',  age: 34, gender: 'Female', blood: 'B+',  condition: 'Hypertension',    status: 'Active',     phone: '+91 98765 43210' },
  { id: 1002, name: 'Rohan Verma',   age: 56, gender: 'Male',   blood: 'O+',  condition: 'Diabetes Type 2', status: 'Active',     phone: '+91 87654 32109' },
  { id: 1003, name: 'Priya Nair',    age: 29, gender: 'Female', blood: 'A−',  condition: 'Asthma',          status: 'Recovered',  phone: '+91 76543 21098' },
  { id: 1004, name: 'Suresh Rao',    age: 71, gender: 'Male',   blood: 'AB+', condition: 'Arthritis',       status: 'Active',     phone: '+91 65432 10987' },
  { id: 1005, name: 'Meera Joshi',   age: 45, gender: 'Female', blood: 'O−',  condition: 'Hypertension',    status: 'Critical',   phone: '+91 54321 09876' },
  { id: 1006, name: 'Kiran Patel',   age: 38, gender: 'Male',   blood: 'A+',  condition: 'Fracture',        status: 'Discharged', phone: '+91 43210 98765' },
];

const DEFAULT_DOCTORS = [
  { id: 2001, name: 'Dr. Rajesh Mehta',  spec: 'Cardiologist',    exp: 14, avail: 'Available',  phone: '+91 99887 76655', email: 'r.mehta@medicore.health' },
  { id: 2002, name: 'Dr. Priya Kapoor',  spec: 'Pulmonologist',   exp: 10, avail: 'Busy',       phone: '+91 88776 65544', email: 'p.kapoor@medicore.health' },
  { id: 2003, name: 'Dr. Amit Singh',    spec: 'Orthopedics',     exp: 8,  avail: 'Available',  phone: '+91 77665 54433', email: 'a.singh@medicore.health' },
  { id: 2004, name: 'Dr. Sunita Desai',  spec: 'Endocrinologist', exp: 12, avail: 'Available',  phone: '+91 66554 43322', email: 's.desai@medicore.health' },
  { id: 2005, name: 'Dr. Vikram Iyer',   spec: 'Neurologist',     exp: 17, avail: 'On Leave',   phone: '+91 55443 32211', email: 'v.iyer@medicore.health' },
];

const DEFAULT_APPOINTMENTS = [
  { id: 3001, patient: 'Aanya Sharma',  doctor: 'Dr. Rajesh Mehta',  date: todayISO(), time: '09:00 AM', notes: 'Routine BP check' },
  { id: 3002, patient: 'Rohan Verma',   doctor: 'Dr. Sunita Desai',  date: todayISO(), time: '10:00 AM', notes: 'HbA1c review' },
  { id: 3003, patient: 'Priya Nair',    doctor: 'Dr. Priya Kapoor',  date: offsetDate(1), time: '11:00 AM', notes: 'Follow-up after nebulization' },
  { id: 3004, patient: 'Meera Joshi',   doctor: 'Dr. Rajesh Mehta',  date: offsetDate(2), time: '03:00 PM', notes: 'ECG & consultation' },
];

function todayISO() {
  return new Date().toISOString().split('T')[0];
}
function offsetDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

/* Initialize storage on first load */
(function initStorage() {
  if (!localStorage.getItem('mc_patients'))    save('mc_patients',    DEFAULT_PATIENTS);
  if (!localStorage.getItem('mc_doctors'))     save('mc_doctors',     DEFAULT_DOCTORS);
  if (!localStorage.getItem('mc_appointments'))save('mc_appointments',DEFAULT_APPOINTMENTS);
})();

/* Live data references */
let patients     = load('mc_patients',    DEFAULT_PATIENTS);
let doctors      = load('mc_doctors',     DEFAULT_DOCTORS);
let appointments = load('mc_appointments',DEFAULT_APPOINTMENTS);

/* ─────────────────────────────────────────────────
   PAGE ROUTING
───────────────────────────────────────────────────*/

/** Show the dashboard app view */
function showDashboard() {
  document.getElementById('landing-page').classList.remove('active');
  const app = document.getElementById('app-page');
  app.classList.add('active');
  updateAllStats();
  renderRecentPatients();
  renderTodayAppointments();
  renderPatientTable();
  renderDoctorCards();
  renderAppointmentList();
  populateDoctorDropdown();
  renderReports();
  // Set today as minimum date in appointment form
  document.getElementById('apptDate').min = todayISO();
}

/** Return to the landing page */
function showLanding() {
  // Close mobile sidebar + overlay if open
  closeSidebarMobile();
  // Also collapse desktop sidebar visually (slide it out then restore)
  const sidebar = document.getElementById('sidebar');
  sidebar.style.transition = 'transform 0.3s ease';
  sidebar.style.transform  = 'translateX(-100%)';
  setTimeout(() => {
    // Switch pages
    document.getElementById('app-page').classList.remove('active');
    document.getElementById('landing-page').classList.add('active');
    // Reset sidebar state for next dashboard visit
    sidebar.style.transform  = '';
    sidebar.style.transition = '';
  }, 280);
}

/* ─────────────────────────────────────────────────
   SIDEBAR & NAV
───────────────────────────────────────────────────*/

/** Switch between dashboard sections */
function switchSection(sectionId, navEl) {
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if (navEl) navEl.classList.add('active');

  // Update sections
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('section-' + sectionId);
  if (target) target.classList.add('active');

  // Update topbar title
  const titles = {
    dashboard: 'Dashboard',
    patients: 'Patient Management',
    doctors: 'Doctor Management',
    appointments: 'Appointments',
    reports: 'Reports & Analytics'
  };
  document.getElementById('topbarTitle').textContent = titles[sectionId] || 'MediCore';

  // Refresh data for the section
  if (sectionId === 'reports') renderReports();
  if (sectionId === 'appointments') populateDoctorDropdown();

  // Close sidebar on mobile after selection
  if (window.innerWidth <= 768) closeSidebarMobile();
}

/** Toggle mobile sidebar */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
  let overlay = document.getElementById('sidebarOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebarOverlay';
    overlay.onclick = closeSidebarMobile;
    document.body.appendChild(overlay);
  }
  overlay.classList.toggle('show');
}

function closeSidebarMobile() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('show');
}

/** Toggle landing page mobile menu */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

/* ─────────────────────────────────────────────────
   NOTIFICATIONS
───────────────────────────────────────────────────*/
function toggleNotifications() {
  document.getElementById('notifDropdown').classList.toggle('open');
}

function clearNotifications() {
  document.querySelectorAll('.notif-item').forEach(el => el.classList.remove('unread'));
  const badge = document.getElementById('notifBadge');
  badge.textContent = '0';
  badge.classList.add('hidden');
  document.getElementById('notifDropdown').classList.remove('open');
}

// Close notification dropdown when clicking outside
document.addEventListener('click', function (e) {
  const dropdown = document.getElementById('notifDropdown');
  const btn = document.querySelector('.notif-btn');
  if (dropdown && !dropdown.contains(e.target) && btn && !btn.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

/* ─────────────────────────────────────────────────
   STATS
───────────────────────────────────────────────────*/
function updateAllStats() {
  const todayAppts = appointments.filter(a => a.date === todayISO());
  animateCount('statPatients',     patients.length);
  animateCount('statDoctors',      doctors.length);
  animateCount('statAppointments', todayAppts.length);
}

/** Animate number counting up */
function animateCount(elId, target) {
  const el = document.getElementById(elId);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 30);
}

/* ─────────────────────────────────────────────────
   DASHBOARD WIDGETS
───────────────────────────────────────────────────*/

/** Render recent patients list on dashboard */
function renderRecentPatients() {
  const list = document.getElementById('recentPatientsList');
  if (!list) return;
  const recent = [...patients].slice(-5).reverse();
  if (!recent.length) {
    list.innerHTML = '<div class="empty-state" style="padding:30px"><span>👤</span><p>No patients yet</p></div>';
    return;
  }
  list.innerHTML = recent.map(p => `
    <div class="recent-item">
      <div class="recent-avatar">${initials(p.name)}</div>
      <div class="recent-info">
        <div class="recent-name">${p.name}</div>
        <div class="recent-sub">${p.condition} · ${p.age} yrs</div>
      </div>
      <span class="recent-badge status-badge ${badgeClass(p.status)}">${p.status}</span>
    </div>
  `).join('');
}

/** Render today's appointments on dashboard */
function renderTodayAppointments() {
  const list = document.getElementById('todayAppointmentsList');
  if (!list) return;
  const todays = appointments.filter(a => a.date === todayISO());
  if (!todays.length) {
    list.innerHTML = '<div class="empty-state" style="padding:30px"><span>📅</span><p>No appointments scheduled for today</p></div>';
    return;
  }
  list.innerHTML = todays.map(a => `
    <div class="recent-item">
      <div class="recent-avatar" style="background:#EDE9FE;color:#7C3AED">${initials(a.patient)}</div>
      <div class="recent-info">
        <div class="recent-name">${a.patient}</div>
        <div class="recent-sub">${a.doctor}</div>
      </div>
      <span class="recent-badge">${a.time}</span>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────────
   PATIENTS
───────────────────────────────────────────────────*/

/** Get badge CSS class from status string */
function badgeClass(status) {
  const map = {
    'Active': 'badge-active',
    'Critical': 'badge-critical',
    'Recovered': 'badge-recovered',
    'Discharged': 'badge-discharged',
    'Available': 'badge-available',
    'Busy': 'badge-busy',
    'On Leave': 'badge-on-leave',
  };
  return map[status] || '';
}

/** Render patient table */
function renderPatientTable() {
  const query = (document.getElementById('patientSearch')?.value || '').toLowerCase();
  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.condition.toLowerCase().includes(query) ||
    p.gender.toLowerCase().includes(query)
  );

  const tbody = document.getElementById('patientTableBody');
  const empty = document.getElementById('patientEmpty');
  if (!tbody) return;

  if (!filtered.length) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="recent-avatar" style="width:32px;height:32px;font-size:11px">${initials(p.name)}</div>
          <div>
            <div style="font-weight:600;font-size:14px">${p.name}</div>
            <div style="font-size:12px;color:var(--text-muted)">${p.phone || '—'}</div>
          </div>
        </div>
      </td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.condition}</td>
      <td><span class="status-badge ${badgeClass(p.status)}">${p.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="tbl-btn edit" onclick="editPatient(${p.id})">Edit</button>
          <button class="tbl-btn delete" onclick="confirmDeletePatient(${p.id})">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/* Patient Modal */
function openPatientModal(id = null) {
  document.getElementById('patientForm').reset();
  document.querySelectorAll('#patientForm .field-error').forEach(el => el.textContent = '');
  document.getElementById('patientId').value = '';
  document.getElementById('patientModalTitle').textContent = 'Add Patient';
  document.getElementById('patientSubmitBtn').textContent = 'Add Patient';

  if (id) {
    const p = patients.find(x => x.id === id);
    if (!p) return;
    document.getElementById('patientModalTitle').textContent = 'Edit Patient';
    document.getElementById('patientSubmitBtn').textContent  = 'Save Changes';
    document.getElementById('patientId').value        = p.id;
    document.getElementById('patientName').value      = p.name;
    document.getElementById('patientAge').value       = p.age;
    document.getElementById('patientGender').value    = p.gender;
    document.getElementById('patientBlood').value     = p.blood || '';
    document.getElementById('patientCondition').value = p.condition;
    document.getElementById('patientStatus').value    = p.status;
    document.getElementById('patientPhone').value     = p.phone || '';
  }
  openModalById('patientModal');
}

function editPatient(id) { openPatientModal(id); }

/** Validate and save patient */
function savePatient(e) {
  e.preventDefault();
  let valid = true;

  const name      = document.getElementById('patientName').value.trim();
  const age       = parseInt(document.getElementById('patientAge').value);
  const gender    = document.getElementById('patientGender').value;
  const condition = document.getElementById('patientCondition').value.trim();
  const status    = document.getElementById('patientStatus').value;
  const blood     = document.getElementById('patientBlood').value;
  const phone     = document.getElementById('patientPhone').value.trim();
  const idVal     = document.getElementById('patientId').value;

  // Validation
  setError('patientNameErr', '');
  setError('patientAgeErr', '');
  setError('patientConditionErr', '');

  if (!name || name.length < 2) {
    setError('patientNameErr', 'Full name is required (min 2 characters).');
    valid = false;
  }
  if (!age || age < 1 || age > 130) {
    setError('patientAgeErr', 'Please enter a valid age (1–130).');
    valid = false;
  }
  if (!condition) {
    setError('patientConditionErr', 'Condition / diagnosis is required.');
    valid = false;
  }
  if (!gender) { showToast('Please select a gender.', 'error'); valid = false; }
  if (!valid) return;

  if (idVal) {
    // Edit
    const idx = patients.findIndex(p => p.id === parseInt(idVal));
    if (idx !== -1) {
      patients[idx] = { ...patients[idx], name, age, gender, blood, condition, status, phone };
      showToast('Patient updated successfully!', 'success');
    }
  } else {
    // Add
    patients.push({ id: uid(), name, age, gender, blood, condition, status, phone });
    showToast('Patient added successfully!', 'success');
  }

  save('mc_patients', patients);
  closeModalById('patientModal');
  renderPatientTable();
  renderRecentPatients();
  updateAllStats();
}

let pendingDeletePatientId = null;

function confirmDeletePatient(id) {
  pendingDeletePatientId = id;
  document.getElementById('confirmDeleteBtn').onclick = executeDeletePatient;
  openModalById('deleteModal');
}

function executeDeletePatient() {
  patients = patients.filter(p => p.id !== pendingDeletePatientId);
  save('mc_patients', patients);
  closeModalById('deleteModal');
  renderPatientTable();
  renderRecentPatients();
  updateAllStats();
  showToast('Patient deleted.', 'info');
  pendingDeletePatientId = null;
}

/* ─────────────────────────────────────────────────
   DOCTORS
───────────────────────────────────────────────────*/

/** Render doctor cards */
function renderDoctorCards() {
  const query = (document.getElementById('doctorSearch')?.value || '').toLowerCase();
  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.spec.toLowerCase().includes(query)
  );

  const grid  = document.getElementById('doctorCardsGrid');
  const empty = document.getElementById('doctorEmpty');
  if (!grid) return;

  if (!filtered.length) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  const bgColors = ['#DBEAFE','#D1FAE5','#EDE9FE','#FEF3C7','#FFE4E6','#F0FDF4'];

  grid.innerHTML = filtered.map((d, i) => `
    <div class="doctor-card">
      <div class="doctor-avail">
        <span class="status-badge ${badgeClass(d.avail)}">${d.avail}</span>
      </div>
      <div class="doctor-card-avatar" style="background:linear-gradient(135deg,${avatarGradient(i)})">${initials(d.name)}</div>
      <h3>${d.name}</h3>
      <div class="spec">${d.spec}</div>
      <div class="doctor-card-meta">
        <div class="doctor-meta-item">🩺 ${d.exp} years experience</div>
        <div class="doctor-meta-item">📞 ${d.phone}</div>
        <div class="doctor-meta-item">✉️ ${d.email || '—'}</div>
      </div>
      <div class="doctor-card-actions">
        <button class="tbl-btn edit" onclick="editDoctor(${d.id})" style="flex:1">Edit</button>
        <button class="tbl-btn delete" onclick="confirmDeleteDoctor(${d.id})" style="flex:1">Remove</button>
      </div>
    </div>
  `).join('');
}

function avatarGradient(i) {
  const gradients = [
    '#2563EB, #60A5FA',
    '#16A34A, #4ADE80',
    '#9333EA, #C084FC',
    '#EA580C, #FB923C',
    '#0D9488, #2DD4BF',
    '#E11D48, #FB7185',
  ];
  return gradients[i % gradients.length];
}

/* Doctor Modal */
function openDoctorModal(id = null) {
  document.getElementById('doctorForm').reset();
  document.querySelectorAll('#doctorForm .field-error').forEach(el => el.textContent = '');
  document.getElementById('doctorId').value = '';
  document.getElementById('doctorModalTitle').textContent = 'Add Doctor';
  document.getElementById('doctorSubmitBtn').textContent  = 'Add Doctor';

  if (id) {
    const d = doctors.find(x => x.id === id);
    if (!d) return;
    document.getElementById('doctorModalTitle').textContent = 'Edit Doctor';
    document.getElementById('doctorSubmitBtn').textContent  = 'Save Changes';
    document.getElementById('doctorId').value    = d.id;
    document.getElementById('doctorName').value  = d.name;
    document.getElementById('doctorSpec').value  = d.spec;
    document.getElementById('doctorExp').value   = d.exp;
    document.getElementById('doctorAvail').value = d.avail;
    document.getElementById('doctorPhone').value = d.phone;
    document.getElementById('doctorEmail').value = d.email || '';
  }
  openModalById('doctorModal');
}

function editDoctor(id) { openDoctorModal(id); }

/** Validate and save doctor */
function saveDoctor(e) {
  e.preventDefault();
  let valid = true;

  const name  = document.getElementById('doctorName').value.trim();
  const spec  = document.getElementById('doctorSpec').value.trim();
  const exp   = parseInt(document.getElementById('doctorExp').value);
  const avail = document.getElementById('doctorAvail').value;
  const phone = document.getElementById('doctorPhone').value.trim();
  const email = document.getElementById('doctorEmail').value.trim();
  const idVal = document.getElementById('doctorId').value;

  setError('doctorNameErr', '');
  setError('doctorSpecErr', '');
  setError('doctorExpErr', '');
  setError('doctorPhoneErr', '');

  if (!name || name.length < 2) {
    setError('doctorNameErr', 'Full name is required.');
    valid = false;
  }
  if (!spec) {
    setError('doctorSpecErr', 'Specialization is required.');
    valid = false;
  }
  if (isNaN(exp) || exp < 0 || exp > 60) {
    setError('doctorExpErr', 'Enter valid years of experience (0–60).');
    valid = false;
  }
  if (!phone) {
    setError('doctorPhoneErr', 'Phone number is required.');
    valid = false;
  }
  if (!valid) return;

  if (idVal) {
    const idx = doctors.findIndex(d => d.id === parseInt(idVal));
    if (idx !== -1) {
      doctors[idx] = { ...doctors[idx], name, spec, exp, avail, phone, email };
      showToast('Doctor updated successfully!', 'success');
    }
  } else {
    doctors.push({ id: uid(), name, spec, exp, avail, phone, email });
    showToast('Doctor added successfully!', 'success');
  }

  save('mc_doctors', doctors);
  closeModalById('doctorModal');
  renderDoctorCards();
  updateAllStats();
  populateDoctorDropdown();
}

let pendingDeleteDoctorId = null;

function confirmDeleteDoctor(id) {
  pendingDeleteDoctorId = id;
  document.getElementById('confirmDeleteBtn').onclick = executeDeleteDoctor;
  openModalById('deleteModal');
}

function executeDeleteDoctor() {
  doctors = doctors.filter(d => d.id !== pendingDeleteDoctorId);
  save('mc_doctors', doctors);
  closeModalById('deleteModal');
  renderDoctorCards();
  updateAllStats();
  populateDoctorDropdown();
  showToast('Doctor removed.', 'info');
  pendingDeleteDoctorId = null;
}

/* ─────────────────────────────────────────────────
   APPOINTMENTS
───────────────────────────────────────────────────*/

/** Populate doctor dropdown in appointment form */
function populateDoctorDropdown() {
  const sel = document.getElementById('apptDoctor');
  if (!sel) return;
  const current = sel.value;
  sel.innerHTML = '<option value="">Select a doctor</option>' +
    doctors.map(d => `<option value="${d.name}" ${d.name === current ? 'selected' : ''}>${d.name} — ${d.spec}</option>`).join('');
}

/** Validate and book appointment */
function bookAppointment(e) {
  e.preventDefault();
  let valid = true;

  const patient = document.getElementById('apptPatient').value.trim();
  const doctor  = document.getElementById('apptDoctor').value;
  const date    = document.getElementById('apptDate').value;
  const time    = document.getElementById('apptTime').value;
  const notes   = document.getElementById('apptNotes').value.trim();

  setError('apptPatientErr', '');
  setError('apptDoctorErr', '');
  setError('apptDateErr', '');
  setError('apptTimeErr', '');

  if (!patient) { setError('apptPatientErr', 'Patient name is required.'); valid = false; }
  if (!doctor)  { setError('apptDoctorErr', 'Please select a doctor.'); valid = false; }
  if (!date)    { setError('apptDateErr', 'Please select a date.'); valid = false; }
  if (!time)    { setError('apptTimeErr', 'Please select a time slot.'); valid = false; }
  if (!valid) return;

  appointments.push({ id: uid(), patient, doctor, date, time, notes });
  save('mc_appointments', appointments);
  document.getElementById('appointmentForm').reset();
  renderAppointmentList();
  renderTodayAppointments();
  updateAllStats();
  showToast('Appointment booked!', 'success');
}

/** Render appointment list */
function renderAppointmentList() {
  const query = (document.getElementById('apptSearch')?.value || '').toLowerCase();
  const filtered = [...appointments]
    .filter(a =>
      a.patient.toLowerCase().includes(query) ||
      a.doctor.toLowerCase().includes(query)
    )
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const list  = document.getElementById('appointmentList');
  const empty = document.getElementById('apptEmpty');
  if (!list) return;

  if (!filtered.length) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';

  list.innerHTML = filtered.map(a => `
    <div class="appt-item">
      <div class="appt-time">
        <span class="time">${a.time}</span>
        <span class="date">${formatDate(a.date)}</span>
      </div>
      <div class="appt-info">
        <div class="appt-patient">${a.patient}</div>
        <div class="appt-doctor">with ${a.doctor}</div>
        ${a.notes ? `<div class="appt-notes">${a.notes}</div>` : ''}
      </div>
      <button class="appt-delete" onclick="deleteAppointment(${a.id})" title="Cancel appointment">✕</button>
    </div>
  `).join('');
}

/** Delete an appointment */
function deleteAppointment(id) {
  appointments = appointments.filter(a => a.id !== id);
  save('mc_appointments', appointments);
  renderAppointmentList();
  renderTodayAppointments();
  updateAllStats();
  showToast('Appointment cancelled.', 'info');
}

/* ─────────────────────────────────────────────────
   REPORTS (Pure CSS/JS Charts)
───────────────────────────────────────────────────*/

function renderReports() {
  updateReportSummary();
  drawGenderChart();
  drawConditionChart();
  drawDoctorApptChart();
  drawStatusChart();
}

function updateReportSummary() {
  setText('rsTotalPatients', patients.length);
  setText('rsTotalAppts',    appointments.length);
  setText('rsTotalDoctors',  doctors.length);
  const avg = doctors.length ? (appointments.length / doctors.length).toFixed(1) : 0;
  setText('rsAvgAppts', avg);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/** Draw a donut (pie) chart on a canvas element */
function drawDonut(canvasId, segments, centerElId, legendElId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const r = Math.min(W, H) / 2 - 10;
  const hole = r * 0.55;
  ctx.clearRect(0, 0, W, H);

  const total = segments.reduce((s, x) => s + x.value, 0);
  if (!total) {
    ctx.fillStyle = '#E2E8F0';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.arc(cx, cy, hole, 0, Math.PI * 2, true);
    ctx.fill('evenodd');
    const center = document.getElementById(centerElId);
    if (center) center.textContent = '0';
    const legend = document.getElementById(legendElId);
    if (legend) legend.innerHTML = '<span style="color:var(--text-muted);font-size:12px">No data yet</span>';
    return;
  }

  let startAngle = -Math.PI / 2;
  segments.forEach(seg => {
    const angle = (seg.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + angle);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    startAngle += angle;
  });

  // Donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, hole, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Center total
  const center = document.getElementById(centerElId);
  if (center) center.textContent = total;

  // Legend
  const legend = document.getElementById(legendElId);
  if (legend) {
    legend.innerHTML = segments.map(s => `
      <div class="legend-item">
        <div class="legend-dot" style="background:${s.color}"></div>
        ${s.label} (${s.value})
      </div>
    `).join('');
  }
}

/** Draw a horizontal bar chart */
function drawBarChart(containerId, data, colorFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!data.length) {
    container.innerHTML = '<div class="empty-state" style="padding:30px"><span>📊</span><p>No data available</p></div>';
    return;
  }
  const max = Math.max(...data.map(d => d.value), 1);
  container.innerHTML = data.map(d => {
    const pct = ((d.value / max) * 100).toFixed(1);
    const color = colorFn ? colorFn(d) : '#2563EB';
    return `
      <div class="bar-row">
        <div class="bar-label" title="${d.label}">${d.label}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${pct}%;background:${color}">
            ${d.value > 0 ? d.value : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function drawGenderChart() {
  const genderMap = {};
  patients.forEach(p => { genderMap[p.gender] = (genderMap[p.gender] || 0) + 1; });
  const colorMap = { Male: '#2563EB', Female: '#EC4899', Other: '#6B7280' };
  const segments = Object.entries(genderMap).map(([label, value]) => ({
    label, value, color: colorMap[label] || '#94A3B8'
  }));
  drawDonut('genderChart', segments, 'genderCenter', 'genderLegend');
}

function drawStatusChart() {
  const statusMap = {};
  patients.forEach(p => { statusMap[p.status] = (statusMap[p.status] || 0) + 1; });
  const colorMap = { Active: '#16A34A', Critical: '#E11D48', Recovered: '#2563EB', Discharged: '#6B7280' };
  const segments = Object.entries(statusMap).map(([label, value]) => ({
    label, value, color: colorMap[label] || '#94A3B8'
  }));
  drawDonut('statusChart', segments, 'statusCenter', 'statusLegend');
}

function drawConditionChart() {
  const condMap = {};
  patients.forEach(p => { condMap[p.condition] = (condMap[p.condition] || 0) + 1; });
  const data = Object.entries(condMap)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
  const colors = ['#2563EB','#9333EA','#16A34A','#EA580C','#E11D48','#0D9488','#FBBF24','#64748B'];
  drawBarChart('conditionChart', data, (d, i) => colors[data.indexOf(d) % colors.length]);
}

function drawDoctorApptChart() {
  const apptMap = {};
  appointments.forEach(a => { apptMap[a.doctor] = (apptMap[a.doctor] || 0) + 1; });
  const data = Object.entries(apptMap)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
  const colors = ['#2563EB','#16A34A','#9333EA','#EA580C','#E11D48'];
  drawBarChart('doctorApptChart', data, (d) => colors[data.indexOf(d) % colors.length]);
}

/* ─────────────────────────────────────────────────
   MODAL HELPERS
───────────────────────────────────────────────────*/

function openModalById(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModalById(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/** Close modal if overlay (background) is clicked */
function closeModal(id, e) {
  if (e.target === e.currentTarget) closeModalById(id);
}

/* ─────────────────────────────────────────────────
   TOAST NOTIFICATIONS
───────────────────────────────────────────────────*/

let toastTimer = null;

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 */
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  toastTimer = setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

/* ─────────────────────────────────────────────────
   FORM ERROR HELPER
───────────────────────────────────────────────────*/

function setError(elId, msg) {
  const el = document.getElementById(elId);
  if (el) el.textContent = msg;
}

/* ─────────────────────────────────────────────────
   EXPORT REPORT
───────────────────────────────────────────────────*/

/** Generate a simple text-based report and trigger download */
function exportReport() {
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const todayAppts = appointments.filter(a => a.date === todayISO());

  const condMap = {};
  patients.forEach(p => { condMap[p.condition] = (condMap[p.condition] || 0) + 1; });
  const topConditions = Object.entries(condMap).sort((a,b) => b[1]-a[1]).slice(0,5).map(([c,n]) => `  · ${c}: ${n} patient(s)`).join('\n');

  const genderMap = {};
  patients.forEach(p => { genderMap[p.gender] = (genderMap[p.gender] || 0) + 1; });
  const genderBreakdown = Object.entries(genderMap).map(([g,n]) => `  · ${g}: ${n}`).join('\n');

  const report = `
══════════════════════════════════════════
   MEDICORE — HOSPITAL SUMMARY REPORT
   Generated: ${today}
══════════════════════════════════════════

📊 OVERVIEW
───────────
  Total Patients    : ${patients.length}
  Active Doctors    : ${doctors.length}
  Total Appointments: ${appointments.length}
  Today's Appointments: ${todayAppts.length}

👤 PATIENT GENDER DISTRIBUTION
──────────────────────────────
${genderBreakdown}

🩺 TOP CONDITIONS
────────────────
${topConditions}

📅 TODAY'S APPOINTMENTS
────────────────────────
${todayAppts.length ? todayAppts.map(a => `  · ${a.time} — ${a.patient} with ${a.doctor}`).join('\n') : '  No appointments today.'}

👨‍⚕️ DOCTOR ROSTER
─────────────────
${doctors.map(d => `  · ${d.name} (${d.spec}) — ${d.avail}`).join('\n')}

══════════════════════════════════════════
   End of Report — MediCore HMS
══════════════════════════════════════════
`.trim();

  const blob = new Blob([report], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `medicore-report-${todayISO()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Report exported!', 'success');
}

/* ─────────────────────────────────────────────────
   LANDING PAGE — SCROLL NAV HIGHLIGHT
───────────────────────────────────────────────────*/

window.addEventListener('scroll', () => {
  const nav = document.getElementById('landingNav');
  if (nav) {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 2px 20px rgba(0,0,0,.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }
});

/* ─────────────────────────────────────────────────
   INTERSECTION OBSERVER — Animate Feature Cards
───────────────────────────────────────────────────*/

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .testimonial-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 80}ms ease, transform 0.5s ${i * 80}ms ease`;
  observer.observe(el);
});

/* ─────────────────────────────────────────────────
   KEYBOARD: ESC to close modals
───────────────────────────────────────────────────*/

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    ['patientModal', 'doctorModal', 'deleteModal'].forEach(id => {
      const el = document.getElementById(id);
      if (el?.classList.contains('open')) closeModalById(id);
    });
    document.getElementById('notifDropdown')?.classList.remove('open');
  }
});

/* ─────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────*/

// Nothing extra needed on DOMContentLoaded — showDashboard() is called
// on user action. Feature card animations are set up above.

console.log('🏥 MediCore HMS — Loaded successfully');