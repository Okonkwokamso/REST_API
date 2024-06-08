import mongoose from 'mongoose';
import config from 'config';
import logger from './logger'

const connect = async () => {
  const dbUri = config.get('dbUri') as string;

  try {
    await mongoose.connect(dbUri);
    logger.info('Database connected');
  } catch (err) {
    console.error(err);
    logger.error('Database connection failed');
    process.exit(1);
    
  }
};

export default connect;


