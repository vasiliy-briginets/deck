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

import { IArtifact, IServerGroupCommand } from '@spinnaker/core';
import {
  IAutoScalePolicy,
  IDeployPolicy,
  IHealthCheckSpec,
  IInstanceTemplate,
  ILoadBalancerIntegration,
} from 'yandex/domain';

export interface IYandexServerGroupCommand extends IServerGroupCommand {
  imageSource: string;
  applicationArtifact?: IYandexArtifact;
  zones: string[];
  groupSize: number;
  serviceAccountId: string;
  autoScalePolicy: IAutoScalePolicy; //todo(briginets): support
  deployPolicy: IDeployPolicy;
  instanceTemplate: IInstanceTemplate;
  loadBalancerIntegration: ILoadBalancerIntegration;
  healthCheckSpecs?: IHealthCheckSpec[];
  labels?: { [key: string]: string };
}

export interface IYandexArtifact {
  artifact?: IArtifact;
  artifactId?: string;
}
