import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { BedManagementResponse, BedLayout } from './types';
import { BedGrid } from './BedGrid';
import { Legend } from './Legend';
import { bedManagementStyles } from './styles';

// Mock API response - replace with actual API call
const mockApiResponse: BedManagementResponse = {
  ward: {
    uuid: 'b5da9afd-b29a-4cbf-91c9-ccf2aa5f799e',
    display: 'Emergency',
    name: 'Emergency',
    description: null,
    address1: null,
    address2: null,
    cityVillage: null,
    stateProvince: null,
    country: null,
    postalCode: null,
    latitude: null,
    longitude: null,
    countyDistrict: null,
    address3: null,
    address4: null,
    address5: null,
    address6: null,
    tags: [
      {
        uuid: 'b8bbf83e-645f-451f-8efe-a0db56f09676',
        display: 'Login Location',
        links: [
          {
            rel: 'self',
            uri: 'http://demo.standard.mybahmni.in/openmrs/ws/rest/v1/locationtag/b8bbf83e-645f-451f-8efe-a0db56f09676',
            resourceAlias: 'locationtag',
          },
        ],
      },
      {
        uuid: '9f79d118-4449-4c6e-845c-58b61d70c0bc',
        display: 'Admission Location',
        links: [
          {
            rel: 'self',
            uri: 'http://demo.standard.mybahmni.in/openmrs/ws/rest/v1/locationtag/9f79d118-4449-4c6e-845c-58b61d70c0bc',
            resourceAlias: 'locationtag',
          },
        ],
      },
    ],
    parentLocation: {
      uuid: '72636eba-29bf-4d6c-97c4-4b04d87a95b5',
      display: 'Bahmni Hospital',
      links: [
        {
          rel: 'self',
          uri: 'http://demo.standard.mybahmni.in/openmrs/ws/rest/v1/location/72636eba-29bf-4d6c-97c4-4b04d87a95b5',
          resourceAlias: 'location',
        },
      ],
    },
    childLocations: [
      {
        uuid: '9212680d-bb7c-412a-bd07-d24358f5a4ad',
        display: 'Emergency Ward',
        links: [
          {
            rel: 'self',
            uri: 'http://demo.standard.mybahmni.in/openmrs/ws/rest/v1/location/9212680d-bb7c-412a-bd07-d24358f5a4ad',
            resourceAlias: 'location',
          },
        ],
      },
    ],
    retired: false,
    attributes: [],
    address7: null,
    address8: null,
    address9: null,
    address10: null,
    address11: null,
    address12: null,
    address13: null,
    address14: null,
    address15: null,
    links: [
      {
        rel: 'self',
        uri: 'http://demo.standard.mybahmni.in/openmrs/ws/rest/v1/location/b5da9afd-b29a-4cbf-91c9-ccf2aa5f799e',
        resourceAlias: 'location',
      },
      {
        rel: 'full',
        uri: 'http://demo.standard.mybahmni.in/openmrs/ws/rest/v1/location/b5da9afd-b29a-4cbf-91c9-ccf2aa5f799e?v=full',
        resourceAlias: 'location',
      },
    ],
    resourceVersion: '2.0',
  },
  totalBeds: 9,
  occupiedBeds: 1,
  bedLayouts: [
    {
      rowNumber: 1,
      columnNumber: 1,
      bedNumber: 'E1',
      bedId: 1,
      bedUuid: 'cc318f30-6414-4cb7-883d-de409a344175',
      status: 'Occupied',
      location: 'Emergency Ward',
      bedType: null,
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
    {
      rowNumber: 1,
      columnNumber: 2,
      bedNumber: 'E2',
      bedId: 2,
      bedUuid: 'e44b58f3-60c9-41d1-b0e5-9b3def532796',
      status: 'AVAILABLE',
      location: 'Emergency Ward',
      bedType: {
        uuid: '9f7c9e16-50ad-445b-8953-a4366844b824',
        name: 'Normal',
        displayName: 'NM',
        description: null,
        resourceVersion: '1.8',
      },
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
    {
      rowNumber: 2,
      columnNumber: 1,
      bedNumber: 'E3',
      bedId: 3,
      bedUuid: 'b607ccba-652b-485a-9e29-c129a700bf05',
      status: 'AVAILABLE',
      location: 'Emergency Ward',
      bedType: {
        uuid: '732b1f9c-80e6-40c1-b3db-d3c1e2eb96a0',
        name: 'Double',
        displayName: 'DD',
        description: null,
        resourceVersion: '1.8',
      },
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
    {
      rowNumber: 2,
      columnNumber: 2,
      bedNumber: 'E4',
      bedId: 4,
      bedUuid: 'ce925a2d-b9ae-4634-a7b0-bdb37780406e',
      status: 'AVAILABLE',
      location: 'Emergency Ward',
      bedType: {
        uuid: '732b1f9c-80e6-40c1-b3db-d3c1e2eb96a0',
        name: 'Double',
        displayName: 'DD',
        description: null,
        resourceVersion: '1.8',
      },
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
    {
      rowNumber: 1,
      columnNumber: 3,
      bedNumber: 'SPL',
      bedId: 10,
      bedUuid: '1232314f-baa9-488d-aee3-560f3498c86e',
      status: 'AVAILABLE',
      location: 'Emergency Ward',
      bedType: {
        uuid: '9f7c9e16-50ad-445b-8953-a4366844b824',
        name: 'Normal',
        displayName: 'NM',
        description: null,
        resourceVersion: '1.8',
      },
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
    {
      rowNumber: 3,
      columnNumber: 1,
      bedNumber: 'SP1',
      bedId: 11,
      bedUuid: '47950523-5007-4917-a2f2-fbd96c9cf122',
      status: 'AVAILABLE',
      location: 'Emergency Ward',
      bedType: {
        uuid: '9f7c9e16-50ad-445b-8953-a4366844b824',
        name: 'Normal',
        displayName: 'NM',
        description: null,
        resourceVersion: '1.8',
      },
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
    {
      rowNumber: 3,
      columnNumber: 3,
      bedNumber: 'SP2',
      bedId: 12,
      bedUuid: 'd36d7994-834c-4fc8-a71d-c39765fe2be9',
      status: 'AVAILABLE',
      location: 'Emergency Ward',
      bedType: {
        uuid: '9f7c9e16-50ad-445b-8953-a4366844b824',
        name: 'Normal',
        displayName: 'NM',
        description: null,
        resourceVersion: '1.8',
      },
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
    {
      rowNumber: 4,
      columnNumber: 1,
      bedNumber: 'SP3',
      bedId: 13,
      bedUuid: '7917254f-6c5f-403c-b95d-dc15b76a08c0',
      status: 'AVAILABLE',
      location: 'Emergency Ward',
      bedType: {
        uuid: '9f7c9e16-50ad-445b-8953-a4366844b824',
        name: 'Normal',
        displayName: 'NM',
        description: null,
        resourceVersion: '1.8',
      },
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
    {
      rowNumber: 4,
      columnNumber: 3,
      bedNumber: 'SP4',
      bedId: 14,
      bedUuid: 'f4080ca1-16ec-4fac-a95a-93bde3f9ac5e',
      status: 'AVAILABLE',
      location: 'Emergency Ward',
      bedType: {
        uuid: '9f7c9e16-50ad-445b-8953-a4366844b824',
        name: 'Normal',
        displayName: 'NM',
        description: null,
        resourceVersion: '1.8',
      },
      patients: [],
      bedTagMaps: [],
      resourceVersion: '1.8',
    },
  ],
  resourceVersion: '1.8',
};

export const BedManagementScreen: React.FC = () => {
  const [bedData, setBedData] = useState<BedManagementResponse | null>(null);
  const [selectedBed, setSelectedBed] = useState<BedLayout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBedData = async () => {
      try {
        // In real implementation, replace this with actual API call
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();

        // For now, using mock data
        setTimeout(() => {
          setBedData(mockApiResponse);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching bed data:', error);
        setLoading(false);
      }
    };

    fetchBedData();
  }, []);

  const handleBedPress = (bed: BedLayout) => {
    setSelectedBed(bed);

    // Show bed details in an alert (you can replace this with a modal or navigation)
    Alert.alert(
      'Bed Details',
      `Bed: ${bed.bedNumber}\nStatus: ${bed.status}\nLocation: ${
        bed.location
      }\nBed Type: ${bed.bedType?.name || 'N/A'}`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  if (loading) {
    return (
      <View
        style={[
          bedManagementStyles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text>Loading bed data...</Text>
      </View>
    );
  }

  if (!bedData) {
    return (
      <View
        style={[
          bedManagementStyles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text>No bed data available</Text>
      </View>
    );
  }

  const availableBeds = bedData.bedLayouts.filter(
    bed => bed.status === 'AVAILABLE',
  ).length;

  return (
    <View style={bedManagementStyles.container}>
      {/* Header */}
      <View style={bedManagementStyles.header}>
        <Text style={bedManagementStyles.title}>{bedData.ward.name} Ward</Text>
        <Text style={bedManagementStyles.subtitle}>{bedData.ward.display}</Text>
      </View>

      {/* Statistics */}
      <View style={bedManagementStyles.statsContainer}>
        <View style={bedManagementStyles.statItem}>
          <Text style={bedManagementStyles.statNumber}>
            {bedData.totalBeds}
          </Text>
          <Text style={bedManagementStyles.statLabel}>Total Beds</Text>
        </View>
        <View style={bedManagementStyles.statItem}>
          <Text style={bedManagementStyles.statNumber}>{availableBeds}</Text>
          <Text style={bedManagementStyles.statLabel}>Available</Text>
        </View>
        <View style={bedManagementStyles.statItem}>
          <Text style={bedManagementStyles.statNumber}>
            {bedData.occupiedBeds}
          </Text>
          <Text style={bedManagementStyles.statLabel}>Occupied</Text>
        </View>
      </View>

      {/* Bed Grid */}
      <BedGrid
        bedLayouts={bedData.bedLayouts}
        selectedBed={selectedBed}
        onBedPress={handleBedPress}
      />

      {/* Legend */}
      <Legend availableColor="#90EE90" occupiedColor="#D3D3D3" />
    </View>
  );
};
