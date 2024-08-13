import type { Mission, MissionWithDescription } from '@/types';
import * as Sentry from '@sentry/react';

export const populateMissionDescription = async (
  mission: Mission,
): Promise<MissionWithDescription> => {
  try {
    const response = await fetch(mission.descriptionUrl);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const description = await response.text();

    const missionWithDescription = {
      ...mission,
      description,
    };

    return missionWithDescription;
  } catch (err) {
    Sentry.withScope((scope: Sentry.Scope) => {
      scope.setLevel('error');
      scope.setTag('url', window.location.href);
      Sentry.captureException(err);
    });
    throw err;
  }
};
