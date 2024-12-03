export interface Tree {
  _id: string;
  location: string;
  commonName: string;
  scientificName: string;
  neighborhood: string;
  locality: string;
  physicalDescription: string;
  photo: string;
  state: string;
}

export interface CreateTreeDTO extends Omit<Tree, '_id'> {}

export interface UpdateTreeDTO extends Partial<CreateTreeDTO> {}
