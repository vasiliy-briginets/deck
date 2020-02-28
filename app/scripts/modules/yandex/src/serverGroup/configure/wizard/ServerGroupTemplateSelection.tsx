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

import { Application, DeployInitializer, ITemplateSelectionText } from '@spinnaker/core';

import { IYandexServerGroupCommand } from 'yandex/domain/configure/IYandexServerGroupCommand';
import * as React from 'react';

export interface IServerGroupTemplateSelectionProps {
  app: Application;
  command: IYandexServerGroupCommand;
  onDismiss: () => void;
  onTemplateSelected: () => void;
}

export interface IServerGroupTemplateSelectionState {
  templateSelectionText: ITemplateSelectionText;
}

export class ServerGroupTemplateSelection extends React.Component<
  IServerGroupTemplateSelectionProps,
  IServerGroupTemplateSelectionState
> {
  constructor(props: IServerGroupTemplateSelectionProps) {
    super(props);
    this.state = {
      templateSelectionText: {
        copied: [
          'network, subnets, cluster name (stack, details)',
          'load balancers',
          'instance template',
          'all fields on the Advanced Settings page',
        ],
        notCopied: [],
        additionalCopyText: '',
      },
    };
  }

  public render() {
    const { app, command, onDismiss, onTemplateSelected } = this.props;
    const { templateSelectionText } = this.state;

    return (
      <DeployInitializer
        cloudProvider="yandex"
        application={app}
        command={command}
        onDismiss={onDismiss}
        onTemplateSelected={onTemplateSelected}
        templateSelectionText={templateSelectionText}
      />
    );
  }
}
