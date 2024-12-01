

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    const sections = {
        'home': `
            <section id="home" class="mb-10">
                <h1 class="text-3xl font-bold mb-6">Welcome</h1>
                <p>Click on the sidebar links to explore various features.</p>
            </section>`,
        'tasks': `
            <section id="tasks" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Task and Time Management</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold mb-4">To-Do List</h3>
                    <div class="mb-4">
                        <input id="new-task" class="border p-2 rounded w-full" type="text" placeholder="New Task">
                        <button id="add-task" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
                    </div>
                    <ul id="task-list">
                        <!-- Tasks will be dynamically added here -->
                    </ul>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 class="text-xl font-bold mb-4">Pomodoro Timer</h3>
                    <button id="start-timer" class="bg-blue-500 text-white px-4 py-2 rounded">Start</button>
                    <div id="timer-display" class="text-2xl font-bold mt-4">25:00</div>
                    <p class="text-sm text-gray-600 mt-2">Stay focused and productive with the Pomodoro Timer, which helps you break your work into intervals.</p>
                </div>
            </section>`,
        'calendar': `
            <section id="calendar" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Calendar</h2>
                <div class="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                    <div id="calendar-content" class="p-6 bg-white rounded-lg shadow-md"></div>
                    <p class="text-sm text-gray-600 mt-2">Organize your schedule with the interactive calendar. Add, edit, and remove events to keep track of your commitments.</p>
                </div>
            </section>`,
        'career': `
            <section id="career" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Career Opportunities Portal</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p>Explore personalized internship and job recommendations based on your profile and interests. Track your applications and get notifications about relevant events.</p>
                </div>
            </section>`,
        'mentorship': `
            <section id="mentorship" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Mentorship and Guidance</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p>Connect with experienced mentors, read career advice blogs, and participate in forums to get guidance and support for your professional journey.</p>
                </div>
            </section>`,
        'skill': `
            <section id="skill" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Skill Development</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p>Access a wealth of resources for learning new skills, including tutorials, online courses, and practice tools to enhance your abilities.</p>
                </div>
            </section>`,
        'course': `
            <section id="course" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Course</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p>Enroll in various courses and track your progress as you complete modules and assignments. Stay motivated and achieve your learning goals.</p>
                </div>
            </section>`,
        'wellness': `
            <section id="wellness" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Wellness and Balance Tools</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p>Maintain a healthy work-life balance with daily self-care reminders, stress management tools, and a goal-setting tracker to help you stay on top of your well-being.</p>
                </div>
            </section>`,
        'settings': `
            <section id="settings" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Settings</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p>Configure your account settings, preferences, and privacy options to personalize your dashboard experience.</p>
                </div>
            </section>`,
        'help': `
            <section id="help" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Help</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p>Find assistance, FAQs, and support resources to help you navigate and make the most of your dashboard features.</p>
                </div>
            </section>`,
        'logout': `
            <section id="logout" class="mb-10">
                <h2 class="text-2xl font-semibold mb-4">Log Out</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p>You have been logged out. Thank you for using our services! We hope to see you again soon.</p>
                </div>
            </section>`
    };

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            content.innerHTML = sections[sectionId];
            if (sectionId === 'tasks') {
                setupTaskList();
                setupPomodoroTimer();
            } else if (sectionId === 'calendar') {
                setupCalendar();
            }
        });
    });

    function setupTaskList() {
        const addTaskButton = document.getElementById('add-task');
        const newTaskInput = document.getElementById('new-task');
        const taskList = document.getElementById('task-list');

        addTaskButton.addEventListener('click', () => {
            const taskText = newTaskInput.value;
            if (taskText !== '') {
                const listItem = document.createElement('li');
                listItem.classList.add('flex', 'items-center', 'mb-2');
                listItem.innerHTML = `
                    <input type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600">
                    <span class="ml-2 flex-1">${taskText}</span>
                    <button class="ml-4 text-red-600 remove-task">Remove</button>
                `;
                taskList.appendChild(listItem);
                newTaskInput.value = '';

                listItem.querySelector('.remove-task').addEventListener('click', () => {
                    taskList.removeChild(listItem);
                });
            }
        });
    }

    function setupPomodoroTimer() {
        const startButton = document.getElementById('start-timer');
        const timerDisplay = document.getElementById('timer-display');
        let timer;
        startButton.addEventListener('click', () => {
            let time = 25 * 60;
            timer = setInterval(() => {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                if (time > 0) {
                    time--;
                } else {
                    clearInterval(timer);
                }
            }, 1000);
        });
    }

    function setupCalendar() {
        const calendarEl = document.getElementById('calendar-content');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            selectable: true,
            editable: true,
            events: [],
            select: function(info) {
                const title = prompt('Enter event title:');
                if (title) {
                    calendar.addEvent({
                        title: title,
                        start: info.startStr,
                        end: info.endStr,
                        allDay: info.allDay
                    });
                }
                calendar.unselect();
            },
            eventClick: function(info) {
                if (confirm(`Are you sure you want to delete the event '${info.event.title}'?`)) {
                    info.event.remove();
                }
            }
        });
        calendar.render();
    }
});

function toggleFaq(faqNumber) { const faqContent = 
    document.getElementById(`faq${faqNumber}`); 
    const icon = faqContent.previousElementSibling.querySelector('i'); 
    if (faqContent.classList.contains('hidden')) { faqContent.classList.remove('hidden'); 
        icon.classList.remove('fa-chevron-down'); icon.classList.add('fa-chevron-up'); } 
        else { faqContent.classList.add('hidden'); 
    icon.classList.remove('fa-chevron-up'); icon.classList.add('fa-chevron-down');
 } }