const profileData = {
  skills: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Node.js",
    "Responsive Design",
    "Git & GitHub",
    "REST APIs"
  ],
  projects: [
    {
      title: "Portfolio Website",
      description: "A modern personal website highlighting projects, experience, and contact details.",
      link: "#"
    },
    {
      title: "Frontend UI Project",
      description: "Responsive UI implementation with reusable components and smooth interactions.",
      link: "#"
    },
    {
      title: "JavaScript Web App",
      description: "Interactive app focused on clean logic, maintainability, and user experience.",
      link: "#"
    }
  ],
  experience: [
    {
      role: "Web Development",
      period: "Recent",
      summary: "Building and improving web interfaces with a focus on usability and performance."
    },
    {
      role: "Continuous Learning",
      period: "Ongoing",
      summary: "Expanding expertise across frontend and backend tools through practical projects."
    }
  ]
};

const skillsList = document.getElementById("skills-list");
const projectsList = document.getElementById("projects-list");
const experienceList = document.getElementById("experience-list");

profileData.skills.forEach((skill) => {
  const chip = document.createElement("span");
  chip.textContent = skill;
  skillsList.appendChild(chip);
});

profileData.projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h4");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const link = document.createElement("a");
  link.href = project.link;
  link.textContent = "View project →";

  card.append(title, description, link);
  projectsList.appendChild(card);
});

profileData.experience.forEach((item) => {
  const wrapper = document.createElement("article");
  wrapper.className = "timeline-item";

  const role = document.createElement("h4");
  role.textContent = `${item.role} · ${item.period}`;

  const summary = document.createElement("p");
  summary.textContent = item.summary;

  wrapper.append(role, summary);
  experienceList.appendChild(wrapper);
});

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");
menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();
