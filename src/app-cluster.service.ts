const cluster = require('cluster');
import { cpus } from 'os';
import { Injectable, Logger } from '@nestjs/common';

const numCPUs = cpus().length;
@Injectable()
export class AppClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isPrimary) {
      Logger.log(`Master server started on ${process.pid}`);
      //ensure workers exit cleanly 
      process.on('SIGINT', function () {
        Logger.log('Cluster shutting down...');
        for (var id in cluster.workers) {
          cluster.workers[id].kill();
        }
        // exit the master process
        process.exit(0);
      });
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('online', function (worker) {
        Logger.log(`Worker ${worker.process.pid} is online`);
      });
      cluster.on('exit', (worker) => {
        Logger.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      Logger.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
