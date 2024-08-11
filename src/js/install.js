const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// Event handler for the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("beforeinstallprompt event fired");

  // Prevent the default behavior of the event
  event.preventDefault();

  // Store the event
  window.deferredPrompt = event;

  // Make the install button visible by removing the 'hidden' class
  butInstall.classList.remove("hidden");
  console.log("Install button shown");
});

// Event handler for the install button click
butInstall.addEventListener("click", async () => {
  console.log("Install button clicked");

  // Retrieve the deferred prompt event
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    console.log("No deferred prompt available");
    return;
  }

  // Show the install prompt
  promptEvent.prompt();

  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;
  console.log("User response to prompt:", result.outcome);

  // Reset the deferred prompt variable
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.add("hidden");
});

// Event handler for the `appinstalled` event
window.addEventListener("appinstalled", () => {
  console.log("PWA was installed");

  // Clear the deferred prompt
  window.deferredPrompt = null;
});