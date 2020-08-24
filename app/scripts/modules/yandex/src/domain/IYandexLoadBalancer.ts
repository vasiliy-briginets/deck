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

import { ILoadBalancer, ILoadBalancerUpsertCommand } from '@spinnaker/core';
import { IYandexServerGroup } from '.';

export interface IYandexLoadBalancer extends ILoadBalancer {
  id: string;
  credentials?: string;
  balancerType: string;
  serverGroups: IYandexServerGroup[];
  listeners: IYandexLBListener[];
}

export interface IYandexLBListener {
  name: string;
  port: number;
  targetPort: number;
  protocol: string;
  ipVersion: string;
  address: string;
  subnetId: string;
}

export interface IYandexLoadBalancerUpsertCommand extends ILoadBalancerUpsertCommand {
  lbType: string;
  serverGroups: IYandexServerGroup[];
  listeners: IYandexLBListener[];
}
