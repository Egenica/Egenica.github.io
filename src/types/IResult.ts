export interface ICitysResult {
  country: string;
  city: string;
  count: number;
  locations: number;
  firstUpdated: Date;
  lastUpdated: Date;
  parameters: string[];
}

export interface ISearchProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISearchDropdownMenuProps {
  results: ICitysResult[];
  hideShowDropdown: boolean;
  setHideShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCitys: ICitysResult[];
  setSelectedCitys: React.Dispatch<React.SetStateAction<ICitysResult[]>>;
}

export interface ISearchResultsProps {
  result: ICitysResult;
  setSelectedCitys: React.Dispatch<React.SetStateAction<ICitysResult[]>>;
}

//

export interface ICityLocationsResult {
  id: number;
  city: string;
  name: string;
  entity: string;
  country: string;
  sources: Source[];
  isMobile: boolean;
  isAnalysis: boolean;
  parameters: Parameter[];
  sensorType: string;
  coordinates: Coordinates;
  lastUpdated: Date;
  firstUpdated: Date;
  measurements: number;
  bounds: null;
  manufacturers: null;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Parameter {
  id: number;
  unit: string;
  count: number;
  average: number;
  lastValue: number;
  parameter: string;
  displayName: string;
  lastUpdated: Date;
  parameterId: number;
  firstUpdated: Date;
  manufacturers: null;
}

export interface Source {
  url: string;
  name: string;
  id: string;
  readme: null;
  organization: null;
  lifecycle_stage: null;
}
