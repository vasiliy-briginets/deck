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

import { FormikProps } from 'formik';

import { FormikFormField, IWizardPageComponent, ReactSelectInput, TextInput } from '@spinnaker/core';
import { IYandexServerGroupCommand } from 'yandex/domain/configure/IYandexServerGroupCommand';
import * as React from 'react';

export interface ICloudFoundryServerGroupConfigurationSettingsProps {
  formik: FormikProps<IYandexServerGroupCommand>;
}

export class YandexServerGroupInstanceTemplateSettings
  extends React.Component<ICloudFoundryServerGroupConfigurationSettingsProps>
  implements IWizardPageComponent<ICloudFoundryServerGroupConfigurationSettingsProps> {
  public render(): JSX.Element {
    return (
      <div className="form-group">
        <div className="col-md-11">
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'instanceTemplate.platformId'}
              fastField={false}
              required={true}
              input={props => (
                <ReactSelectInput {...props} stringOptions={['standard-v1', 'standard-v2', 'gpu-standard-v1']} />
              )}
              label="Platform id"
            />
          </div>
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'instanceTemplate.resourcesSpec.memory'}
              fastField={false}
              input={props => <TextInput type="number" min={1} {...props} />}
              label="Memory (GB)"
              required={true}
            />
          </div>
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'instanceTemplate.resourcesSpec.cores'}
              fastField={false}
              input={props => <TextInput type="number" min={1} {...props} />}
              label="Cores"
              required={true}
            />
          </div>
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'instanceTemplate.resourcesSpec.coreFraction'}
              fastField={false}
              input={props => <TextInput type="number" min={0} {...props} />}
              label="Core fraction"
            />
          </div>
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'instanceTemplate.resourcesSpec.gpus'}
              fastField={false}
              input={props => <TextInput type="number" min={0} {...props} />}
              label="Gpus"
            />
          </div>
        </div>
      </div>
    );
  }

  public validate(_props: ICloudFoundryServerGroupConfigurationSettingsProps) {
    return {} as any;
  }
}
