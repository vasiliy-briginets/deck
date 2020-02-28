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

import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';

import { IServerGroupDetailsProps, ServerGroupReader } from '@spinnaker/core';

import { IYandexServerGroup } from 'yandex/domain';

function extractServerGroupSummary(props: IServerGroupDetailsProps): IPromise<IYandexServerGroup> {
  const { app, serverGroup } = props;
  return app.ready().then(() => {
    const summary: IYandexServerGroup = app.serverGroups.data.find((toCheck: IYandexServerGroup) => {
      return (
        toCheck.name === serverGroup.name &&
        toCheck.account === serverGroup.accountId &&
        toCheck.region === serverGroup.region
      );
    });
    if (!summary) {
      // app.loadBalancers.data.some((loadBalancer: ICloudFoundryLoadBalancer) => {
      //   if (loadBalancer.account === serverGroup.accountId && loadBalancer.region === serverGroup.region) {
      //     return loadBalancer.serverGroups.some(possibleServerGroup => {
      //       if (possibleServerGroup.name === serverGroup.name) {
      //         summary = possibleServerGroup;
      //         return true;
      //       }
      //       return false;
      //     });
      //   }
      //   return false;
      // });
    }
    return summary;
  });
}

export function yandexServerGroupDetailsGetter(
  props: IServerGroupDetailsProps,
  autoClose: () => void,
): Observable<IYandexServerGroup> {
  const { app, serverGroup: serverGroupInfo } = props;
  return new Observable<IYandexServerGroup>(observer => {
    extractServerGroupSummary(props).then(summary => {
      ServerGroupReader.getServerGroup(
        app.name,
        serverGroupInfo.accountId,
        serverGroupInfo.region,
        serverGroupInfo.name,
      ).then((serverGroup: IYandexServerGroup) => {
        // it's possible the summary was not found because the clusters are still loading
        Object.assign(serverGroup, summary, { account: serverGroupInfo.accountId });

        if (!isEmpty(serverGroup)) {
          observer.next(serverGroup);
        } else {
          autoClose();
        }
      }, autoClose);
    }, autoClose);
  });
}
