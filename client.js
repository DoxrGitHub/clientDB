class Client {
  constructor() {
    this.storage = localStorage;
    this.initializeStorage();
  }

  initializeStorage() {
    const data = this.storage.getItem('dbData') || '{}';
    const jsonData = JSON.parse(data);
    this.storage.setItem('dbData', JSON.stringify(jsonData));
  }

  async get(key) {
    try {
      const data = this.storage.getItem('dbData');
      if (!data) {
        await this.initializeStorage();
        return null;
      }
      const jsonData = JSON.parse(data);
      return jsonData[key];
    } catch (error) {
      return `Error getting value for key: ${error.message}`;
    }
  }

  async set(key, value) {
    try {
      const data = this.storage.getItem('dbData') || '{}';
      const jsonData = JSON.parse(data);
      jsonData[key] = value;

      this.storage.setItem('dbData', JSON.stringify(jsonData));
    } catch (error) {
      return `Error setting key-value pair: ${error.message}`;
    }
  }

  async delete(key) {
    try {
      const data = this.storage.getItem('dbData');
      if (!data) {
        await this.initializeStorage();
        return null;
      }
      const jsonData = JSON.parse(data);
      delete jsonData[key];

      this.storage.setItem('dbData', JSON.stringify(jsonData));
    } catch (error) {
      return `Error deleting key: ${error.message}`;
    }
  }

  async list(prefix = '') {
    try {
      const data = this.storage.getItem('dbData');
      if (!data) {
        await this.initializeStorage();
        return [];
      }
      const jsonData = JSON.parse(data);
      const keys = Object.keys(jsonData);

      const matches = prefix? keys.filter(key => key.startsWith(prefix)) : keys;

      return Promise.resolve(matches);
    } catch (error) {
      return Promise.reject(new Error(`Error listing keys: ${error.message}`));
    }
  }
}
