import type { Mission } from './missionMocks';

interface MissionItemProps {
  mission: Mission;
}

export default function MissionItem({ mission }: MissionItemProps) {
  console.log(mission);

  return <div>미션 아이템</div>;
}
