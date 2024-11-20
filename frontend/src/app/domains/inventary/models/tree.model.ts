export interface Tree{
  id: number;
  location: string;
  commonName: string;
  scientificName: string;
  neighborhood: string;
  locality: string;
  physicalDescription: string;
  photo: string;
  state: string;
}

export interface CreateTreeDTO extends Omit<Tree, 'id'>{}
