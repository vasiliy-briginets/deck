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

import { IPromise } from 'angular';

import { IServerGroup } from 'core/domain';
import { YandexDeployConfiguration } from 'yandex/domain/configure/YandexDeployConfiguration';

export class YandexServerGroupTransformer {
  public static $inject = ['$q'];

  public constructor(private $q: ng.IQService) {}

  public normalizeServerGroup(serverGroup: IServerGroup): IPromise<IServerGroup> {
    return this.$q.resolve(serverGroup);
  }

  public convertServerGroupCommandToDeployConfiguration(base: any): YandexDeployConfiguration {
    // return new YandexDeployConfiguration(base);
    const command = _.defaults({ viewState: [] }, base);
    if (base.viewState.mode !== 'clone') {
      delete command.source;
    }
    command.cloudProvider = 'yandex';
    command.provider = 'yandex';
    command.account = command.credentials;
    command.availabilityZones = {};

    // We took this approach to avoid a breaking change to existing pipelines.
    delete command.viewState;
    delete command.backingData;
    delete command.selectedProvider;
    delete command.providerType;

    return command;
  }
}
