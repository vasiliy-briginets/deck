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

import { IInstance, IServerGroup } from '@spinnaker/core';
import { IYandexLoadBalancer } from './IYandexLoadBalancer';

export interface ICpuUtilizationRule {
  utilizationTarget: number;
}

export interface ICustomRule {
  metricName: string;
  target: number;
  metricType: any;
  ruleType: any;
}

export interface IAutoScalePolicy {
  minZoneSize: number;
  maxSize: number;
  measurementDuration: number;
  warmupDuration: number;
  stabilizationDuration: number;
  initialSize: number;
  cpuUtilizationRule: ICpuUtilizationRule;
  customRules: ICustomRule[];
}

export interface IDeployPolicy {
  maxUnavailable: number;
  maxExpansion: number;
  maxDeleting: number;
  maxCreating: number;
  startupDuration: number;
}

export interface ISchedulingPolicy {
  preemptible: boolean;
}

export interface IResourcesSpec {
  memory: number;
  cores: number;
  coreFraction: number;
  gpus: number;
}

export interface IDiskSpec {
  description: string;
  typeId: string;
  size: number;
  imageId: string;
  snapshotId: string;
}

export interface IAttachedDiskSpec {
  mode: any;
  deviceName: string;
  diskSpec: IDiskSpec;
}

export interface IPrimaryAddressSpec {
  oneToOneNat: boolean;
}

export interface INetworkInterfaceSpec {
  networkId: string;
  subnetIds: string[];
  primaryV4AddressSpec?: IPrimaryAddressSpec;
  primaryV6AddressSpec?: IPrimaryAddressSpec;
}

export interface IInstanceTemplate {
  description: string;
  labels?: { [key: string]: string };
  platformId: string;
  resourcesSpec: IResourcesSpec;
  metadata?: { [key: string]: string };
  bootDiskSpec: IAttachedDiskSpec;
  secondaryDiskSpecs: IAttachedDiskSpec[];
  networkInterfaceSpecs: INetworkInterfaceSpec[];
  schedulingPolicy: ISchedulingPolicy;
  serviceAccountId: string;
}

export interface ILoadBalancerIntegration {
  targetGroupId: string;
  statusMessage: string;
  targetGroupSpec: ITargetGroupSpec;
  balancers: IYandexLoadBalancer[];
}

export interface ITargetGroupSpec {
  name: string;
  description: string;
  labels?: { [key: string]: string };
}

export interface IHealthCheckSpec {
  type: any;
  port: number;
  path: string;
  interval: number;
  timeout: number;
  unhealthyThreshold: number;
  healthyThreshold: number;
}

export interface IYandexInstance extends IInstance {
  labels?: { [key: string]: string };
  // loadBalancers?: string[];
  // serverGroup?: string;
}

export interface IYandexServerGroup extends IServerGroup {
  id: string;
  folder: string;
  zones: string[];
  description: string;
  serviceAccountId: string;
  autoScalePolicy: IAutoScalePolicy;
  deployPolicy: IDeployPolicy;
  status: any;
  instanceTemplate: IInstanceTemplate;

  instances: IYandexInstance[];
  loadBalancerIntegration: ILoadBalancerIntegration;
  loadBalancersWithHealthChecks?: { [key: string]: IHealthCheckSpec[] };
  healthCheckSpecs?: IHealthCheckSpec[];
}
