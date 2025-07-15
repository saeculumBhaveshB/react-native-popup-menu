export interface BedType {
  uuid: string;
  name: string;
  displayName: string;
  description: string | null;
  resourceVersion: string;
}

export interface BedLayout {
  rowNumber: number;
  columnNumber: number;
  bedNumber: string | null;
  bedId: number | null;
  bedUuid: string | null;
  status: 'AVAILABLE' | 'Occupied' | null;
  location: string;
  bedType: BedType | null;
  patients: any[];
  bedTagMaps: any[] | null;
  resourceVersion: string;
}

export interface Ward {
  uuid: string;
  display: string;
  name: string;
  description: string | null;
  address1: string | null;
  address2: string | null;
  cityVillage: string | null;
  stateProvince: string | null;
  country: string | null;
  postalCode: string | null;
  latitude: string | null;
  longitude: string | null;
  countyDistrict: string | null;
  address3: string | null;
  address4: string | null;
  address5: string | null;
  address6: string | null;
  tags: any[];
  parentLocation: any;
  childLocations: any[];
  retired: boolean;
  attributes: any[];
  address7: string | null;
  address8: string | null;
  address9: string | null;
  address10: string | null;
  address11: string | null;
  address12: string | null;
  address13: string | null;
  address14: string | null;
  address15: string | null;
  links: any[];
  resourceVersion: string;
}

export interface BedManagementResponse {
  ward: Ward;
  totalBeds: number;
  occupiedBeds: number;
  bedLayouts: BedLayout[];
  resourceVersion: string;
}

export interface BedButtonProps {
  bed: BedLayout;
  isSelected: boolean;
  onPress: (bed: BedLayout) => void;
}

export interface LegendProps {
  availableColor: string;
  occupiedColor: string;
}
