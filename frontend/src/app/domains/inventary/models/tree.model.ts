export interface Tree {
  _id: string;
  location: string;
  commonName: string;
  scientificName: string;
  neighborhood: string;
  locality: string;
  physicalDescription: string;
  photo: string;
  state: boolean | null | undefined;
}

export interface CreateTreeDTO extends Omit<Tree, '_id' | 'photo'> {
  imgName: string;
  img: string | ArrayBuffer | null;
}

export interface UpdateTreeDTO extends Partial<CreateTreeDTO> {}
