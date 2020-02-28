/*
 * Copyright 2020 Netflix, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IArtifact } from 'core/domain';
import { IYandexServerGroupCommand } from 'yandex/domain/configure/IYandexServerGroupCommand';
import {
  IAutoScalePolicy,
  IDeployPolicy,
  IHealthCheckSpec,
  IInstanceTemplate,
  ILoadBalancerIntegration,
} from 'yandex/domain';

export class YandexDeployConfiguration {
  account: string;
  application: string;
  freeFormDetails?: string;
  region: string;
  stack?: string;
  strategy?: string;

  imageSource: string;
  applicationArtifact?: IYandexArtifact;
  zones: string[];
  groupSize: number;
  serviceAccountId: string;
  autoScalePolicy: IAutoScalePolicy;
  deployPolicy: IDeployPolicy;
  instanceTemplate: IInstanceTemplate;
  loadBalancerIntegration: ILoadBalancerIntegration;
  healthCheckSpecs?: IHealthCheckSpec[];
  labels?: { [key: string]: string };

  constructor(command: IYandexServerGroupCommand) {
    // this.provider
    // this.provider
    this.account = command.credentials;
    this.application = command.application;
    this.stack = command.stack;
    this.freeFormDetails = command.freeFormDetails;
    this.region = command.region;
    this.strategy = command.strategy;
    this.imageSource = command.imageSource;
    this.applicationArtifact = command.applicationArtifact;
    this.zones = command.zones;
    this.groupSize = command.groupSize;
    this.serviceAccountId = command.serviceAccountId;
    this.autoScalePolicy = command.autoScalePolicy;
    this.deployPolicy = command.deployPolicy;
    this.instanceTemplate = command.instanceTemplate;
    this.loadBalancerIntegration = command.loadBalancerIntegration;
    this.healthCheckSpecs = command.healthCheckSpecs;
    this.labels = command.labels;
  }
}

export interface IYandexArtifact {
  // one of these two are required
  artifact?: IArtifact;
  artifactId?: string;
}
