interface Mission {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
  descriptionUrl: string;
}

interface Member {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
}

export interface Solution {
  id: number;
  title: string;
  description: string;
  url: string;
  member: Member;
  mission: Mission;
}
