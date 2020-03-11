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

import { IComponentOptions, module } from 'angular';

export const imageSourceSelectorComponent: IComponentOptions = {
  bindings: { command: '=', imageSources: '<', helpFieldKey: '@', idField: '@', imageSourceText: '<', onChange: '<?' },
  controllerAs: 'ctrl',
  template: `
    <div class="form-group" ng-if="ctrl.imageSourceText">
      <div class="col-md-3 sm-label-right">
        Image Source
      </div>
      <div class="col-md-7" style="margin-top: 5px;">
        <span ng-bind-html="ctrl.imageSourceText"></span>
      </div>
    </div>
    <render-if-feature feature="artifacts" ng-if="!ctrl.imageSourceText">
      <div class="form-group">
        <div class="col-md-3 sm-label-right">
          Image Source
          <help-field key="{{ ctrl.helpFieldKey }}"></help-field>
        </div>
        <div class="col-md-7">
          <div class="radio" ng-repeat="imageSource in ctrl.imageSources">
            <label>
              <input type="radio" ng-model="ctrl.command[ctrl.idField]" value="{{ imageSource }}" ng-change="ctrl.onChange('{{ imageSource }}')">
              {{ imageSource | robotToHuman }}
            </label>
          </div>
        </div>
      </div>
    </render-if-feature>
  `,
};

export const imageSourceSelectorWrapperComponent: IComponentOptions = {
  bindings: { command: '<', imageSources: '<', helpFieldKey: '<', idField: '<', imageSourceText: '<', onChange: '<?' },
  template: `
    <image-source-selector
      command="$ctrl.command"
      id-field={{$ctrl.idField}}
      image-sources="$ctrl.imageSources"
      help-field-key={{$ctrl.helpFieldKey}}
      image-source-text="$ctrl.imageSourceText"
      on-change="$ctrl.onChange"
      >
    </image-source-selector>
  `,
};

//todo: delete
export const IMAGE_SOURCE_SELECTOR_COMPONENT = 'spinnaker.core.artifacts.expected.image.selector';
module(IMAGE_SOURCE_SELECTOR_COMPONENT, [])
  .component('imageSourceSelector', imageSourceSelectorComponent)
  .component('imageSourceSelectorWrapper', imageSourceSelectorWrapperComponent);
