import type { MissionResponse } from '@/types';
import * as Sentry from '@sentry/react';

export const populateMissionDescription = async (missionResponse: MissionResponse) => {
  try {
    const response = await fetch(missionResponse.descriptionUrl);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const description = await response.text();

    const mission = {
      ...missionResponse,
      description,
    };

    return mission;
  } catch (err) {
    Sentry.withScope((scope: Sentry.Scope) => {
      scope.setLevel('error');
      scope.setTag('url', window.location.href);
      Sentry.captureException(err);
    });
    throw err;
  }
};
