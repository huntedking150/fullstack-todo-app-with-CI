/**
 * Global teardown function for test environments.
 * This function is typically configured in a test runner (e.g., Jest) to execute once
 * after all test suites have completed. Its primary responsibility is to clean up
 * global resources initialized during the global setup phase.
 */
export default async function globalTeardown() {
  // Stops the globally accessible MongoDB instance.
  // This ensures the database connection is properly closed and system resources are released,
  // preventing resource leaks or hanging processes after tests conclude.
  await global.__MONGOINSTANCE.stop()
}
