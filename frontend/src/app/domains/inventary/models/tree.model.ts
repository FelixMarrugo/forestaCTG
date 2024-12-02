export interface Tree {
  id: string;
  location: string;
  commonName: string;
  scientificName: string;
  neighborhood: string;
  locality: string;
  physicalDescription: string;
  photo: string;
  state: string;
}

export interface CreateTreeDTO extends Omit<Tree, 'id'> {}

export interface UpdateTreeDTO extends Partial<CreateTreeDTO> {}
