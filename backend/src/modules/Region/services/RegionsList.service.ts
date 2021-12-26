import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IWorkerRegion } from '@app/shared';

import * as Docker from 'dockerode';

// IRegion interface
export interface IRegion extends IWorkerRegion {
  // Stats
  containers?: {
    all: number,
    running: number,
  },
  memory?: number,

  // Technical
  id: string,
  auth?: {
    host: string;
    port: number;
  },
  instance?: Docker,
};

// Exporting RegionsService
@Injectable()
export class RegionsListService implements OnApplicationBootstrap {
  private readonly logger = new Logger(RegionsListService.name);

  // Public array of regions
  // +todo dynamically update this
  // array?
  public regions: IRegion[] = [
    {
      id: 'test-region-01',
      name: 'Test Region',
      location: 'Somewhere in Europe',
      auth: {
        host: '152.67.89.60',
        port: 2375,
      }
    }
  ];

  private checkingRegions: boolean = false;

  // On Bootstrap we'll create
  // new dockerode instances for each region
  async onApplicationBootstrap() {
    this.logger.warn('Creating Docker API instances for each region');

    this.regions = await Promise.all(this.regions.map(async (region) => {
      this.logger.warn(`[${region.name}] Creating instance...`);
      
      // Creating new Dockerode instance
      const instance = new Docker({
        protocol: 'http',
        host: region.auth?.host,
        port: region.auth?.port,
      });
      
      // +todo
      // check if instance is running

      return {
        ...region,
        instance
      };
    }));
  };

  // Cron task, that'll dynamically fetch Region's states
  // and dynamically update this.regions array.
  @Cron(CronExpression.EVERY_5_SECONDS)
  public async checkRegions() {
    if (this.checkingRegions) return;

    // Checking regions
    this.checkingRegions = true;

    for (const region of this.regions) {
      if (region.instance) {
        const instance = region.instance;

        // Getting instance stats
        const stats = await instance.info();
        
        // Container stats
        const containers = {
          all: stats['Containers'] ?? 0,
          running: stats['ContainersRunning'] ?? 0,
        };

        // Memory stats (in MB)
        const memory = ((stats['MemTotal'] ?? 0) / (1024*1024)).toFixed(0);

        // Updating this instance in this.regions list
        Object.assign(this.regions.find((x) => x == region), { ...region, containers, memory });
      };
    };

    this.checkingRegions = false;
  };
};
