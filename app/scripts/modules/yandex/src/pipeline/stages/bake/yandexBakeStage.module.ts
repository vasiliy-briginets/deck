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

import { BakeExecutionLabel, ExecutionDetailsTasks, Registry } from '@spinnaker/core';
import { ManualExecutionBakeManifest } from 'core/pipeline/config/stages/bakeManifest/ManualExecutionBakeManifest';
import { YandexBakeStage } from 'yandex/pipeline/stages/bake/bakeStage';
import { YandexBakeDetailsTab } from 'yandex/pipeline/stages/bake/YandexBakeDetailsTab';

Registry.pipeline.registerStage({
  provides: 'bake',
  cloudProvider: 'yandex',
  label: 'Bake',
  description: 'Bakes an image',
  key: 'bake',
  component: YandexBakeStage,
  producesArtifacts: true,
  supportsCustomTimeout: true,
  executionDetailsSections: [YandexBakeDetailsTab, ExecutionDetailsTasks],
  executionLabelComponent: BakeExecutionLabel,
  extraLabelLines: stage => {
    return stage.masterStage.context.allPreviouslyBaked || stage.masterStage.context.somePreviouslyBaked ? 1 : 0;
  },
  restartable: true,
  manualExecutionComponent: ManualExecutionBakeManifest,
});
