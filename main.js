
// Function to toggle the responsive menu
function toggleMenu() {
    const menu = document.querySelector(".toggle-menu");
    menu.classList.toggle("active");

    // Close menu after clicking a link
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });
}

// Trigger animations
document.addEventListener('scroll', () => {
    document.querySelectorAll('.fade-in').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.getElementById("about-content");

    async function fetchGitHubProfile() {
        const username = "Smlchinaza";
        const response = await fetch(`https://api.github.com/users/${username}`);
        const profile = await response.json();

        aboutSection.innerHTML = `
            <div class="name-text">CHUKWUEMEKA, SAMUEL CHINAZA</div>
            <img src="${profile.avatar_url}" alt="Profile Picture" class="about-avatar">
            <div class="about-text">
                <h2>About Me</h2>
                <p>${profile.bio || "No bio available."}</p>
                
                <a href="${profile.html_url}" target="_blank" class="github-profile-button">View GitHub Profile</a>
            </div>
        `;
    }

    fetchGitHubProfile();
});

document.addEventListener("DOMContentLoaded", async () => {
    const projectList = document.getElementById("project-list");

    // List of specific repositories to display
    const featuredRepos = new Set([
        "crypto-payment-gateway",
        "satoshi-vision",
        "Crowdfunding",
        "AirBnB_clone_v4",
        "spont"
    ]);

    async function fetchGitHubRepos() {
        try {
            const username = "Smlchinaza";
            const response = await fetch(`https://api.github.com/users/${username}/repos`);

            if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);

            const repos = await response.json();
            projectList.innerHTML = ""; // Clear existing projects

            // Filter only the featured repositories
            const selectedRepos = repos.filter(repo => featuredRepos.has(repo.name));

            if (selectedRepos.length === 0) {
                projectList.innerHTML = "<p>No featured projects found.</p>";
                return;
            }

            selectedRepos.forEach((repo, index) => {
                const repoItem = document.createElement("div");
                repoItem.classList.add("project-card", "fade-in");

                // Delay animation for a staggered effect
                setTimeout(() => {
                    repoItem.classList.add("visible");
                }, index * 200);

                repoItem.innerHTML = `
                    <div class="project-header">
                        <h3>${repo.name.replace(/-/g, " ")}</h3>
                        <div class="repo-meta">
                            <span>⭐ ${repo.stargazers_count}</span>
                            <span>🍴 ${repo.forks_count}</span>
                        </div>
                    </div>
                    <p class="project-description">${repo.description || "No description available."}</p>
                    <div class="repo-footer">
                        <span class="repo-language">${repo.language || "Unknown"}</span>
                        <a href="${repo.html_url}" target="_blank" class="repo-button">View on GitHub</a>
                    </div>
                `;

                projectList.appendChild(repoItem);
            });
        } catch (error) {
            console.error(error);
            projectList.innerHTML = "<p>Failed to load projects. Try again later.</p>";
        }
    }

    fetchGitHubRepos();
});

document.addEventListener("DOMContentLoaded", () => {
    const skillsList = document.getElementById("skills-list");

    async function fetchGitHubSkills() {
        const username = "Smlchinaza"; // Replace with your GitHub username
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();

        let languageCount = {};
        let totalLanguages = 0;

        // Count occurrences of each programming language
        for (const repo of repos) {
            if (repo.language) {
                languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
                totalLanguages++;
            }
        }

        // Sort languages by usage frequency
        const sortedLanguages = Object.entries(languageCount)
            .sort((a, b) => b[1] - a[1]);

        skillsList.innerHTML = ""; // Clear existing skills list

        sortedLanguages.forEach(([language, count]) => {
            const percentage = ((count / totalLanguages) * 100).toFixed(1); // Calculate percentage
            const skillItem = document.createElement("li");
            skillItem.classList.add("skill-item");

            // Language icons mapping (you can add more icons here)
            const languageIcons = {
                "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
                "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                "Ruby": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
                "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
                "Rust": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg"
            };

            const iconUrl = languageIcons[language] || "https://via.placeholder.com/30?text=?"; // Default icon if not found

            skillItem.innerHTML = `
                <img src="${iconUrl}" alt="${language} icon" class="skill-icon">
                <span class="skill-name">${language}</span>
                <span class="skill-percentage">${percentage}%</span>
            `;

            skillsList.appendChild(skillItem);
        });
    }

    fetchGitHubSkills();
});

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Load user preference from localStorage
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-mode");

        // Save user preference
        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌙";
        }
    });
});
