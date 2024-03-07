interface IAlat {
  [key: string]: string;
}

interface IVideo {
  src: string;
  title?: string;
  sumber: string;
}

export interface IPanduanPage {
  name: string;
  pelaksana: string;
  waktu: string;
  alat: IAlat;
  cara: string;
  video: IVideo[];
}

export interface IPanduanPages {
  PageOne: IPanduanPage[];
  PageTwo: IPanduanPage[];
  PageThree: IPanduanPage[];
}
