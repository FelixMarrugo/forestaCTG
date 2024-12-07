export interface Tree {
  _id: string;
  location: string;
  commonName: string;
  scientificName: string;
  neighborhood: string;
  locality: string;
  physicalDescription: string;
  photo: string | undefined; // Siempre será string en el modelo Tree
  state: boolean;
}

export interface CreateTreeDTO {
  location: string;
  commonName: string;
  scientificName: string;
  neighborhood: string;
  locality: string;
  physicalDescription: string;
  photo: string | File | undefined; // Permitir ambos tipos aquí
  state: boolean;
}

export interface UpdateTreeDTO extends Partial<CreateTreeDTO> {}
