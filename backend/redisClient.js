const redis = require('redis');

// Redis istemcisini oluştur
const client = redis.createClient({
  url: 'redis://localhost:6379'
});

// Redis bağlantısını başlat
client.on('error', (err) => {
  console.error('Redis bağlantı hatası:', err);
});

client.connect();

module.exports = client;
