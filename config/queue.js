"use strict";

const Env = use("Env");

module.exports = {
  driver: "redis", // :> 'redis' , 'rabbitmq'
  redis: {
    url: "_",
    high: {
      prefix: "pearlbet-job-",
      stallInterval: 5000,
      nearTermWindow: 1200000,
      delayedDebounce: 1000,
      redis: {
        host: Env.get("REDIS_HOST", "127.0.0.1"),
        port: Env.get("REDIS_PORT", 6379),
        password: Env.get("REDIS_PASSWORD", null),
        db: Env.get("REDIS_DB_JOB", 1),
        keyPrefix: Env.get("REDIS_PREFIX", ""),
        options: { attempt: 20 },
        retry_strategy(options) {
          return Math.min(options.attempt * 100, 3000);
        }
      },
      isWorker: true,
      getEvents: true,
      sendEvents: true,
      storeJobs: true,
      ensureScripts: true,
      maxConcurrencyJobs: 4,
      activateDelayedJobs: true,
      removeOnSuccess: true,
      removeOnFailure: false,
      redisScanCount: 100
    },
    low: {
      prefix: "pearlbet-low-job-",
      stallInterval: 8000,
      nearTermWindow: 1200000,
      delayedDebounce: 2000,
      redis: {
        host: Env.get("REDIS_HOST", "127.0.0.1"),
        port: Env.get("REDIS_PORT", "6379"),
        db: 2,
        options: { attempt: 20 },
        retry_strategy(options) {
          return Math.min(options.attempt * 100, 3000);
        }
      },
      isWorker: true,
      getEvents: true,
      sendEvents: true,
      storeJobs: true,
      ensureScripts: true,
      maxConcurrencyJobs: 4,
      activateDelayedJobs: true,
      removeOnSuccess: true,
      removeOnFailure: false,
      redisScanCount: 150
    }
  },
  rabbitmq: {
    url: Env.get("RABBIT_MQ_URL", "amqp://localhost"),
    high: {
      prefetch: 1, // default prefetch from queue
      replyPattern: false, // if reply pattern is enabled an exclusive queue is created
      scheduledPublish: false,
      prefix: "pearlbet-job-", // prefix all queues with an application name
      socketOptions: {} // socketOptions will be passed as a second param to amqp.connect and from ther to the socket library (net or tls)
    },
    low: {
      prefetch: 1, // default prefetch from queue
      replyPattern: false, // if reply pattern is enabled an exclusive queue is created
      scheduledPublish: false,
      prefix: "pearlbet-low-job-", // prefix all queues with an application name
      socketOptions: {} // socketOptions will be passed as a second param to amqp.connect and from ther to the socket library (net or tls)
    }
  }
};
