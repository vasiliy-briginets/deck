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

import { CloudProviderRegistry, DeploymentStrategyRegistry } from '@spinnaker/core';

import './logo/yandex.logo.less';

import { YandexServerGroupTransformer } from 'yandex/serverGroup';
import { YandexServerGroupActions } from 'yandex/serverGroup/details/YandexServerGroupActions';
import { yandexServerGroupDetailsGetter } from './serverGroup/details/YandexServerGroupDetailsGetter';
import { YandexServerGroupDetailsSection } from 'yandex/serverGroup/details/sections/YandexServerGroupDetailsSection';
import { YandexCapacityDetailsSection } from './serverGroup/details/sections/YandexCapacityDetailsSection';
import { YandexLogsDetailsSection } from 'yandex/serverGroup/details/sections/YandexLogsDetailsSection';
import { YandexHealthDetailsSection } from 'yandex/serverGroup/details/sections/YandexHealthDetailsSection';
import { YandexLaunchConfigDetailsSection } from './serverGroup/details/sections/YandexLaunchConfigDetailsSection';
import { YandexScalingPoliciesDetailsSection } from 'yandex/serverGroup/details/sections/YandexScalingPoliciesDetailsSection';
import { YandexPackageDetailsSection } from 'yandex/serverGroup/details/sections/YandexPackageDetailsSection';
import { YandexLabelsDetailsSection } from './serverGroup/details/sections/YandexLabelsDetailsSection';
import { YandexServerGroupCommandBuilder } from './serverGroup/configure/serverGroup.commandBuilder';
import { YandexServerGroupWizard } from 'yandex/serverGroup/configure';
import { YandexImageReader } from './image';
import 'yandex/pipeline/stages/bake/yandexBakeStage.module.ts';
import 'yandex/pipeline/stages/cloneServerGroup/yandexCloneServerGroupStage.module';
import 'yandex/pipeline/stages/destroyServerGroup/yandexDestroyServerGroupStage.module';
import 'yandex/pipeline/stages/enableDisableServerGroup/yandexDisableSgStage.module';
import 'yandex/pipeline/stages/enableDisableServerGroup/yandexEnableSgStage.module';
import 'yandex/pipeline/stages/findImageFromTags/yandexFindImageFromTagsStage.module';
import 'yandex/pipeline/stages/resizeServerGroup/yandexResizeServerGroupStage.module';
import 'yandex/deploymentStrategy/rollingUpdate.strategy.ts';
import { module } from 'angular';
import { SUBNET_RENDERER } from 'yandex/subnet';
import { YandexInstanceDetails } from 'yandex/instance/details';
import { YandexLoadBalancerDetails, YandexLoadBalancerModal, YandexLoadBalancerTransformer } from 'yandex/loadBalancer';

export const YANDEX_MODULE = 'spinnaker.yandex';
module(YANDEX_MODULE, [SUBNET_RENDERER]).config(() => {
  CloudProviderRegistry.registerProvider('yandex', {
    name: 'Yandex',
    logo: {
      path: require('./logo/yandex.logo.png'),
    },
    image: {
      reader: YandexImageReader,
    },
    serverGroup: {
      transformer: YandexServerGroupTransformer,
      detailsActions: YandexServerGroupActions, // todo: fill
      detailsGetter: yandexServerGroupDetailsGetter, // todo: deal with it
      detailsSections: [
        // todo: add/edit buttons everywhere
        YandexServerGroupDetailsSection,
        YandexCapacityDetailsSection,
        YandexHealthDetailsSection,
        YandexLaunchConfigDetailsSection,
        YandexScalingPoliciesDetailsSection,
        YandexPackageDetailsSection,
        YandexLabelsDetailsSection,
        YandexLogsDetailsSection,
      ],
      CloneServerGroupModal: YandexServerGroupWizard, // todo: fill
      commandBuilder: YandexServerGroupCommandBuilder, // todo: fill
      scalingActivitiesEnabled: false,
    },
    subnet: {
      renderer: 'yandexSubnetRenderer',
    },
    loadBalancer: {
      transformer: YandexLoadBalancerTransformer,
      details: YandexLoadBalancerDetails,
      CreateLoadBalancerModal: YandexLoadBalancerModal,
    },
    instance: {
      details: YandexInstanceDetails,
    },
  });
});

DeploymentStrategyRegistry.registerProvider('yandex', ['custom', 'rollingupdate']);