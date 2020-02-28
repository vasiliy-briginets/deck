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

import { AccountTag, CollapsibleSection, timestamp } from '@spinnaker/core';
import { IYandexServerGroupDetailsSectionProps } from './IYandexServerGroupDetailsSectionProps';

export class YandexServerGroupDetailsSection extends React.Component<IYandexServerGroupDetailsSectionProps> {
  constructor(props: IYandexServerGroupDetailsSectionProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { serverGroup } = this.props;
    const igUrl =
      'https://console.cloud.yandex.ru/folders/' + serverGroup.folder + '/compute/instance-group/' + serverGroup.id;
    return (
      <CollapsibleSection heading="Server Group Information" defaultExpanded={true}>
        <dl className="dl-horizontal dl-flex">
          <dt>Id</dt>
          <dd>
            <a href={igUrl} target="_blank">
              {serverGroup.id}
            </a>
          </dd>

          <dt>Name</dt>
          <dd>{serverGroup.name}</dd>

          <dt>Description</dt>
          <dd>{serverGroup.description}</dd>

          <dt>Created</dt>
          <dd>{timestamp(serverGroup.createdTime)}</dd>

          <dt>Account</dt>
          <dd>
            <AccountTag account={serverGroup.account} />
          </dd>

          <dt>Zones</dt>
          <dd>
            <ul>
              {serverGroup.zones.map(zone => (
                <li key={zone}>{zone}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </CollapsibleSection>
    );
  }
}
