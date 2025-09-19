const getDbNameFromEmail = (email: string) => {
  const domain = email.split('@')[1]; // example: "example.com"
  const dbName = domain.replace(/\./g, '_'); // replace dots with underscores
  return dbName; // e.g., "example_com"
};

export default getDbNameFromEmail;