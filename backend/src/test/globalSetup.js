import { MongoMemoryServer } from 'mongodb-memory-server'

/**
 * Global setup function for the test environment.
 * This function is typically executed once before all test suites.
 * It initializes an ephemeral in-memory MongoDB server for testing purposes.
 */
export default async function globalSetup() {
  /**
   * Creates a new in-memory MongoDB server instance.
   * Specifying the binary version helps ensure compatibility with the application's MongoDB driver.
   */
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '8.3.3', // Defines the specific MongoDB binary version to download and use.
    },
  })
  // Stores the `MongoMemoryServer` instance globally.
  // This allows subsequent access to the instance in other global hooks, such as `globalTeardown`,
  // to stop the server and clean up resources.
  global.__MONGOINSTANCE = instance
  // Sets the `DATABASE_URL` environment variable to the connection URI of the in-memory MongoDB instance.
  // This allows database connection logic within tests to seamlessly connect to the ephemeral test database.
  process.env.DATABASE_URL = instance.getUri()
}
