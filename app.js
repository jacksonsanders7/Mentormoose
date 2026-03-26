const tutors = [
  {
    id: 't1',
    name: 'Avery Kim',
    school: 'Northview High',
    subject: 'Math',
    level: 'High School',
    rate: 20,
    blurb: 'Helps with Algebra, Geometry, and SAT math strategies.',
  },
  {
    id: 't2',
    name: 'Mateo Rivera',
    school: 'Westfield College',
    subject: 'Computer Science',
    level: 'College',
    rate: 24,
    blurb: 'Covers Python basics, debugging, and intro data structures.',
  },
  {
    id: 't3',
    name: 'Priya Patel',
    school: 'Eastwood High',
    subject: 'Chemistry',
    level: 'High School',
    rate: 18,
    blurb: 'Great for balancing equations and exam prep review sessions.',
  },
  {
    id: 't4',
    name: 'Noah Johnson',
    school: 'Lakeview University',
    subject: 'Writing',
    level: 'College',
    rate: 22,
    blurb: 'Supports essay structure, thesis development, and editing.',
  },
  {
    id: 't5',
    name: 'Elena Garcia',
    school: 'Central High',
    subject: 'Spanish',
    level: 'Middle School',
    rate: 16,
    blurb: 'Conversation practice and vocabulary games for beginners.',
  }
];

const tutorGrid = document.getElementById('tutorGrid');
const subjectFilter = document.getElementById('subjectFilter');
const levelFilter = document.getElementById('levelFilter');
const emptyState = document.getElementById('emptyState');
const browseTutorsBtn = document.getElementById('browseTutorsBtn');
const becomeTutorBtn = document.getElementById('becomeTutorBtn');
const marketplaceSection = document.getElementById('marketplaceSection');
const requestSection = document.getElementById('requestSection');
const requestForm = document.getElementById('requestForm');
const requestMessage = document.getElementById('requestMessage');

const subjects = [...new Set(tutors.map((tutor) => tutor.subject))].sort();
const levels = [...new Set(tutors.map((tutor) => tutor.level))].sort();

subjects.forEach((subject) => {
  subjectFilter.insertAdjacentHTML('beforeend', `<option value="${subject}">${subject}</option>`);
});

levels.forEach((level) => {
  levelFilter.insertAdjacentHTML('beforeend', `<option value="${level}">${level}</option>`);
});

function renderTutors() {
  const selectedSubject = subjectFilter.value;
  const selectedLevel = levelFilter.value;

  const filteredTutors = tutors.filter((tutor) => {
    const subjectMatch = selectedSubject === 'all' || tutor.subject === selectedSubject;
    const levelMatch = selectedLevel === 'all' || tutor.level === selectedLevel;
    return subjectMatch && levelMatch;
  });

  if (!filteredTutors.length) {
    tutorGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  tutorGrid.innerHTML = filteredTutors
    .map(
      (tutor) => `
        <article class="tutor-card" data-id="${tutor.id}">
          <h3>${tutor.name}</h3>
          <p class="meta">${tutor.school} · ${tutor.level}</p>
          <p><strong>Subject:</strong> ${tutor.subject}</p>
          <p><strong>Rate:</strong> $${tutor.rate}/hour</p>
          <p>${tutor.blurb}</p>
          <button class="btn btn-small" data-book-name="${tutor.name}" type="button">Book ${tutor.name.split(' ')[0]}</button>
        </article>
      `
    )
    .join('');
}

subjectFilter.addEventListener('change', renderTutors);
levelFilter.addEventListener('change', renderTutors);

browseTutorsBtn.addEventListener('click', () => {
  marketplaceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

becomeTutorBtn.addEventListener('click', () => {
  requestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

tutorGrid.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const tutorName = target.dataset.bookName;
  if (!tutorName) return;

  requestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  requestSubject.focus();
  requestMessage.classList.remove('hidden');
  requestMessage.textContent = `Great choice! Tell us what you want to learn with ${tutorName}.`;
});

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const studentName = studentNameInput.value.trim();
  const subject = requestSubject.value.trim();

  requestMessage.classList.remove('hidden');
  requestMessage.textContent = `Thanks, ${studentName}! Your request for ${subject} has been submitted. A student tutor will respond soon.`;
  requestForm.reset();
});

const studentNameInput = document.getElementById('studentName');
const requestSubject = document.getElementById('requestSubject');

renderTutors();
