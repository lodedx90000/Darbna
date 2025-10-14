/* =======================================================
   admin.js — Darbna Admin Dashboard Logic
   Author: KSA-IT | © 2025 Darbna
   ======================================================= */

// --- MOCK DATA (temporary demo data until backend integration) ---
const mockAdmin = {
  email: "admin@darbna.sa",
  password: "admin123"
};

const mockUsers = [
  { id: 1, name: "Khalid Alhaddad", email: "khalid@darbna.sa", joined: "2025-03-21" },
  { id: 2, name: "Adel Alshalabi", email: "adel@darbna.sa", joined: "2025-03-22" },
  { id: 3, name: "Hadi Alhabobi", email: "hadi@darbna.sa", joined: "2025-03-24" },
  { id: 4, name: "Sarah Ahmed", email: "sarah@darbna.sa", joined: "2025-03-27" },
  { id: 5, name: "Mohammed Kareem", email: "mk@darbna.sa", joined: "2025-04-01" }
];

const mockStats = {
  totalUsers: 2458,
  totalRides: 1365,
  pendingApprovals: 24,
  totalReports: 8
};

// --- LOGIN HANDLER ---
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("admin-login-form");
  const dashboardUsers = document.getElementById("user-table");

  // Admin Login Page
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("admin-email").value.trim();
      const password = document.getElementById("admin-password").value.trim();

      if (email === mockAdmin.email && password === mockAdmin.password) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin-dashboard.html";
      } else {
        alert("Invalid credentials. Please try again.");
      }
    });
  }

  // Admin Dashboard Page
  if (window.location.pathname.includes("admin-dashboard.html")) {
    // Check login
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      alert("You must log in first!");
      window.location.href = "admin-login.html";
      return;
    }

    // Populate dashboard stats
    document.getElementById("total-users").textContent = mockStats.totalUsers;
    document.getElementById("total-rides").textContent = mockStats.totalRides;
    document.getElementById("pending-approvals").textContent = mockStats.pendingApprovals;
    document.getElementById("total-reports").textContent = mockStats.totalReports;

    // Populate user table
    dashboardUsers.innerHTML = mockUsers.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.joined}</td>
      </tr>
    `).join("");

    // Logout handler
    const logoutBtn = document.querySelector(".btn-secondary");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("isAdminLoggedIn");
        window.location.href = "admin-login.html";
      });
    }
  }
});