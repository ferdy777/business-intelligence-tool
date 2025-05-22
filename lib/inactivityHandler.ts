let timeout: ReturnType<typeof setTimeout> | null = null;

export const startInactivityTimer = (
  logout: () => void,
  keepLoggedIn: boolean
) => {
  if (timeout) clearTimeout(timeout);

  if (!keepLoggedIn) {
    timeout = setTimeout(() => {
      logout();
      alert("You have been logged out due to inactivity.");
      timeout = null;
    }, 60000);
  }
};

export const resetInactivityTimer = (
  logout: () => void,
  keepLoggedIn: boolean
) => {
  startInactivityTimer(logout, keepLoggedIn);
};
