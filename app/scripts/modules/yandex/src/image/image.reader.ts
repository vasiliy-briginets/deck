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

import { API, IImage } from '@spinnaker/core';

export interface IYandexImage extends IImage {
  imageId: string;
  imageName: string;
}

export class YandexImageReader {
  public static findImages(params: { account?: string; provider?: string; q?: string }): IPromise<IYandexImage[]> {
    return API.one('images/find')
      .withParams(params)
      .get()
      .catch(() => [] as IYandexImage[]);
  }

  public static getImage(/*amiName: string, region: string, credentials: string*/): IPromise<IYandexImage> {
    // Yandex images are not regional so we don't need to retrieve ids scoped to regions.
    return null;
  }
}
