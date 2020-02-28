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

import { FormikFormField, IWizardPageComponent, TextInput } from '@spinnaker/core';
import { IYandexServerGroupCommand } from 'yandex/domain/configure/IYandexServerGroupCommand';
import * as React from 'react';

export interface ICloudFoundryServerGroupConfigurationSettingsProps {
  formik: FormikProps<IYandexServerGroupCommand>;
}

export class YandexServerGroupDeployPolicySettings
  extends React.Component<ICloudFoundryServerGroupConfigurationSettingsProps>
  implements IWizardPageComponent<ICloudFoundryServerGroupConfigurationSettingsProps> {
  public render(): JSX.Element {
    return (
      <div className="form-group">
        <div className="col-md-11">
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'deployPolicy.maxUnavailable'}
              input={props => <TextInput type="number" min={0} max={100} {...props} />}
              label="Max unavailable"
            />
          </div>
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'deployPolicy.maxExpansion'}
              input={props => <TextInput type="number" min={0} max={100} {...props} />}
              label="Max expansion"
            />
          </div>
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'deployPolicy.maxDeleting'}
              input={props => <TextInput type="number" min={0} max={100} {...props} />}
              label="Max deleting"
            />
          </div>
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'deployPolicy.maxCreating'}
              input={props => <TextInput type="number" min={0} max={100} {...props} />}
              label="Max creating"
            />
          </div>
          <div className="sp-margin-m-bottom">
            <FormikFormField
              name={'deployPolicy.startupDuration'}
              input={props => <TextInput type="number" min={0} max={60} {...props} />}
              label="Startup duration (sec)"
            />
          </div>
        </div>
      </div>
    );
  }

  public validate(_props: ICloudFoundryServerGroupConfigurationSettingsProps) {
    const errors = {} as any;
    //   const isStorageSize = (value: string) => /\d+[MG]/.test(value);
    //
    //   if (!this.props.formik.values.manifest) {
    //     errors.manifest = 'No manifest information provided';
    //     return errors;
    //   }
    //
    //   const direct = this.props.formik.values.manifest.direct;
    //   if (direct) {
    //     if (!isStorageSize(direct.memory)) {
    //       errors.manifest = errors.manifest || {};
    //       errors.manifest.memory = `Provide a size (e.g.: 256M, 1G)`;
    //     }
    //     if (!isStorageSize(direct.diskQuota)) {
    //       errors.manifest = errors.manifest || {};
    //       errors.manifest.diskQuota = `Provide a size (e.g.: 256M, 1G)`;
    //     }
    //     if (direct.routes) {
    //       const routeErrors = direct.routes.map((route: string) => {
    //         const regex = /^([-\w]+)\.([-.\w]+)(:\d+)?([-/\w]+)?$/gm;
    //         if (route && regex.exec(route) === null) {
    //           return `A route did not match the expected format "host.some.domain[:9999][/some/path]"`;
    //         }
    //         return null;
    //       });
    //       if (routeErrors.some((val: string) => !!val)) {
    //         errors.manifest = errors.manifest || {};
    //         errors.manifest.routes = routeErrors;
    //       }
    //     }
    //     if (direct.environment) {
    //       const existingKeys: string[] = [];
    //       const envErrors = direct.environment.map((e: ICloudFoundryEnvVar) => {
    //         let myErrors: any;
    //         if (e.key) {
    //           const validKeyRegex = /^\w+$/g;
    //           if (!validKeyRegex.exec(e.key)) {
    //             myErrors = {
    //               key: `This field must be alphanumeric`,
    //             };
    //           } else {
    //             if (existingKeys.filter(key => key === e.key).length > 0) {
    //               myErrors = {
    //                 key: `Duplicate variable name`,
    //               };
    //             } else {
    //               existingKeys.push(e.key);
    //             }
    //           }
    //         }
    //         return myErrors;
    //       });
    //       if (envErrors.some((val: string) => !!val)) {
    //         errors.manifest = errors.manifest || {};
    //         errors.manifest.environment = envErrors;
    //       }
    //     }
    //   } else {
    //     const { manifest } = this.props.formik.values;
    //     if (
    //       !manifest ||
    //       !((manifest.artifact && manifest.artifact.type && manifest.artifact.reference) || manifest.artifactId)
    //     ) {
    //       errors.manifest = 'Manifest artifact information is required';
    //     }
    //   }
    //
    return errors;
  }
}
