import Redis from 'ioredis';
import { config } from 'dotenv';
config();

const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

redis.on('connect', () => {
  console.log('Redis bağlantısı başarılı!');
});

redis.on('error', (err) => {
  console.error('Redis bağlantı hatası:', err);
});

export default redis;
