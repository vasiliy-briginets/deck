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

import * as React from 'react';

import { CollapsibleSection } from '@spinnaker/core';

import { IYandexServerGroupDetailsSectionProps } from './IYandexServerGroupDetailsSectionProps';

export class YandexScalingPoliciesDetailsSection extends React.Component<IYandexServerGroupDetailsSectionProps> {
  constructor(props: IYandexServerGroupDetailsSectionProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { serverGroup } = this.props;
    return (
      <CollapsibleSection heading="Scaling Policies">
        <dl className="dl-horizontal dl-flex">
          <dt>Deploy policy</dt>
          <dd>
            <div>Max unavailable: {serverGroup.deployPolicy.maxUnavailable}</div>
            <div>Max expansion: {serverGroup.deployPolicy.maxExpansion}</div>
            <div>Max deleting: {serverGroup.deployPolicy.maxDeleting}</div>
            <div>Max creating: {serverGroup.deployPolicy.maxCreating}</div>
            <div>Startup duration: {serverGroup.deployPolicy.startupDuration}</div>
          </dd>
          <hr />
          {!serverGroup.autoScalePolicy && (
            <div>
              <dt>Scale type</dt>
              <dd>fixed</dd>
              <dt>Size</dt>
              <dd>{serverGroup.capacity.desired}</dd>
            </div>
          )}
          {serverGroup.autoScalePolicy && (
            <div>
              <dt>Scale type</dt>
              <dd>auto</dd>
              <div>
                <dt>Min zone size</dt>
                <dd>{serverGroup.autoScalePolicy.minZoneSize}</dd>
                <dt>Max group size</dt>
                <dd>{serverGroup.autoScalePolicy.maxSize}</dd>
                <dt>Measurement duration</dt>
                <dd>{serverGroup.autoScalePolicy.measurementDuration}</dd>
                <dt>Warmup duration</dt>
                <dd>{serverGroup.autoScalePolicy.warmupDuration}</dd>
                <dt>Stabilization duration</dt>
                <dd>{serverGroup.autoScalePolicy.stabilizationDuration}</dd>
                {serverGroup.autoScalePolicy.cpuUtilizationRule && <dt>Cpu utilization target</dt>}
                {serverGroup.autoScalePolicy.cpuUtilizationRule && (
                  <dd>{serverGroup.autoScalePolicy.cpuUtilizationRule.utilizationTarget}</dd>
                )}
                {serverGroup.autoScalePolicy.customRules && (
                  <ul>
                    {serverGroup.autoScalePolicy.customRules.map(rule => (
                      <li>
                        {rule.ruleType} {rule.metricType} {rule.metricName} {rule.target}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </dl>
      </CollapsibleSection>
    );
  }
}
