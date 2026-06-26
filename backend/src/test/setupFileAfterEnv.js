import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'

import { initDatabase } from '../db/init'

// This file serves as a global setup and teardown for Jest integration tests,
// specifically managing the database connection lifecycle.

/**
 * Global setup hook for Jest.
 * Establishes a database connection before all test suites run.
 * This ensures tests have a connected database instance available.
 */
beforeAll(async () => {
  // Initializes the database connection for testing.
  // This typically connects to a test-specific MongoDB instance.
  await initDatabase()
})

/**
 * Global teardown hook for Jest.
 * Disconnects from the database after all test suites have finished.
 * This frees up resources and ensures a clean state for subsequent test runs.
 */
afterAll(async () => {
  await mongoose.disconnect()
})
